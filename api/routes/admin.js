const router = require("express").Router();
const { error, success, ErrorResponse } = require("../services/response");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../services/vars");
const verify = require("../middleware/verify");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExists = (await Admin.count({ email })) > 0;

    if (!adminExists) throw ErrorResponse("Email not found.");

    const admin = await Admin.findOne({ email });

    const passwordVerified = await bcrypt.compare(password, admin.password);
    if (!passwordVerified) throw ErrorResponse("Password is incorrect.");

    const token = jwt.sign({ id: admin._id, type: "admin" }, config.jwt.secret);

    success(res, {
      token,
      name: admin.name,
      email: admin.email,
      type: "admin",
    });
  } catch (e) {
    error(res, e);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = (await Admin.count({ email })) > 0;

    if (emailExists) throw ErrorResponse("Email already exists", 401);

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    success(res, "Registered successfully");
  } catch (e) {
    error(res, e);
  }
});

router.patch("/change-password", verify("admin"), async (req, res) => {
  try {
    const { currentPassword, password } = req.body;
    const admin = req.admin;
    const passwordVerified = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!passwordVerified)
      throw ErrorResponse("Current password in incorrect.");
    admin.password = await bcrypt.hash(password, 10);
    await admin.save();
    success(res, "Password updated");
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
