const express= require("express");
const { getUsers, deletUserById, getUserById, processRegister, activateUserAccount, updateUserById } = require("../controllers/userController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const { validateUserRegistration } = require("../validors/auth");
const { runValidation } = require("../validors");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const userRouter = express.Router();


  
userRouter.post('/process-register',uploadUserImage.single("image"),isLoggedOut,validateUserRegistration,runValidation, processRegister );
userRouter.post('/activate',isLoggedOut,activateUserAccount );
userRouter.get('/',isLoggedIn ,getUsers);
userRouter.get('/:id',isLoggedIn,getUserById );
userRouter.delete('/:id',isLoggedIn,deletUserById );
userRouter.put('/:id',uploadUserImage.single("image"),isLoggedIn,updateUserById);


module.exports={userRouter};