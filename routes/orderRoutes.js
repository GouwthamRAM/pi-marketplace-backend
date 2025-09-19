const express = require('express');
const router = express.Router();
const { createOrder, confirmOrder, cancelOrder } = require('../controllers/orderController');
const { Order, Listing, User } = require('../models');

// 👉 Get all orders (optionally filter by buyerId)
router.get('/', async (req, res) => {
  try {
    const { buyerId } = req.query;
    let where = {};
    if (buyerId) {
      where.buyerId = buyerId;
    }

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: Listing,
          as: 'listing',
          attributes: ['id', 'title', 'price', 'currency'],
          include: [
            {
              model: User,
              as: 'seller',
              attributes: ['id', 'pi_username', 'full_name']
            }
          ]
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'pi_username', 'full_name']
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

// 👉 Get all orders for a given sellerId
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;

    const orders = await Order.findAll({
      where: { sellerId },
      include: [
        {
          model: Listing,
          as: 'listing',
          attributes: ['id', 'title', 'price', 'currency']
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'pi_username', 'full_name']
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'pi_username', 'full_name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error("Error fetching seller orders:", err);
    res.status(500).json({ error: 'Failed to fetch seller orders' });
  }
});

// 👉 Create new order
router.post('/', createOrder);

// 👉 Buyer confirms order
router.put('/:id/confirm', confirmOrder);

// 👉 Buyer cancels order
router.put('/:id/cancel', cancelOrder);

// 👉 Mock order route
router.post('/mock', async (req, res) => {
  try {
    const { buyerId, listingId } = req.body;

    if (!buyerId || !listingId) {
      return res.status(400).json({ error: 'buyerId and listingId required' });
    }

    const listing = await Listing.findByPk(listingId);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const order = await Order.create({
      buyerId,
      sellerId: listing.sellerId,
      listingId,
      amount: listing.price,
      currency: listing.currency,
      status: 'paid'
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
