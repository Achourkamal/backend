import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model("Order", orderSchema);
