const Product = require("../models/Product.js");
const router = require("express").Router();


//! Get All
router.get("/getAll",async (req,res)=>{
    try {
      const products = await Product.find().populate("categoryId","title _id"); //! ilişkili oldugu tablodan beriyi alabiliriz!
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json(error);
  }
})

//! Create
router.post("/add",async (req,res)=>{
      try {
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.status(200).json("Product added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
})

//! Update
router.post("/update",async (req,res)=>{
    try {
      await Product.findByIdAndUpdate({_id: req.body.productId},req.body)
      res.status(200).json("Product updated successfully.");
  } catch (error) {
      res.status(500).json(error);
  }
})

//! Delete
router.post("/delete",async (req,res)=>{
    try {
      await Product.findByIdAndRemove({_id: req.body.productId})
      res.status(200).json("Product deleted successfully.");
  } catch (error) {
      res.status(500).json(error);
  }
})


module.exports = router;