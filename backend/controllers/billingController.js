const Invoice = require("../models/Invoice");
const Product = require("../models/Product");
const User = require("../models/User");
const { generateInvoicePDF } = require("../utils/pdfGenerator");
const path = require("path");
const fs = require("fs");

// @desc    Get all invoices for tenant
// @route   GET /api/billing
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ tenantId: req.user._id }).sort({ date: -1 });
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching invoices log" });
  }
};

// @desc    Create a new invoice (Checkout)
// @route   POST /api/billing
// @access  Private
const createInvoice = async (req, res) => {
  const { customerName, customerPhone, customerType, items, discountType, discountValue, discountPercent, paymentMethod, isQuotation, isGstBilling } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items provided in cart" });
  }

  try {
    // 1. Verify stock availability first & cache products for cost calculations
    const checkedItems = [];
    const productsMap = {};
    for (const cartItem of items) {
      const pId = cartItem.id || cartItem.productId;
      const product = await Product.findOne({ _id: pId, tenantId: req.user._id });
      if (!product) {
        return res.status(404).json({ message: `Product '${cartItem.name}' not found in inventory` });
      }
      if (!isQuotation && product.stock < cartItem.qty) {
        return res.status(400).json({
          message: `Insufficient stock for product '${product.name}'. Required: ${cartItem.qty}, Available: ${product.stock}`
        });
      }
      checkedItems.push({ product, qty: cartItem.qty });
      productsMap[pId] = product;
    }

    // 2. Compute Invoice Totals
    let subtotal = 0;
    const invoiceItems = [];

    items.forEach((item) => {
      const pId = item.id || item.productId;
      const productDoc = productsMap[pId];
      const purchasePrice = productDoc && productDoc.prices ? (productDoc.prices.get("purchase") || 0) : 0;
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;
      invoiceItems.push({
        productId: pId,
        name: item.name,
        price: item.price,
        purchasePrice: purchasePrice,
        priceCategoryUsed: item.priceCategoryUsed || "retail",
        qty: item.qty,
        gstRate: item.gstRate || 0,
        sku: item.sku,
      });
    });

    let discountAmount = 0;
    let discPercent = 0;

    if (discountType === "fixed") {
      discountAmount = Math.min(parseFloat(discountValue) || 0, subtotal);
      discPercent = subtotal > 0 ? (discountAmount / subtotal) * 100 : 0;
    } else {
      discPercent = parseFloat(discountValue !== undefined ? discountValue : discountPercent) || 0;
      discountAmount = (subtotal * discPercent) / 100;
    }
    const discountedSubtotal = subtotal - discountAmount;

    // Compute GST based on discounted items
    const discountRatio = subtotal > 0 ? discountedSubtotal / subtotal : 1;
    let gstAmount = 0;
    invoiceItems.forEach((item) => {
      const itemSubtotal = item.price * item.qty;
      const discountedItemSubtotal = itemSubtotal * discountRatio;
      const itemGst = (discountedItemSubtotal * item.gstRate) / 100;
      gstAmount += itemGst;
    });

    const total = discountedSubtotal + gstAmount;

    // Generate Unique Invoice ID for Tenant
    const year = new Date().getFullYear();
    const invoiceCount = await Invoice.countDocuments({ tenantId: req.user._id });
    const invoiceNumberStr = String(invoiceCount + 1).padStart(4, "0");
    const invoiceId = `INV-${year}-${invoiceNumberStr}`;

    // 3. Deduct Stock Levels in Database (only if not a quotation)
    if (!isQuotation) {
      for (const checked of checkedItems) {
        checked.product.stock -= checked.qty;
        await checked.product.save();
      }
    }

    // Create paths for PDF storage
    const pdfFilename = `${req.user._id}_${invoiceId}.pdf`;
    const relativePdfPath = `/uploads/invoices/${pdfFilename}`;
    const absolutePdfPath = path.join(__dirname, "..", "uploads", "invoices", pdfFilename);

    // Create Invoice Document
    const invoice = new Invoice({
      tenantId: req.user._id,
      invoiceId,
      customerName: customerName || "Walk-in Customer",
      customerPhone: customerPhone || "N/A",
      customerType: customerType || "Retail",
      items: invoiceItems,
      subtotal,
      discountPercent: discPercent,
      discountAmount,
      gstAmount,
      total,
      paymentMethod: paymentMethod || "Cash",
      status: isQuotation ? "Quotation" : "Paid",
      isQuotation: isQuotation || false,
      isGstBilling: isGstBilling !== undefined ? isGstBilling : true,
      pdfUrl: relativePdfPath,
    });

    // 4. Generate & Save PDF file on Server disk
    const tenantUser = await User.findById(req.user._id);
    await generateInvoicePDF(invoice, tenantUser, absolutePdfPath);

    // Save invoice to DB
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error executing checkout", error: error.message });
  }
};

