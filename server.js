require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import sequelize + models from central index.js
const { sequelize, User, Listing, Order } = require('./models');

// Import routes
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Pi Marketplace API is running!');
});

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/listings', listingRoutes);
app.use('/api/v1/orders', orderRoutes);

const PORT = process.env.PORT || 8080;

// Ensure DB connection before starting server
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ All models synchronized");
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ Database error:", err));

