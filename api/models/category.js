const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  parent: mongoose.Schema.Types.ObjectId,
  // seller: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("category", schema);
