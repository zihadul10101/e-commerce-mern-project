const express= require("express");
const { getUsers, deletUserById, getUserById, processRegister, activateUserAccount } = require("../controllers/userController");
const { upload } = require("../middlewares/uplodeFile");
const userRouter = express.Router();


  
userRouter.post('/process-register',upload.single("image"), processRegister );
userRouter.post('/verify',activateUserAccount );
userRouter.get('/',getUsers );
userRouter.get('/:id',getUserById );
userRouter.delete('/:id',deletUserById );


  module.exports={userRouter};