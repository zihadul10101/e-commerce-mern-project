const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const cloudinary = require('../config/cloudinary');
const { successResponse } = require('./responseController');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientURL } = require('../secret');
const { handleUserAction, findUsers, findUserById, deleteUserById, updateUserById, updatedPasswordById, 
  userForgetPasswordByEmail, 
  resetPassword} = require('../services/userServices');
const checkUserExists = require('../helper/checkUserExist');
const sendEmail = require('../helper/sendEmail');
const createHttpError = require('http-errors');



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
    const image=req.file?.path;
    // if (!image) {
    //   throw new Error("Image File is Required");
    // }
    if (image && image.size>1024*1024*5) {
      throw new Error("File too large.It must be lees then 5 MB.");
    }

    //const imageBufferString = req.file.buffer.toString('base64');

// create jwt
const tokenPayload={ name, email, password, phone, address};
if(image){
  tokenPayload.image = image;
}
 const token = createJSONWebToken(tokenPayload, jwtActivationKey, '15m');
// prepare email
const baseUrl = "http://localhost:5173"; // Base URL for your frontend
const activationPath = `/users/activate/${token}`; // Activation path with token

const emailData = {
  email,
  subject: "Account Activation Email",
  html: `
    <h2>Hello ${name}!</h2>
    <p>Please click here to <a href="${baseUrl + activationPath}" target="_blank">
    activate your account</a></p>
  `
};
// send email with nodemailer
sendEmail(emailData);
const userExists=await checkUserExists(email);
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
  const handleActivateUserAccount = async (req, res, next) => {
    try {
      const token = req.body.token;
      if (!token) {
        throw createError(404, "Token not found");
      }
  
      // Attempt to verify and decode the token
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) {
        throw createError(401, "Invalid or expired token");
      }
  
      // Check for existing user with the same email
      const userExists = await User.exists({ email: decoded.email.toLowerCase() });
      if (userExists) {
        throw createError(409, "A user with this email already exists. Please sign in or request a new activation link.");
      }
  
      // File upload to Cloudinary (if applicable)
      const image = decoded?.image;
      if (image) {
        const response = await cloudinary.uploader.upload(image, { folder: "ecommerceMern/users" });
        decoded.image = response?.secure_url;
      }
  
      // Create the user
      await User.create(decoded);
  
      // Respond with success message
      return successResponse(res, {
        statusCode: 201,
        message: "User was registered successfully",
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw createError(401, "Token has expired");
      } else if (error.name === 'JsonWebTokenError') {
        throw createHttpError(401, "Invalid Token");
      } 
      // else if (error.name === 'MongoServerError' && error.code === 11000) {
      //   // Handle MongoDB duplicate key errors
      //   throw createError(409, "Duplicate key error. A user with this email may already exist.");
      // }
       else {
        throw error;
      }
    }
  };
  
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
    //  user password updated
const handleUpdatedPassword=async (req, res,next) => {
  try {
    const userId= req.params.id;
   
     const updatedUser = await updatedPasswordById(userId,req);
    
     return successResponse(res,{
     statusCode:200,
     message:"User was password updated successfully",  
     payload:{updatedUser}
   })
  } catch (error) {
    next(error); 
  }
  
 }
    //  user reset password
const handleResetPassword=async (req, res,next) => {
  try {
     const userId= req.params.id;
     const updatedUser = await resetPassword(userId,req);
    
     return successResponse(res,{
     statusCode:200,
     message:"User Reset password updated successfully",  
     payload:{updatedUser}
   })
  } catch (error) {
    next(error); 
  }
  
 }
    //  user forget password 
const handleForgetPassword=async (req, res,next) => {
  try {
    const {email} = req.body;
   const token= await userForgetPasswordByEmail(email);
    return successResponse(res,{
      statusCode:200,
      message:`Please go to your ${email}  for completing forget password.`, 
      payload: token
    })
  } catch (error) {
    next(error); 
  }
  
 }
  


module.exports={handleGetUsers,handleGetUserById,
  handleUpdateUserById,handleDeletUserById,
  handleProcessRegister,handleActivateUserAccount,
  handleManageUserById,handleUpdatedPassword,
  handleForgetPassword,handleResetPassword
};