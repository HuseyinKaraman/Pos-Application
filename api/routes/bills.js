const Bill = require("../models/Bill.js");
const router = require("express").Router();


//! Get All
router.get("/getAll",async (req,res)=>{
    try {
      const bills = await Bill.find();
      res.status(200).json(bills);
  } catch (error) {
      res.status(500).json(error);
  }
})

//! Create
router.post("/add",async (req,res)=>{
      try {
        const newBill = new Bill(req.body)
        await newBill.save();
        res.status(200).json("Bill added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;