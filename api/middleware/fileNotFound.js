const ErrorResponse = require("../services/error");

module.exports = (req, res, next) => {
  next(ErrorResponse("Route Not Found", 404));
};
