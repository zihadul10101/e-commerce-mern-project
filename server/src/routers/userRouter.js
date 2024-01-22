const express= require("express");
const { 
    handleManageUserById, 
    handleUpdateUserById,
    handleGetUsers,
    handleGetUserById,
    handleDeletUserById,
    handleProcessRegister,
    handleActivateUserAccount,
    handleUpdatedPassword} = require("../controllers/userController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const { validateUserRegistration, validateUserPassword } = require("../validors/auth");
const { runValidation } = require("../validors");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const userRouter = express.Router();


  
userRouter.post('/process-register',uploadUserImage.single("image"),isLoggedOut,validateUserRegistration,runValidation,handleProcessRegister );
userRouter.post('/activate',isLoggedOut,handleActivateUserAccount);
userRouter.get('/',isLoggedIn,isAdmin,handleGetUsers);
userRouter.get('/:id',isLoggedIn,handleGetUserById );
userRouter.delete('/:id',isLoggedIn,handleDeletUserById );
userRouter.put('/:id',uploadUserImage.single("image"),isLoggedIn,handleUpdateUserById);
userRouter.put('/manage-user/:id',isLoggedIn,isAdmin,handleManageUserById);
userRouter.put('/updated-password/:id',validateUserPassword,runValidation,isLoggedIn,handleUpdatedPassword);



module.exports={userRouter};