const createError = require('http-errors');



  const getUsers= (req, res,next) => {
   try {
     //console.log(req.body.id);
     res.status(200).send({
      message:"user profile return",
   
    })
   } catch (error) {
     next(error); 
   }
   
  }

  module.exports={getUsers};