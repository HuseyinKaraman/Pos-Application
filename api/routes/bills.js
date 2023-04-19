const Bill = require("../models/Bill.js");
const router = require("express").Router();


//! Get All
router.get("/getAll",async (req,res)=>{
    try {
      const bills = await Bill.find().populate([
        {
            path:"cartItems.product",
            model:"Product",
            select:"img title price categoryId",
            populate : {
                path:"categoryId",
                model:"Category",
                select:"title"
            }
        }
      ])
      res.status(200).json(bills);
  } catch (error) {
      res.status(500).json(error);
  }
})

//! Create
router.post("/create",async (req,res)=>{
      try {
        const newBill = new Bill(req.body)
        await newBill.save();
        res.status(200).json("Bill create successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;