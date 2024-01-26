const express = require("express");
const { seedUser, seedProducts } = require("../controllers/seedController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const seedRouter= express.Router();


seedRouter.get("/users",uploadUserImage.single("image"),seedUser)
seedRouter.get("/products",uploadUserImage.single("image"),seedProducts)


module.exports={seedRouter}