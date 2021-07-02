const router = require("express").Router();
const { success, error } = require("../../services/response");
const Product = require("../../models/product");

router.get("/new", async (req, res) => {
  try {
    const products = await Product.find().limit(8);
    success(res, products);
  } catch (e) {
    error(res, e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate({
      path: "seller",
      select: "_id name shop",
    });
    success(res, product);
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
