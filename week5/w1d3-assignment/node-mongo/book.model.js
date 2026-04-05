const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  author: { type: String, default: "" },
});

module.exports = mongoose.model("Book", bookSchema);
