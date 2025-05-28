const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be at least 0']
  },
  image: {
    type: String,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: 'Image must be a valid URL'
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative']
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

