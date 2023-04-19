const mongoose = require("mongoose");

// https://mongoosejs.com/docs/guide.html#schemas
const BillSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    taxRate: {
      type: Number,
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// https://mongoosejs.com/docs/models.html#models
const Bill = mongoose.model("Bill", BillSchema);

module.exports = Bill;
