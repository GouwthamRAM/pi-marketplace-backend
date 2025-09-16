const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Listing = require('./Listing');

const Order = sequelize.define('Order', {
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  listingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Listing, key: 'id' }
  },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: 'Pi' },
  escrowPaymentId: { type: DataTypes.STRING }, // store Pi payment tx id
  status: { 
    type: DataTypes.ENUM('pending', 'paid', 'completed', 'cancelled', 'disputed'),
    defaultValue: 'pending'
  }
});

// Relations
Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyerId' });
Order.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' });
Order.belongsTo(Listing, { as: 'listing', foreignKey: 'listingId' });

module.exports = Order;
