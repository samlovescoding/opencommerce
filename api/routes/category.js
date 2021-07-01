const router = require("express").Router();
const { error, success, ErrorResponse } = require("../services/response");
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    success(res, categories);
  } catch (e) {
    error(res, e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categories = await Category.findOne({ _id: req.params.id });
    success(res, categories);
  } catch (e) {
    error(res, e);
  }
});

router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    success(res, category);
  } catch (e) {
    error(res, e);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    success(res, category);
  } catch (e) {
    error(res, e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findOneAndRemove({ _id: req.params.id });
    success(res, category);
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
