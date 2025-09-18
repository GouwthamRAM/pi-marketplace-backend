require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL || "postgres://charulatha@localhost:5432/pi_marketplace",
    dialect: "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
};