// @desc    Refund an invoice (restocks items)
// @route   PUT /api/billing/:id/refund
// @access  Private
const refundInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, tenantId: req.user._id });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found or unauthorized" });
    }

    if (invoice.status === "Refunded") {
      return res.status(400).json({ message: "Invoice has already been refunded" });
    }

    // Mark invoice refunded
    invoice.status = "Refunded";

    // Restock the items back to inventory (only if not a quotation)
    if (!invoice.isQuotation) {
      for (const item of invoice.items) {
        const product = await Product.findOne({ _id: item.productId, tenantId: req.user._id });
        if (product) {
          product.stock += item.qty;
          await product.save();
        }
      }
    }

    // Re-generate the PDF file to reflect REFUNDED status overlay
    const tenantUser = await User.findById(req.user._id);
    const pdfFilename = `${req.user._id}_${invoice.invoiceId}.pdf`;
    const absolutePdfPath = path.join(__dirname, "..", "uploads", "invoices", pdfFilename);
    await generateInvoicePDF(invoice, tenantUser, absolutePdfPath);

    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error processing refund", error: error.message });
  }
};

// @desc    Convert quotation to tax invoice (sale)
// @route   PUT /api/billing/:id/convert-quotation
// @access  Private
const convertQuotationToSale = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, tenantId: req.user._id });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found or unauthorized" });
    }

    if (!invoice.isQuotation) {
      return res.status(400).json({ message: "This transaction is already a finalized Tax Invoice" });
    }

    // 1. Verify stock availability for all items in the quotation
    const checkedItems = [];
    for (const item of invoice.items) {
      const product = await Product.findOne({ _id: item.productId, tenantId: req.user._id });
      if (!product) {
        return res.status(404).json({ message: `Product '${item.name}' not found in inventory` });
      }
      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `Insufficient stock for product '${product.name}' to convert quotation. Available: ${product.stock}, Required: ${item.qty}`
        });
      }
      checkedItems.push({ product, qty: item.qty });
    }

    // 2. Deduct stock levels
    for (const checked of checkedItems) {
      checked.product.stock -= checked.qty;
      await checked.product.save();
    }

    // 3. Update status & flags
    invoice.isQuotation = false;
    invoice.status = "Paid";

    // 4. Regenerate & Save final PDF
    const tenantUser = await User.findById(req.user._id);
    const pdfFilename = `${req.user._id}_${invoice.invoiceId}.pdf`;
    const absolutePdfPath = path.join(__dirname, "..", "uploads", "invoices", pdfFilename);
    await generateInvoicePDF(invoice, tenantUser, absolutePdfPath);

    const savedInvoice = await invoice.save();
    res.json(savedInvoice);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error converting quotation", error: error.message });
  }
};

// @desc    Stream dynamic PDF
// @route   GET /api/billing/:id/pdf
// @access  Private
const streamInvoicePDF = async (req, res) => {
  const { pageSize, orientation, download } = req.query;
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, tenantId: req.user._id });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found or unauthorized" });
    }

    const tenantUser = await User.findById(req.user._id);

    // Set PDF content headers to render inline in browser or download as attachment
    res.setHeader("Content-Type", "application/pdf");
    if (download === "true") {
      res.setHeader("Content-Disposition", `attachment; filename="${invoice.invoiceId}.pdf"`);
    } else {
      res.setHeader("Content-Disposition", `inline; filename="${invoice.invoiceId}.pdf"`);
    }

    // Call PDF generator to pipe directly to response
    await generateInvoicePDF(invoice, tenantUser, res, { pageSize, orientation });

  } catch (error) {
    console.error("PDF Streaming Error:", error);
    res.status(500).json({ message: "Error rendering invoice PDF stream", error: error.message });
  }
};

module.exports = {
  getInvoices,
  createInvoice,
  refundInvoice,
  convertQuotationToSale,
  streamInvoicePDF,
};
