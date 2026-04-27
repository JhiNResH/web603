const express = require('express');
const inventoryController = require('./inventory.controller');

const router = express.Router();

router.post('/inventory', inventoryController.createInventory);
router.get('/inventory/:id', inventoryController.getInventory);
router.get('/inventories', inventoryController.inventories);
router.put('/inventory', inventoryController.updateInventory);
router.delete('/inventory/:id', inventoryController.deleteInventory);

module.exports = router;
