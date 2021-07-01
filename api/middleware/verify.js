const ErrorResponse = require("../services/error");
const jwt = require("jsonwebtoken");
const vars = require("../services/vars");
const Seller = require("../models/seller");
const Admin = require("../models/admin");

module.exports = (type) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) throw ErrorResponse("You are not authenticated.");
    const payload = jwt.verify(token, vars.jwt.secret);
    console.log("Payload", payload);

    if (type !== payload.type)
      throw ErrorResponse(
        "You are not authorized. You are not a " + type + "."
      );

    if (type === "seller") {
      req.seller = await Seller.findOne({ _id: payload.id });
    }

    if (type === "admin") {
      req.admin = await Admin.findOne({ _id: payload.id });
    }

    next();
  };
};
