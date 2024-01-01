const express= require("express");
const { getUsers, deletUserById, getUserById, processRegister, activateUserAccount } = require("../controllers/userController");
const { upload } = require("../middlewares/uplodeFile");
const { validateUserRegistration } = require("../validors/auth");
const { runValidation } = require("../validors");
const userRouter = express.Router();


  
userRouter.post('/process-register',upload.single("image"),validateUserRegistration,runValidation, processRegister );
userRouter.post('/verify',activateUserAccount );
userRouter.get('/',getUsers );
userRouter.get('/:id',getUserById );
userRouter.delete('/:id',deletUserById );


  module.exports={userRouter};