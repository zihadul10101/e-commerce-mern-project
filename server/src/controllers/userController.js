const createError = require('http-errors');
const fs = require('fs');
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const {  findWithId } = require('../services/findItem');
const { deleteImage } = require('../helper/deleteImage');



const getUsers=async (req, res,next) => {
   try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

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
  // single user delet
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
    const newUser={
      name,
      email,
      password,
      phone,
      address
    };
     const userExists= await User.exists({email:email});
     if(userExists){
      throw createError(409,"User with this email already exists , please sign in");
     }

      return successResponse(res,{
      statusCode:200,
      message:"User was created successfully", 
      payload:{
        newUser
      } 
    })
   } catch (error) {
     next(error); 
   }
   
  }

  module.exports={getUsers,getUserById,deletUserById,processRegister};