const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

//! register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      res.statusMessage = "With this mail address, previously registered!";
      res.status(404).end();
    } else if (user === null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      res.statusMessage = "A new user created successfully!"
      res.status(200).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//! login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })
    if (!user) {
      res.statusMessage = "User not found!";
      return res.status(404).end();
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      res.statusMessage = "Invalid Password!";
      res.status(403).end();
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// //! Update
// router.post("/update", async (req, res) => {
//   try {
//     await User.findByIdAndUpdate({ _id: req.body.userId }, req.body);
//     res.status(200).json("User updated successfully.");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //! Delete
// router.post("/delete", async (req, res) => {
//   try {
//     await User.findByIdAndRemove({ _id: req.body.userId });
//     res.status(200).json("User deleted successfully.");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
