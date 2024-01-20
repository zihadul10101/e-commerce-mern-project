const createError = require('http-errors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const {  findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImageHelper');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientURL } = require('../secret');
const { emailWithNodeMailer } = require('../helper/email');
const { handleUserAction, findUsers, findUserById, deleteUserById, updateUserById } = require('../services/userServices');


// get all users
const handleGetUsers=async (req, res,next) => {
  try {
   const search = req.query.search || "";
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 3;
   
   const result = await findUsers(search, limit, page);
  // console.log(result);
   return successResponse(res,{
     statusCode:200,
     message:"User were returned successfully",
     payload:{
        users: result.users,
        pagination: result.pagination,
     
     }
   })
  } catch (error) {
    next(error); 
  }
  
 }
  // single user by find by id in
const handleGetUserById=async (req, res,next) => {
  // console.log(req.user);
   try {
     const id= req.params.id;
     const options={password:0};
     const user= await findUserById(id,options);
      return successResponse(res,{
      statusCode:200,
      message:"User were returned successfully",
      payload:{
        user
      }   
    })
   } catch (error) {
     next(error); 
   } 
  }
  // single user delete
const handleDeletUserById=async (req, res,next) => {
   try {
     const id= req.params.id;
     const options={password:0};
     await deleteUserById(id,options);
   
      return successResponse(res,{
      statusCode:200,
      message:"User was delete successfully",  
    })
   } catch (error) {
     next(error); 
   }
   
  }
  // single user processRegister
const handleProcessRegister=async (req, res,next) => {
   try {
    const {name ,email,password,phone,address} =req.body;
    // console.log(req.file);
    const image=req.file?.path;
    // if (!image) {
    //   throw new Error("Image File is Required");
    // }
    if (image && image.size>1024*1024*2) {
      throw new Error("File too large.It must be lees then 2 MB.");
    }

    //const imageBufferString = req.file.buffer.toString('base64');

// create jwt
const tokenPayload={ name, email, password, phone, address};
if(image){
  tokenPayload.image = image;
}
 const token = createJSONWebToken(tokenPayload, jwtActivationKey, '15m');
// prepare email
const emailData = {
  email,
  subject: "Account Activation Email",
  html: `
    <h2>Hello ${name} !</h2>
    <p>Please click here to <a href="http://localhost:3000/api/users/activate/${token}" target="_blank">
    activate your account</a></p>
  `
};
// send email with nodemailer
try {
await emailWithNodeMailer(emailData);
} catch (emailError) {
  next(createError(500,"Failed to send verifation email"));
  return;
}
     const userExists= await User.exists({email:email});
     if(userExists){
      throw createError(409,"User with this email already exists , please sign in");
     }
      return successResponse(res,{
      statusCode:200,
      message:`Please go to your ${email}  for completing your registration process`, 
      payload: token
    })
   } catch (error) {
     next(error); 
   }
   
  }
  // single user activateUserAccount
const handleActivateUserAccount=async (req, res,next) => {
   try { 
  const token=req.body.token;
  if(!token){
    throw createError(404,"Token not found");
  }
 try {
  const decoded=jwt.verify(token,jwtActivationKey);
   if(!decoded){
    throw createError(401,"User was not able to verifited");
  }

  const userExists= await User.exists({email:decoded.email});
  if(userExists){
   throw createError(409,"User with this email already exists , please sign in");
  }
   await User.create(decoded);

      return successResponse(res,{
      statusCode:201,
      message:"User was registered successfully", 
    })
 } catch (error) {
  if(error.name== 'TokenExpiredError'){
    throw createError(401,"Token has expired");
  }else if(error.name== 'JsonWebTokenError'){
    throw createError(401,"Invalid Token");
  }else{
    throw error;
  }
 }

   
   } catch (error) {
     next(error); 
   }
   
  }
    // single user updated
const handleUpdateUserById=async (req, res,next) => {
  try {
    const userId= req.params.id;
   
     const updatedUser = await updateUserById(userId,req);
    
     return successResponse(res,{
     statusCode:200,
     message:"User was updated successfully",  
     payload:updatedUser
   })
  } catch (error) {
    next(error); 
  }
  
 }
    // single manage ban and unben user 
const handleManageUserById=async (req, res,next) => {
  try {
    const userId= req.params.id;
    const action= req.body.action;

  const successMessage= await handleUserAction(userId,action);

     return successResponse(res,{
     statusCode:200,
     message:successMessage,  
   
   })
  } catch (error) {
    next(error); 
  }
  
 }
  


module.exports={handleGetUsers,handleGetUserById,handleUpdateUserById,handleDeletUserById,handleProcessRegister,handleActivateUserAccount,
  handleManageUserById};