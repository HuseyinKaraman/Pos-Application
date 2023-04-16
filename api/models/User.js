const mongoose = require("mongoose");

/** @Note : custom validator ekleyebilriz  ister frontend ister backend'de kullanılabilir.*/
// https://www.npmjs.com/package/validator
const isEmail = require("validator/lib/isEmail.js")

// https://mongoosejs.com/docs/guide.html#schemas
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate : [isEmail,'invalid email address']
    },
    password:{
      type: String,
      required: true,
    },
    //   cartItems: [
    //     {
    //       productId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Product",
    //         required: true,
    //       },
    //       quantity: { type: Number, required: true },
    //     },
    //   ],
  },
  { timestamps: true }
);

// https://mongoosejs.com/docs/models.html#models
const User = mongoose.model("User", UserSchema);


module.exports = User;