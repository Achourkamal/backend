import mongoose from 'mongoose'; 

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  }
});

// Create unique index on 'name'
categorySchema.index({ name: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
