const Order = require('../models/Order');
const Listing = require('../models/Listing');
const User = require('../models/User');

// STEP 1: Buyer creates order -> trigger Pi payment
exports.createOrder = async (req, res) => {
  try {
    const { buyerId, listingId } = req.body;
    const listing = await Listing.findByPk(listingId);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    // Create order in DB
    const order = await Order.create({
      buyerId,
      sellerId: listing.sellerId,
      listingId,
      amount: listing.price,
      currency: listing.currency,
      status: 'pending'
    });

    // ⚡️ Pi Payments SDK integration point
    // Here you'd call Pi.createPayment(...) to generate a paymentId.
    // Example (pseudo-code):
    // const payment = await Pi.createPayment({
    //   amount: listing.price,
    //   memo: `Order ${order.id} for listing ${listing.title}`,
    //   metadata: { orderId: order.id }
    // });
    //
    // Then store payment.identifier in DB:
    // order.escrowPaymentId = payment.identifier;
    // await order.save();

    res.status(201).json({ message: 'Order created, awaiting payment', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STEP 2: Buyer confirms delivery -> release escrow
exports.confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // ⚡️ Pi Payments SDK integration point
    // Pi.completePayment(order.escrowPaymentId);

    order.status = 'completed';
    await order.save();
    res.json({ message: 'Order completed & payment released', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STEP 3: Buyer cancels before shipment
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // ⚡️ Pi Payments SDK integration point
    // Pi.cancelPayment(order.escrowPaymentId);

    order.status = 'cancelled';
    await order.save();
    res.json({ message: 'Order cancelled & payment refunded', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
