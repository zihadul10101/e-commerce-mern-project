const express= require("express");

const { runValidation } = require("../validors");
const { handleLogin, handleLogout, handleRefreshToken, handleProtectedRoute, handleOtpVerification } = require("../controllers/authController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const { validateUserLogin, validateOtpVerification } = require("../validors/auth");
const authRouter = express.Router();

 
authRouter.post("/login",validateUserLogin,runValidation,isLoggedOut,handleLogin);
// authRouter.post("/otp-verification", validateOtpVerification, runValidation, handleOtpVerification);
authRouter.post("/logout",isLoggedIn,handleLogout);
authRouter.get("/refresh-token",handleRefreshToken);
authRouter.get("/protected",handleProtectedRoute);


module.exports={authRouter};