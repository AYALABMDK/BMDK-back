const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  bookCode: { type: String },
  videoCode: { type: Number },
  size: { type: String },
  quantity: { type: Number },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  orderCode: { type: Number, required: true },
  studentCode: { type: Number, required: true },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true }
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  products: [productSchema],
});

module.exports = mongoose.model('Orders', orderSchema);