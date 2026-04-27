const Inventory = require('./inventory.model');

exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    const savedInventory = await inventory.save();

    res.status(200).json({
      message: 'Inventory created successfully',
      inventory: savedInventory,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating inventory',
      error: err.message,
    });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).select('-__v');

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving inventory',
      error: err.message,
    });
  }
};

exports.inventories = async (req, res) => {
  try {
    const inventories = await Inventory.find().select('-__v');
    res.status(200).json(inventories);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving inventories',
      error: err.message,
    });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { _id, id, ...updates } = req.body;
    const inventoryId = _id || id;

    if (!inventoryId) {
      return res.status(400).json({ message: 'Inventory id is required' });
    }

    const inventory = await Inventory.findByIdAndUpdate(inventoryId, updates, {
      new: true,
      runValidators: true,
    }).select('-__v');

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({
      message: 'Inventory updated successfully',
      inventory,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error updating inventory',
      error: err.message,
    });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({
      message: 'Inventory deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting inventory',
      error: err.message,
    });
  }
};
