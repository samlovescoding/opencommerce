const router = require("express").Router();
const { error, success, ErrorResponse } = require("../services/response");
const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../services/vars");
const verify = require("../middleware/verify");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const sellerExists = (await Seller.count({ email })) > 0;

    if (!sellerExists) throw ErrorResponse("Email not found.");

    const seller = await Seller.findOne({ email });

    const passwordVerified = await bcrypt.compare(password, seller.password);
    if (!passwordVerified) throw ErrorResponse("Password is incorrect.");

    if (seller.status !== "Approved") {
      if (seller.status === "Rejected")
        throw ErrorResponse("Your application was rejected by the admin.");
      throw ErrorResponse("You are not approved by the admin.");
    }

    const token = jwt.sign(
      { id: seller._id, type: "seller" },
      config.jwt.secret
    );

    success(res, {
      token,
      name: seller.name,
      email: seller.email,
      type: "seller",
    });
  } catch (e) {
    error(res, e);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = (await Seller.count({ email })) > 0;

    if (emailExists) throw ErrorResponse("Email already exists", 401);

    const hashedPassword = await bcrypt.hash(password, 10);

    await Seller.create({
      name,
      email,
      password: hashedPassword,
    });

    success(res, "Registered successfully");
  } catch (e) {
    error(res, e);
  }
});

router.get("/", verify("admin"), async (req, res) => {
  try {
    let { limit, query, page } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    if (limit > 20) {
      limit = 20;
    }
    const sellers = await Seller.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(limit)
      .skip(limit * page);
    const totalCount = await Seller.count({
      name: { $regex: query, $options: "i" },
    });
    success(res, { sellers, totalCount });
  } catch (e) {
    error(res, e);
  }
});

router.get("/shop", verify("seller"), async (req, res) => {
  try {
    success(res, req.seller.shop);
  } catch (e) {
    error(res, e);
  }
});

router.patch("/shop", verify("seller"), async (req, res) => {
  try {
    // req.seller = { ...req.seller, shop: req.body };
    await Seller.findOneAndUpdate(
      { _id: req.seller._id },
      { $set: { shop: req.body } }
    );
    // await req.seller.update();
    success(res, "Updated");
  } catch (e) {
    error(res, e);
  }
});

router.patch("/:id/status", verify("admin"), async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.params.id });
    if (!seller) throw ErrorResponse("Seller not found.");
    seller.status = req.body.status;
    await seller.save();
    success(res, "Updated successfully");
  } catch (e) {
    error(res, e);
  }
});

router.delete("/:id", verify("admin"), async (req, res) => {
  try {
    const seller = await Seller.findOne({ _id: req.params.id });
    if (!seller) throw ErrorResponse("Seller not found.");
    await seller.remove();
    success(res, "Deleted successfully");
  } catch (e) {
    error(res, e);
  }
});

router.patch("/change-password", verify("seller"), async (req, res) => {
  try {
    const { currentPassword, password } = req.body;
    const seller = req.seller;
    const passwordVerified = await bcrypt.compare(
      currentPassword,
      seller.password
    );
    if (!passwordVerified)
      throw ErrorResponse("Current password in incorrect.");
    seller.password = await bcrypt.hash(password, 10);
    await seller.save();
    success(res, "Password updated");
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
