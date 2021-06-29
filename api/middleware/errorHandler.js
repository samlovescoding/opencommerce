const { error } = require("../services/response");

module.exports = (err, req, res, next) => {
  error(res, err);
};
