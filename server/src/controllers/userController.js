const createError = require('http-errors');
const fs = require('fs');
const User = require('../models/userModels');
const { successResponse } = require('./responseController');
const  mongoose  = require('mongoose');
const { findUserById, findWithId } = require('../services/findItem');



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
  // single user by find by in
const getUser=async (req, res,next) => {
   try {
  
     const id= req.params.id;
     const options={password:0};
     const user= await findWithId(id,options);
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
const deletUser=async (req, res,next) => {
   try {
  
     const id= req.params.id;
     const options={password:0};
     const user= await findWithId(id,options);
 

      const UserImagePath= user.image;
      fs.access(UserImagePath,(err)=>{
        if(err){
          console.error("user image does not exist")
        }else{
          fs.unlink(UserImagePath,(err)=>{
            if(err){
              throw err;
              console.log("user image deleted");
            }
          })
        }
      })

      await User.findByIdAndDelete({_id:id,isAdmin:false});

      return successResponse(res,{
      statusCode:200,
      message:"User was delete successfully",  
    })
   } catch (error) {
    
     next(error); 
   }
   
  }

  module.exports={getUsers,getUser,deletUser};