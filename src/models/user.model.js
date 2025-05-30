import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Please provide a valid email address'
    }
  },
  // password: {
  //   type: String,
  //   required: [true, 'Password is required'],
  //   minlength: [6, 'Password must be at least 6 characters long']
  // },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Create unique index on email
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
