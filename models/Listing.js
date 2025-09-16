const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');  // so we can connect listings to sellers

const Listing = sequelize.define('Listing', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  price: { type: DataTypes.FLOAT, allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: 'PI' },
  category: DataTypes.STRING,
  location: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: 'active' }
});

// 🔗 Association: A listing belongs to one seller
Listing.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' });
User.hasMany(Listing, { as: 'listings', foreignKey: 'sellerId' });

module.exports = Listing;
