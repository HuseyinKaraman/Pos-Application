const Category = require("../models/Category.js");
const router = require("express").Router();


//! Get All
router.get("/getAll",async (req,res)=>{
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
  } catch (error) {
      res.status(500).json(error);
  }
})

//! Create
router.post("/add",async (req,res)=>{
      try {
        const newCategory = new Category(req.body)
        await newCategory.save();
        res.status(200).json("Category added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
})

//! Update
router.post("/update",async (req,res)=>{
    try {
      await Category.findByIdAndUpdate({_id: req.body.categoryId},req.body)
      res.status(200).json("Category updated successfully.");
  } catch (error) {
      res.status(500).json(error);
  }
})

//! Delete
router.post("/delete",async (req,res)=>{
    try {
      await Category.findByIdAndRemove({_id: req.body.categoryId})
      res.status(200).json("Category deleted successfully.");
  } catch (error) {
      res.status(500).json(error);
  }
})


module.exports = router;