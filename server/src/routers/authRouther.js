const express= require("express");
const { runValidation } = require("../validors");
const { handleLogin, handleLogout } = require("../controllers/authController");
const authRouter = express.Router();

 
authRouter.post("/login",handleLogin);
authRouter.post("/logout",handleLogout);


module.exports={authRouter};