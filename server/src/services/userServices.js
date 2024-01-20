const createHttpError = require("http-errors");
const User = require("../models/userModels");

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
      throw createHttpError(400,"Invalid action.Use 'ban' or 'unban' .");
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

module.exports={handleUserAction}