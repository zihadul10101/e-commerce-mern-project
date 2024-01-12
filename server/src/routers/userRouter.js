const express= require("express");
const { getUsers, deletUserById, getUserById, processRegister, activateUserAccount, updateUserById } = require("../controllers/userController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const { validateUserRegistration } = require("../validors/auth");
const { runValidation } = require("../validors");
const userRouter = express.Router();


  
userRouter.post('/process-register',uploadUserImage.single("image"),validateUserRegistration,runValidation, processRegister );
userRouter.post('/activate',activateUserAccount );
userRouter.get('/',getUsers);
userRouter.get('/:id',getUserById );
userRouter.delete('/:id',deletUserById );
userRouter.put('/:id',uploadUserImage.single("image"),updateUserById);


module.exports={userRouter};