const express = require('express');
const router = express.Router();
const { createOrder, confirmOrder, cancelOrder } = require('../controllers/orderController');
const { Order, Listing, User } = require('../models'); // ✅ import models

// 👉 Get all orders (optionally filter by buyerId)
router.get('/', async (req, res) => {
  try {
    const { buyerId } = req.query;
    let where = {};
    if (buyerId) {
      where.buyerId = buyerId;
    }

    // Include Listing + Seller for richer info
    const orders = await Order.findAll({
      where,
      include: [
        {
          model: Listing,
          attributes: ['title', 'price', 'currency'],
          include: [{ model: User, as: 'seller', attributes: ['pi_username', 'full_name'] }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// 👉 Create new order (buyer initiates - real flow)
router.post('/', createOrder);

// 👉 Buyer confirms order -> release escrow
router.put('/:id/confirm', confirmOrder);

// 👉 Buyer cancels order (before seller ships)
router.put('/:id/cancel', cancelOrder);

// 👉 Mock order route (for demo/testing without Pi SDK)
router.post('/mock', async (req, res) => {
  try {
    const { buyerId, listingId } = req.body;

    if (!buyerId || !listingId) {
      return res.status(400).json({ error: 'buyerId and listingId required' });
    }

    // Get listing info
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
    console.error("Error creating mock order:", error);
    res.status(500).json({ error: 'Failed to create mock order' });
  }
});

module.exports = router;
