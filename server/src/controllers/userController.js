const createError = require('http-errors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const {  findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImage');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey, clientURL } = require('../secret');
const { emailWithNodeMailer } = require('../helper/email');


// get all users
const getUsers=async (req, res,next) => {
   try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const searchRegExp = new RegExp(".*"+ search + ".*",'i');
    const filter = {
      isAdmin:{$ne: true},
      $or:[
        {name:{$regex:searchRegExp}},
        {email:{$regex:searchRegExp}},
        {phone:{$regex:searchRegExp}}
      ]
    }
     const options={password:0};


     const users=await User.find(filter,options)
     .limit(limit)
     .skip((page-1)*limit);


     const count= await User.find(filter).countDocuments();

     if(!users) throw createError(404,"No user Found")

    
    return successResponse(res,{
      statusCode:200,
      message:"User were returned successfully",
      payload:{
        users,
        pagination:{
          totalPage:Math.ceil(count/limit),
          currentPage:page,
          previousPage:page-1>0? page-1:null,
          nextPage:page+1<Math.ceil(count/limit)? page+1:null,
        },
      }
    })
   } catch (error) {
     next(error); 
   }
   
  }
  // single user by find by id in
const getUserById=async (req, res,next) => {
   try {
     const id= req.params.id;
     const options={password:0};
     const user= await findWithId(User,id,options);
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
const deletUserById=async (req, res,next) => {
   try {
     const id= req.params.id;
     const options={password:0};
     const user= await findWithId(User,id,options);
     const userImagePath= user.image;
     deleteImage(userImagePath);
     await User.findByIdAndDelete({_id:id,isAdmin:false});

      return successResponse(res,{
      statusCode:200,
      message:"User was delete successfully",  
    })
   } catch (error) {
     next(error); 
   }
   
  }
  // single user processRegister
const processRegister=async (req, res,next) => {
   try {
    const {name ,email,password,phone,address} =req.body;
    // console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    //const imageBufferString = req.file.buffer.toString('base64');

// create jwt
   const token = createJSONWebToken({ name, email, password, phone, address}, jwtActivationKey, '10m');
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
//await emailWithNodeMailer(emailData);
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
      payload:{
       token,
    
      } 
    })
   } catch (error) {
     next(error); 
   }
   
  }
  // single user activateUserAccount
const activateUserAccount=async (req, res,next) => {
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

module.exports={getUsers,getUserById,deletUserById,processRegister,activateUserAccount};