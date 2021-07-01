const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  name: String,
  email: String,
  copyright: String,
  link: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  razorpayClient: String,
  razorpaySecret: String,
});

const schema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    status: {
      type: String,
      default: "Pending",
    },
    shop: shopSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller", schema);
