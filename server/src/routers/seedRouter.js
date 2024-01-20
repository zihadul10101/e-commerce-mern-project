const express = require("express");
const { seedUser } = require("../controllers/seedController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const seedRouter= express.Router();


seedRouter.get("/users",uploadUserImage.single("image"),seedUser)


module.exports={seedRouter}