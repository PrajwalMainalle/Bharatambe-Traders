const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      default: "Stationery",
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    gstRate: {
      type: Number,
      required: true,
      default: 18, // standard GST rate
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Ensure SKU is unique PER tenant
ProductSchema.index({ tenantId: 1, sku: 1 }, { unique: true });

module.exports = mongoose.model("Product", ProductSchema);
