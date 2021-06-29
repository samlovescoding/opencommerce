const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

module.exports = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("api", "uploads"));
  },
  filename: function (req, file, cb) {
    const filename = v4();
    const extension = file.originalname.split(".").pop();
    cb(null, filename + "." + extension);
  },
});
