const mongoose = require("mongoose");
const Inventory = require("./inventory.model");

exports.createInventory = (req, res) => {
  const inventory = new Inventory({
    prodname: req.body.prodname,
    qty: req.body.qty,
    price: req.body.price,
    status: req.body.status
  });

  inventory.save((err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Inventory created successfully!" });
  });
};

exports.getInventory = (req, res) => {
  Inventory.findById(req.params.id, "-__v", (err, inventory) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(inventory);
  });
};

exports.inventories = async (req, res) => {
  const inventories = await Inventory.find();
  res.status(200).send(inventories);
};

exports.updateInventory = async (req, res) => {
  const inventory = await Inventory.findById(req.body._id);
  if (!inventory) return res.status(404).send({ message: "Inventory not found." });

  inventory.prodname = req.body.prodname;
  inventory.qty = req.body.qty;
  inventory.price = req.body.price;
  inventory.status = req.body.status;

  await inventory.save();
  res.status(200).send({ message: "Inventory updated successfully!" });
};

exports.deleteInventory = async (req, res) => {
  const inventory = await Inventory.findByIdAndRemove(req.params.id);
  if (!inventory) return res.status(404).send({ message: "Inventory not found." });
  res.status(200).send({ message: "Inventory deleted successfully!" });
};
