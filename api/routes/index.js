const router = require("express").Router();
const express = require("express");
const path = require("path");

router.use("/seller", require("./seller"));
router.use("/admin", require("./admin"));
router.use("/product", require("./product"));
router.use("/category", require("./category"));
router.use("/image", require("./image"));
router.use("/customer", require("./customer"));
router.use("/uploads", express.static(path.join("api", "uploads")));

module.exports = router;
