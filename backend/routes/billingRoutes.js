const express = require("express");
const router = express.Router();
const {
  getInvoices,
  createInvoice,
  refundInvoice,
  convertQuotationToSale,
  streamInvoicePDF,
  settleInvoice,
  resetBusinessData,
} = require("../controllers/billingController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect); // protect all billing routes

router.get("/", getInvoices);
router.post("/", createInvoice);
router.post("/reset-business-data", resetBusinessData);
router.put("/:id/refund", refundInvoice);
router.put("/:id/convert-quotation", convertQuotationToSale);
router.put("/:id/settle", settleInvoice);
router.get("/:id/pdf", streamInvoicePDF);

module.exports = router;
