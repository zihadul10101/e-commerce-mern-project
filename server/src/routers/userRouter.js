const express= require("express");
const { getUsers, deletUserById, getUserById, processRegister, activateUserAccount, updateUserById, handleBanUserById, handleUnBanUserById } = require("../controllers/userController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const { validateUserRegistration } = require("../validors/auth");
const { runValidation } = require("../validors");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const userRouter = express.Router();


  
userRouter.post('/process-register',uploadUserImage.single("image"),isLoggedOut,validateUserRegistration,runValidation, processRegister );
userRouter.post('/activate',isLoggedOut,activateUserAccount);
userRouter.get('/',isLoggedIn,isAdmin,getUsers);
userRouter.get('/:id',isLoggedIn,getUserById );
userRouter.delete('/:id',isLoggedIn,deletUserById );
userRouter.put('/:id',uploadUserImage.single("image"),isLoggedIn,updateUserById);
userRouter.put('/ban-user/:id',isLoggedIn,isAdmin,handleBanUserById);
userRouter.put('/unban-user/:id',isLoggedIn,isAdmin,handleUnBanUserById);


module.exports={userRouter};