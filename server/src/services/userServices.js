const createError = require('http-errors');
const bcrypt =require('bcryptjs');
const User = require("../models/userModels");
const { deleteImage } = require('../helper/deleteImageHelper');
const mongoose=require('mongoose');

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
    //  const userImagePath= user.image;
    //  deleteImage(userImagePath);
  const user=  await User.findByIdAndDelete({_id:id,isAdmin:false});
    if(user && user.image){
      await deleteImage(user.image); 
    }   
     
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
       for(let key in req.body){
        if(allowedFields.includes(key)){
          updates[key]=req.body[key];
        }
        else if(key == 'email'){
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

module.exports={handleUserAction,findUsers,findUserById,deleteUserById,updateUserById,updatedPasswordById}