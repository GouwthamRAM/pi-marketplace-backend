const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  pi_username: { type: DataTypes.STRING, unique: true, allowNull: false },
  full_name: DataTypes.STRING,
  email: DataTypes.STRING,
  role: { type: DataTypes.STRING, defaultValue: 'buyer' },
  rating_avg: { type: DataTypes.FLOAT, defaultValue: 0.0 }
});

module.exports = User;
