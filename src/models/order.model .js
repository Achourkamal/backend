const mongoose = require('mongoose');
const { Schema } = mongoose;

const productItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  }
}, { _id: false });

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: {
    type: [productItemSchema],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'Order must have at least one product.'
    }
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price must be a non-negative number']
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
