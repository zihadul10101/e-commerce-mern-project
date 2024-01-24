const express= require("express");

const { runValidation } = require("../validors");
const { handleLogin, handleLogout, handleRefreshToken } = require("../controllers/authController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const { validateUserLogin } = require("../validors/auth");
const authRouter = express.Router();

 
authRouter.post("/login",validateUserLogin,runValidation,isLoggedOut,handleLogin);
authRouter.post("/logout",isLoggedIn,handleLogout);
authRouter.get("/refresh-token",handleRefreshToken);


module.exports={authRouter};