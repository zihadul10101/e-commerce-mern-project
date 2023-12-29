const express= require("express");
const { getUsers, getUser, deletUser } = require("../controllers/userController");
const userRouter = express.Router();


  
userRouter.get('/',getUsers );
userRouter.get('/:id',getUser );
userRouter.delete('/:id',deletUser );


  module.exports={userRouter};