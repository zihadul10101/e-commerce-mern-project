const createError = require('http-errors');
const user = require('../models/userModels');


  const getUsers= (req, res,next) => {
   try {
     //console.log(req.body.id);
     res.status(200).send({
      message:"user profile return",
      user:user
    })
   } catch (error) {
     next(error); 
   }
   
  }

  module.exports={getUsers};