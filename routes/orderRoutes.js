const express = require('express');
const router = express.Router();
const { createOrder, confirmOrder, cancelOrder } = require('../controllers/orderController');

// Create new order (buyer initiates)
router.post('/', createOrder);

// Buyer confirms order -> release escrow
router.put('/:id/confirm', confirmOrder);

// Buyer cancels order (before seller ships)
router.put('/:id/cancel', cancelOrder);

module.exports = router;
