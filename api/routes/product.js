const { error, success, ErrorResponse } = require("../services/response");
const Product = require("../models/product");
const router = require("express").Router();
const verify = require("../middleware/verify");

router.post("/", verify("seller"), async (req, res) => {
  try {
    const product = new Product(req.body);
    product.seller = req.seller;
    await product.save();
    success(res, product);
  } catch (e) {
    error(res, e);
  }
});

router.get("/seller", verify("seller"), async (req, res) => {
  try {
    let products = [];
    let { query = "", limit = 10, page = 1 } = req.query;
    limit = parseInt(limit);
    page = parseInt(page) - 1;

    if (limit > 20) limit = 20;

    products = await Product.find({
      seller: req.seller._id,
      name: { $regex: query, $options: "i" },
    })
      .limit(limit)
      .skip(page * limit);

    const totalCount = await Product.find({
      seller: req.seller._id,
      name: { $regex: query, $options: "i" },
    }).count();

    success(res, { products, totalCount });
  } catch (e) {
    error(res, e);
  }
});

router.get("/admin", verify("admin"), async (req, res) => {
  try {
    let products = [];
    let { query = "", limit = 10, page = 1 } = req.query;
    limit = parseInt(limit);
    page = parseInt(page) - 1;

    if (limit > 20) limit = 20;

    products = await Product.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(limit)
      .skip(page * limit);

    const totalCount = await Product.find({
      name: { $regex: query, $options: "i" },
    }).count();

    success(res, { products, totalCount });
  } catch (e) {
    error(res, e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    success(res, product);
  } catch (e) {
    error(res, e);
  }
});

router.patch("/:id", verify("seller"), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (req.seller._id.toString() !== product.seller.toString())
      throw ErrorResponse("You dont have permission to update the product.");
    await product.update(req.body);
    success(res, "Product deleted.");
  } catch (e) {
    error(res, e);
  }
});

router.patch("/:id/status", verify("admin"), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) throw ErrorResponse("Cannot find the product.");
    product.status = req.body.status;
    await product.save();
    success(res, "Success");
  } catch (e) {
    error(res, e);
  }
});

router.delete("/:id", verify("seller"), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (req.seller._id.toString() !== product.seller.toString())
      throw ErrorResponse("You dont have permission to update the product.");
    await product.remove();
    success(res, "Product deleted.");
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
