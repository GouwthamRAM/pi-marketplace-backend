const express = require('express');
const router = express.Router();
const { createOrder, confirmOrder, cancelOrder } = require('../controllers/orderController');
const { Order } = require('../models'); // add direct model import for mock route

// Create new order (buyer initiates)
router.post('/', createOrder);

// Buyer confirms order -> release escrow
router.put('/:id/confirm', confirmOrder);

// Buyer cancels order (before seller ships)
router.put('/:id/cancel', cancelOrder);

// Mock order route
router.post('/mock', async (req, res) => {
  try {
    const { buyerId, listingId } = req.body;

    if (!buyerId || !listingId) {
      return res.status(400).json({ error: 'buyerId and listingId required' });
    }

    // Get listing info
    const { Listing } = require('../models');
    const listing = await Listing.findByPk(listingId);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Create order with required fields
    const order = await Order.create({
      buyerId,
      sellerId: listing.sellerId,
      listingId,
      amount: listing.price,
      status: 'paid' // simulate instant success
    });

    res.json({
      message: '✅ Mock order created successfully (pretending Pi payment succeeded)',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create mock order' });
  }
});

module.exports = router;
