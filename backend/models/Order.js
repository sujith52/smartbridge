const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  customerName: { type: String, default: 'Sarah' }, // Hardcoded for Sarah's scenario for now
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);