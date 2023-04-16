const mongoose = require("mongoose");

// https://mongoosejs.com/docs/guide.html#schemas
const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
  },
  { timestamps: true }
);

// https://mongoosejs.com/docs/models.html#models
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
