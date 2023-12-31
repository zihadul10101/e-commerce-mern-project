const fs = require('fs').promises;
const deleteImage = async(UserImagePath) =>{
   
try {
    await  fs.access(UserImagePath)
    await  fs.unlink(UserImagePath)
    console.error("user image was deleted")
} catch (error) {
    console.log("user image does not exect")   
}
      
}
module.exports={ deleteImage}