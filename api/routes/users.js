const User = require("../models/User.js");
const router = require("express").Router();

//! Get All
router.get("/getAll", async (req, res) => {
  try {
    const users = await User.find().select("_id username email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! Get By Id
router.get("/get", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.find({ _id: userId }).select("_id username email");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// //! Get By Id
// router.get("/get/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.find({ _id: userId }).select("_id username email");
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
