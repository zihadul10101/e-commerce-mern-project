
const express= require("express");
const { 
    handleManageUserById, 
    handleUpdateUserById,
    handleGetUsers,
    handleGetUserById,
    handleDeletUserById,
    handleProcessRegister,
    handleActivateUserAccount,
    handleUpdatedPassword,
    handleForgetPassword,
    handleResetPassword} = require("../controllers/userController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const { validateUserRegistration, validateUserPassword, validateUserForgetPassword, validateUserResetPassword } = require("../validors/auth");
const { runValidation } = require("../validors");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const userRouter = express.Router();


 
userRouter.post('/process-register',uploadUserImage.single("image"),isLoggedOut,
validateUserRegistration,runValidation,handleProcessRegister);

userRouter.post('/activate',isLoggedOut,handleActivateUserAccount);

userRouter.get('/:id([0-9a-fA-F]{24})',isLoggedIn,handleGetUserById );

userRouter.delete('/:id([0-9a-fA-F]{24})',isLoggedIn,isAdmin,handleDeletUserById );


userRouter.put('/:id([0-9a-fA-F]{24})',uploadUserImage.single("image"),isLoggedIn,handleUpdateUserById);


userRouter.put('/reset-password',validateUserResetPassword,runValidation,handleResetPassword);

userRouter.put('/manage-user/:id([0-9a-fA-F]{24})',isLoggedIn,isAdmin,handleManageUserById);

userRouter.put('/updated-password/:id([0-9a-fA-F]{24})',validateUserPassword,runValidation,isLoggedIn,handleUpdatedPassword);

userRouter.post('/forget-password',validateUserForgetPassword,runValidation,handleForgetPassword);





module.exports={userRouter};