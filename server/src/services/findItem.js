const createHttpError = require("http-errors");
const User = require("../models/userModels");

const findWithId = async(id,options={})=>{
   try {

    const item=await User.findById(id,options)
    if(!item){
     throw createHttpError(404,"Item does not exect with this id");
    } 
    return item;
   } catch (error) {
    if(error instanceof mongoose.Error){
       throw (createError(400,"Invalide User Id"))
       return;
        }
        throw error;
   }
}

module.exports={findWithId}