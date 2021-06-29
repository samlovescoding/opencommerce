const ErrorResponse = require("../services/error");
const logger = require("../services/logger");

module.exports = (req, res, next) => {
  const token = req.header.authorization;
  if (!token) throw ErrorResponse("You are not authenticated.");
  logger.info("Authorization Token", token);
  next();
};
