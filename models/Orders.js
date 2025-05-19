const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  bookCode: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  orderCode: { type: Number, required: true },
  studentCode: { type: Number, required: true },
  status: { type: String, required: true },
  products: [productSchema],
});

module.exports = mongoose.model('Orders', orderSchema);
