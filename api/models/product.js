const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
});

const priceSchema = mongoose.Schema({
  regular: Number,
  sale: Number,
});

const taxSchema = mongoose.Schema({
  status: Boolean,
  percentage: Number,
});

const inventorySchema = mongoose.Schema({
  SKU: String,
  quantity: Number,
});

const shippingSchema = mongoose.Schema({
  weight: Number,
  length: Number,
  breadth: Number,
  height: Number,
  price: Number,
});

const attributesSchema = mongoose.Schema({
  name: String,
  value: String,
});

const schema = mongoose.Schema(
  {
    name: String,
    tags: [String],
    description: String,
    image: String,
    gallery: [String],
    category: [categorySchema],
    price: priceSchema,
    tax: taxSchema,
    inventory: inventorySchema,
    shipping: shippingSchema,
    attributes: [attributesSchema],
    seller: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", schema);
