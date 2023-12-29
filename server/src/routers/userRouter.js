const express= require("express");
const { getUsers, deletUserById, getUserById } = require("../controllers/userController");
const userRouter = express.Router();


  
userRouter.get('/',getUsers );
userRouter.get('/:id',getUserById );
userRouter.delete('/:id',deletUserById );


  module.exports={userRouter};