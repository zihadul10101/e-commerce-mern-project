const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAcccessKey } = require('../secret');

const  isLoggedIn=async(req,res,next)=>{
   try {
    const accessToken=req.cookies.access_token;
    //console.log(accessToken);
    if(!accessToken){
        throw createError(401,"Access Token Not Found.Please Log in.");
    }
    const decode=jwt.verify(accessToken,jwtAcccessKey);
    //console.log(decode);
    if(!decode){
        throw createError(401,"Invalid Access Token,Please Log in Again");
    }
    req.user= decode.user;
    next();
   } catch (error) {
    next(error);
   }
}

const  isLoggedOut=async(req,res,next)=>{
   try {
    const accessToken=req.cookies.access_token;
    //console.log(accessToken);
    if(accessToken){
      try {
        const decode=jwt.verify(accessToken,jwtAcccessKey);
        if(decode){
            throw createError(400,"User is already logged in.");
        }  
      } catch (error) {
        throw error;
      }
       
    }
    next();
   } catch (error) {
    next(error);
   }
}
const  isAdmin=async(req,res,next)=>{
   try {
   ///console.log(req.user.isAdmin);
  if(!req.user.isAdmin){
    throw createError(403,"Forbidden.You must be an admin to access this resource.");
  }
    next();
   } catch (error) {
    next(error);
   }
}

module.exports={isLoggedIn,isLoggedOut,isAdmin}