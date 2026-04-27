const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    prodname: {
      type: String,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: 'S',
    },
  },
  {
    collection: 'inventories',
  }
);

module.exports = mongoose.model('Inventory', InventorySchema);
