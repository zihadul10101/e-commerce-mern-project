const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const bcrypt =require('bcryptjs');
const { jwtAcccessKey } = require('../secret');

const handleLogin=async (req, res,next) => {
try {
   // email password req.body
   const {email, password} = req.body;
   //isExist 
   const user= await User.findOne({email});
   if(!user){
    throw createError(404,"User does not exist with this email.Please register first!.");
   };

   //compare the password
   const isPasswordMatch = await bcrypt.compare(password,user.password);
   if(!isPasswordMatch){
    throw createError(401,"Email/password did not match.");
   }
   //is banned 
   
   if(user.isBanned){
    throw createError(403,"User loggedin successfully");
   }
   //token set,cookie
   const tokenPayload={_id:user._id};
   const accessToken = createJSONWebToken(tokenPayload, jwtAcccessKey, '10m');
   res.cookie('accessToken',accessToken,{
    maxAge: 15 * 60 * 1000 , //15 minute
    httpOnly:true,
    //secure:true,
    sameSite:'none'
   })
   // success Response 
   return successResponse(res,{
    statusCode:200,
    message:"User logged in successfully",
    payload:{  }
  })
} catch (error) {
    next(error);
}
}
const handleLogout=async (req, res,next) => {
try {
   res.clearCookie('accessToken');
   // success Response 
   return successResponse(res,{
    statusCode:200,
    message:"User logged out successfully",
    payload:{  }
  })
} catch (error) {
    next(error);
}
}
module.exports={handleLogin,handleLogout};