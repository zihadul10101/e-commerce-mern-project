const createError = require('http-errors');
const User = require('../models/userModels');



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

      res.status(200).send({
      message:"user profile return",
      users,
      pagination:{
        totalPage:Math.ceil(count/limit),
        currentPage:page,
        previousPage:page-1>0? page-1:null,
        nextPage:page+1<Math.ceil(count/limit)? page+1:null,
      }
    })
   } catch (error) {
     next(error); 
   }
   
  }

  module.exports={getUsers};