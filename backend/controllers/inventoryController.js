const Product = require("../models/Product");

// @desc    Get all inventory products for tenant
// @route   GET /api/inventory
// @access  Private
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ tenantId: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching inventory items" });
  }
};

// @desc    Create a new product
// @route   POST /api/inventory
// @access  Private
const createProduct = async (req, res) => {
  const { name, sku, description, category, price, gstRate, stock, image } = req.body;

  if (!name || !sku || price === undefined || stock === undefined) {
    return res.status(400).json({ message: "Please provide name, SKU, price and stock" });
  }

  try {
    // Check if SKU already exists for this tenant
    const skuExists = await Product.findOne({ tenantId: req.user._id, sku });
    if (skuExists) {
      return res.status(400).json({ message: `A product with SKU '${sku}' already exists in your inventory` });
    }

    const product = await Product.create({
      tenantId: req.user._id,
      name,
      sku,
      description,
      category,
      price: parseFloat(price),
      gstRate: parseInt(gstRate),
      stock: parseInt(stock),
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating product", error: error.message });
  }
};

// @desc    Update an existing product
// @route   PUT /api/inventory/:id
// @access  Private
const updateProduct = async (req, res) => {
  const { name, sku, description, category, price, gstRate, stock, image } = req.body;

  try {
    const product = await Product.findOne({ _id: req.params.id, tenantId: req.user._id });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    // Check SKU conflict with another product
    if (sku && sku !== product.sku) {
      const skuConflict = await Product.findOne({
        tenantId: req.user._id,
        sku,
        _id: { $ne: req.params.id },
      });
      if (skuConflict) {
        return res.status(400).json({ message: `SKU '${sku}' is already in use by another product` });
      }
    }

    product.name = name !== undefined ? name : product.name;
    product.sku = sku !== undefined ? sku : product.sku;
    product.description = description !== undefined ? description : product.description;
    product.category = category !== undefined ? category : product.category;
    product.price = price !== undefined ? parseFloat(price) : product.price;
    product.gstRate = gstRate !== undefined ? parseInt(gstRate) : product.gstRate;
    product.stock = stock !== undefined ? parseInt(stock) : product.stock;
    product.image = image !== undefined ? image : product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating product", error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/inventory/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json({ message: "Product removed from inventory" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
