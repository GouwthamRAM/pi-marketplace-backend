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
    res.status(400).json({ error: err.message });
  }
});

// 👉 Get all listings
router.get('/', async (req, res) => {
  const listings = await Listing.findAll({
    include: [{ model: User, as: 'seller', attributes: ['pi_username', 'full_name'] }]
  });
  res.json(listings);
});

// 👉 Get single listing by ID
router.get('/:id', async (req, res) => {
  const listing = await Listing.findByPk(req.params.id, {
    include: [{ model: User, as: 'seller', attributes: ['pi_username', 'full_name'] }]
  });
  if (listing) res.json(listing);
  else res.status(404).json({ error: 'Listing not found' });
});

module.exports = router;
