import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 500,
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (images) => images.length >= 1 && images.length <= 5,
      message: "Product must have between 1 and 5 images",
    },
  },
  sizes: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true,
      },
      stock: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
  ],
});

const productModel = mongoose.model("products", productSchema);
export default productModel;
