const cloudinary = require('../config/cloudinary')
const publicIdWithoutExtensionFromUrl=async(imageUrl)=>{
   const pathSegments=imageUrl.split('/');
   //get the last segment 
   const lastSegment=pathSegments[pathSegments.length-1];
   const valueWithoutExtension= lastSegment.replace('.jpg','');
   return valueWithoutExtension;
};

const deletFileFromCloudinary = async(folderName,publicId,modelName)=>{
try {
    const {result}= await cloudinary.uploader.destroy(`${folderName}/${publicId}`);
 
    if(result != 'ok'){
      throw new Error(`${modelName} image not deleted successfully from cloudinary.Please try again.`)
    }
} catch (error) {
    throw error;
}
}

module.exports={publicIdWithoutExtensionFromUrl,deletFileFromCloudinary};