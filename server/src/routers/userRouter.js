const express= require("express");
const { getUsers, deletUserById, getUserById, processRegister } = require("../controllers/userController");
const userRouter = express.Router();


  
userRouter.post('/process-register',processRegister );
userRouter.get('/',getUsers );
userRouter.get('/:id',getUserById );
userRouter.delete('/:id',deletUserById );


  module.exports={userRouter};