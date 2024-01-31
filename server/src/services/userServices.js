const createError = require('http-errors');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const User = require("../models/userModels");
const { deleteImage } = require('../helper/deleteImageHelper');
const mongoose=require('mongoose');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtForgetPasswordKey, clientURL, cloudinaryAppKey } = require('../secret');
const sendEmail = require('../helper/sendEmail');
const { publicIdWithoutExtensionFromUrl, deletFileFromCloudinary, updateCloudinaryFile } = require('../helper/cloudinaryHelper');


// handle get user
 const findUsers = async (search,limit,page)=>{
 
    try {

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
    
         if(!users || users.length==0){
            throw createError(404,"No user Found");
         } 
       
         return {
            users,
            pagination:{
              totalPage:Math.ceil(count/limit),
              currentPage:page,
              previousPage:page-1>0? page-1:null,
              nextPage:page+1<Math.ceil(count/limit)? page+1:null,
              totalNumberOfUsers:count
            }, 
         } 
         
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400,"Invalide User Id"));
         }
       throw error; 
    }
 }
// handle get single user
 const findUserById = async (id,options={})=>{
 
    try {
   const user=await User.findById(id,options);
   if(!user){
    throw createError(404,"No user Found");
 }    
     return user;    
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400,"Invalide User Id"));
         }
       throw error; 
    }
 }
// handle delete user by id
 const deleteUserById = async (id,options={})=>{
 
    try {
      const userExists= await User.findOne({_id:id});
      if(userExists && userExists.image){
        const publicId = await publicIdWithoutExtensionFromUrl(userExists.image);
        deletFileFromCloudinary("ecommerceMern/users",publicId,"User");
      }
     await User.findByIdAndDelete({_id:id,isAdmin:false});
  // const user=  await User.findByIdAndDelete({_id:id,isAdmin:false});
    // if(user && user.image){
    //   await deleteImage(user.image); 
    // }   
     
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400,"Invalide User Id"));
         }
       throw error; 
    }
 }
// handle updated user by id
 const updateUserById = async (userId,req)=>{
 
    try {
        const options={password:0};
        const user= await findUserById(userId,options);
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
        const allowedFields=['name','password','phone','address'];
       for(const key in req.body){
        if(allowedFields.includes(key)){
          updates[key]=req.body[key];
        }
        else if(key == 'email'){
          throw createError(400,"Email can't be updated.");
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
       
        //  updates.image = image;
          // before image replace at this time
        //  user.image != 'default.png' && deleteImage(user.image);
         }
         if(image){
          const response = await cloudinary.uploader.upload(image, {
            folder: "ecommerceMern/users",
          });
          updates.image = response?.secure_url;
          const publicId = await publicIdWithoutExtensionFromUrl(user.image);
       
          deletFileFromCloudinary("ecommerceMern/users",publicId,"User");
         } 
      const updatedUser=await User.findByIdAndUpdate(userId,updates,updateOptions).select("-password");
      
      if(!updatedUser){
        throw new Error("User with this id does not existes");
      }
    
    return updatedUser;
     
    } catch (error) {
        if(error instanceof mongoose.Error.CastError){
            throw (createError(400,"Invalide User Id"));
         }
           throw error;
    }
 }
// manage user
const handleUserAction = async(userId,action) =>{
try {

    let update;
    let successMessage;
    if(action =='ban'){
      update={isBanned:true};
      successMessage="User was banned successfully "
    }
    else if(action == 'unban'){
      update={isBanned:false}
      successMessage="User was  unbanned successfully "
    }else{
      throw createError(400,"Invalid action.Use 'ban' or 'unban' .");
    }
   ;
  const updateOptions={new:true,runValidators:true,context:'query'}; 
  const updatedUser=await User.findByIdAndUpdate(userId,update,updateOptions).select("-password");
  
  if(!updatedUser){
    throw new Error("User was not banned successfully");
  } 
  return successMessage;
} catch (error) {
    throw error;
}
}

// handle updated user password by id
const updatedPasswordById = async (userId,req)=>{
 
  try {
  
    const {email,oldPassword,newPassword,confirmedPassword} = req.body;
    const user= await User.findOne({email});
    if(!user){
     throw createError(401,"User does not exist with this email.Please register first!.");
    };
   if(newPassword != confirmedPassword){
    throw createError(400,"New Password and Confirmed Password did not match.");
   }
   //compare the password
   const isPasswordMatch = await bcrypt.compare(oldPassword,user.password);
  
   if(!isPasswordMatch){
    throw createError(400,"Old password did not match.");
   } 
    //  let updates={$set:{password:newPassword}};
      //const updateOptions={new:true,runValidators:true,context:'query'};
      const updateOptions={new:true};
    const updatedUser=await User.findByIdAndUpdate(userId,{password:newPassword},updateOptions).select("-password");
    
    if(!updatedUser){
      throw new Error("User with this id does not existes");
    }
  
  return updatedUser;
   
  } catch (error) {
      if(error instanceof mongoose.Error.CastError){
          throw (createError(400,"Invalide User Id"));
       }
         throw error;
  }
}
// handle reset user password by id
const resetPassword = async (userId,req)=>{
 
  try {
    const {password,token} = req.body;
    const decoded=jwt.verify(token,jwtForgetPasswordKey);
    if(!decoded){
     throw createError(400,"Invalid or expired token");
   }
      const filter={email:decoded.email};
      const update={password:password}
      const updateOptions={new:true};
      const updatedUser=await User.findOneAndUpdate(filter,update,updateOptions)
    .select("-password");
    
    if(!updatedUser){
      throw new Error("Password reset failed");
    }
  return updatedUser;
   
  } catch (error) {
         throw error;
  }
}

// handle updated user password by id
const userForgetPasswordByEmail = async (email)=>{
 
  try {

    const user= await User.findOne({email});
    if(!user){
     throw createError(404,"Email is incorrect or you have not verified your email address.Please register first.");
    };
   
    // create jwt
    const tokenPayload={ email};
   
     const token = createJSONWebToken(tokenPayload, jwtForgetPasswordKey, '15m');
    // prepare email
    const emailData = {
      email,
      subject: "Reset password Email",
      html: `
        <h2>Hello ${user.name} !</h2>
        <p>Please click here to <a href="${clientURL}/api/users/forget-password/${token}"
         target="_blank">
          your forget password account</a></p>
      `
    };
    // send email with nodemailer
  sendEmail(emailData);
  
    return token;
   
  } catch (error) {
         throw error;
  }
}

module.exports={handleUserAction,findUsers,findUserById,deleteUserById,updateUserById,
  updatedPasswordById,userForgetPasswordByEmail,resetPassword}