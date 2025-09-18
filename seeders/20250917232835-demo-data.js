'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Insert demo users
    await queryInterface.bulkInsert('Users', [
      {
        pi_username: 'seller_anna',
        full_name: 'Anna Seller',
        email: 'anna@example.com',
        role: 'seller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pi_username: 'buyer_bob',
        full_name: 'Bob Buyer',
        email: 'bob@example.com',
        role: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Insert demo listings
    await queryInterface.bulkInsert('Listings', [
      {
        title: 'Coffee Cup',
        description: 'Freshly brewed espresso',
        price: 2.5,
        currency: 'PI',
        category: 'Food',
        location: 'Cafe',
        sellerId: 1, // links to Anna
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Handmade Bracelet',
        description: 'Crafted by local artisan',
        price: 5,
        currency: 'PI',
        category: 'Accessories',
        location: 'Downtown',
        sellerId: 1, // links to Anna
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Listings', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
