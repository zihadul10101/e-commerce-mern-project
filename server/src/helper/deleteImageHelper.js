const logger = require('../controllers/logger/logerController');

const fs = require('fs').promises;
const deleteImage = async(imagePath) =>{
   
try { 
    await  fs.access(imagePath)
    await  fs.unlink(imagePath)
    logger.error("error","user image was deleted");
} catch (error) {
    logger.log("error","user image does not exist or could not be deleted");
    throw error; 
}
      
}
const deleteProductImage = async(imagePath) =>{
   
try { 
    await  fs.access(imagePath)
    await  fs.unlink(imagePath)
    logger.error("error","product image was deleted");
} catch (error) {
    logger.log("error","product image does not exist or could not be deleted");
    throw error; 
}
      
}
module.exports={ deleteImage,deleteProductImage}