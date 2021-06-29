const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

const attributesSchema = mongoose.schema({
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", schema);
