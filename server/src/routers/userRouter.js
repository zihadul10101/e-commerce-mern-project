const express= require("express");
const { getUsers, deletUserById, getUserById, processRegister, activateUserAccount, updateUserById,
    handleManageUserById } = require("../controllers/userController");
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
userRouter.put('/manage-user/:id',isLoggedIn,isAdmin,handleManageUserById);



module.exports={userRouter};