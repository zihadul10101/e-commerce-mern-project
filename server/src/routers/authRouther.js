const express= require("express");

const { runValidation } = require("../validors");
const { handleLogin, handleLogout, handleRefreshToken, handleProtectedRoute } = require("../controllers/authController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const { validateUserLogin } = require("../validors/auth");
const authRouter = express.Router();

 
authRouter.post("/login",validateUserLogin,runValidation,isLoggedOut,handleLogin);
authRouter.post("/logout",isLoggedIn,handleLogout);
authRouter.get("/refresh-token",handleRefreshToken);
authRouter.get("/protected",handleProtectedRoute);


module.exports={authRouter};