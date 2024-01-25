const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const bcrypt =require('bcryptjs');
const { jwtAcccessKey, jwtRefreshKey } = require('../secret');
const { setAccessTokenCookie, setRefreshTokenCookie } = require('../helper/cookie');

const handleLogin=async (req, res,next) => {
try {
  
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
   const tokenPayload={user};
   const accessToken = createJSONWebToken(tokenPayload, jwtAcccessKey, '5m');
   setAccessTokenCookie(res,accessToken);

   //refresh token set,cookie
   const refreshToken = createJSONWebToken(tokenPayload, jwtRefreshKey, '7d');
   setRefreshTokenCookie(res,refreshToken);

   const userWithoutPassword= user.toObject();
   delete userWithoutPassword.password;
   // success Response 
   return successResponse(res,{
    statusCode:200,
    message:"User logged in successfully",
    payload:{userWithoutPassword}
  })
} catch (error) {
    next(error);
}
}
const handleLogout=async (req, res,next) => {
try {
   res.clearCookie('accessToken');
   res.clearCookie('refreshToken');
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
const handleRefreshToken=async (req, res,next) => {
try {
  const oldRefreshToken = req.cookies.refreshToken;

   // verify old Refresh Token
   const decodedToken=jwt.verify(oldRefreshToken,jwtRefreshKey);
   if(!decodedToken){
    throw createError(401,"Invalid refresh token.Pleash login again.")
   }
    //token set,cookie
    const accessToken = createJSONWebToken(decodedToken.user, jwtAcccessKey, '5m');
    setAccessTokenCookie(res,accessToken);
   return successResponse(res,{
    statusCode:200,
    message:"New access token is generated",

  })
} catch (error) {
    next(error);
}
}
const handleProtectedRoute=async (req, res,next) => {
try {
  const accessToken = req.cookies.accessToken;

   // verify old Refresh Token
   const decodedToken=jwt.verify(accessToken,jwtAcccessKey);
   if(!decodedToken){
    throw createError(401,"Invalid access token.Pleash login again.")
   }

   return successResponse(res,{
    statusCode:200,
    message:"Protected resourcess accessed successfully",

  })
} catch (error) {
    next(error);
}
}
module.exports={handleLogin,handleLogout,handleRefreshToken,handleProtectedRoute};