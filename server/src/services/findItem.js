const createError = require("http-errors");


const findWithId = async(Model,id,options={})=>{
   try {

    const item=await Model.findById(id,options)
    if(!item){
     throw createError(404,`${Model.modelName}Item does not exect with this id`);
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