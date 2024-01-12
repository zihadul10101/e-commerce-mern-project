const fs = require('fs').promises;
const deleteImage = async(imagePath) =>{
   
try {
   // console.log("delete image");  
    await  fs.access(imagePath)
    await  fs.unlink(imagePath)
    console.error("user image was deleted");
} catch (error) {
    console.log("user image does not exist or could not be deleted");
    throw error; 
}
      
}
module.exports={ deleteImage}