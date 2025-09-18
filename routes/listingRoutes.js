const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');

// 👉 Create a new listing
router.post('/', async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.json(listing);
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(400).json({ error: err.message });
  }
});

// 👉 Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: [{ model: User, as: 'seller', attributes: ['pi_username', 'full_name'] }]
    });
    res.json(listings);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// 👉 Get single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id, {
      include: [{ model: User, as: 'seller', attributes: ['pi_username', 'full_name'] }]
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
});

module.exports = router;
