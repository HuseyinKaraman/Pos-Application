const mongoose = require("mongoose");

// https://mongoosejs.com/docs/guide.html#schemas
const CategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// https://mongoosejs.com/docs/models.html#models
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
