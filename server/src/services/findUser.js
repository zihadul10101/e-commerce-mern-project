const createHttpError = require("http-errors");
const User = require("../models/userModels");

const findUserById = async(id)=>{
   try {
    const options={password:0};
    const user=await User.findById(id,options)
    if(!user){
     throw createHttpError(404,"User does not exect with this id");
    } 
    return user;
   } catch (error) {
    if(error instanceof mongoose.Error){
       throw (createError(400,"Invalide User Id"))
       return;
        }
        throw error;
   }
}

module.exports={findUserById}