const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')
const logger = require("morgan") // gelen istekleri görmemizi saglayacaktır

// routes 
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");


const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

//* middlewares
// app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.json());  
app.use(cors());

const connect = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected successfully");
  } catch (error) {
    throw error;
  }
};

app.use("/api/categories",categoryRoute);
app.use("/api/products",productRoute);
app.use("/api/bills",billRoute);
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);

app.get("/",(req,res)=>{
  res.send("Hello World!")
})






app.listen(PORT, () => {
  connect();
  console.log(`Application is listening on port ${PORT}`);
});
