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
const { handleUserAction } = require('../services/userServices');


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
  // console.log(req.user);
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
    //  const userImagePath= user.image;
    //  deleteImage(userImagePath);
     await User.findByIdAndDelete({_id:id,isAdmin:false});
   if(user && user.image){
     await deleteImage(user.image); 
   }
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
    // single user updated
const updateUserById=async (req, res,next) => {
  try {
    const userId= req.params.id;
    //find user
    const options={password:0};
    const user= await findWithId(User,userId,options);
    const updateOptions={new:true,runValidators:true,context:'query'};
     let updates={};
     // name,email,password,phone,image,address
    //  if(req.body.name){
    //    updates.name=req.body.name;
    //  }
    //  if(req.body.password){
    //    updates.password=req.body.password;
    //  }
    //  if(req.body.phone){
    //    updates.phone=req.body.phone;
    //  }
    //  if(req.body.address){
    //    updates.address=req.body.address;
    //  }
   for(let key in req.body){
    if(['name','password','phone','address'].includes(key)){
      updates[key]=req.body[key];
    }
    else if(['email'].includes(key)){
      throw new Error("Email can't be updated.");
    }
   }
     const image=req.file?.path;
    //  console.log("updated image ..."); 
    //  console.log(image);
    //  console.log("updated image ..."); 
     if(image){
      // image size max 2 mb
      if (image.size>1024*1024*2) {
        throw new Error("File too large.It must be lees then 2 MB");
      }
      updates.image = image;
      // before image replace at this time
      user.image != 'default.png' && deleteImage(user.image);
     }
 
  const updatedUser=await User.findByIdAndUpdate(userId,updates,updateOptions).select("-password");
  if(!updatedUser){
    throw new Error("User with this id does not existes");
  }

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
  


module.exports={getUsers,getUserById,deletUserById,processRegister,activateUserAccount,updateUserById,
  handleManageUserById};