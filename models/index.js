const sequelize = require('../config/db');

const User = require('./User');
const Listing = require('./Listing');
const Order = require('./Order');

module.exports = { sequelize, User, Listing, Order };
