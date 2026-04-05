const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  prodname: { type: String, default: "" },
  qty: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  status: { type: String, default: "" }
});

module.exports = mongoose.model("Inventory", inventorySchema);
