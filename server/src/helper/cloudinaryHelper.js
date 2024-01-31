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
const updateCloudinaryFile = async(imagePath, existingPublicId)=>{
    try {
        // Use the uploader to update the file
        const result = await cloudinary.uploader.upload(imagePath, { public_id: existingPublicId });
    
        console.log('File updated successfully in Cloudinary:', result);
        return result.secure_url; // Return the secure URL of the updated image
      } catch (error) {
        console.error('Error updating file in Cloudinary:', error.message);
        throw error;
      }
}


module.exports={publicIdWithoutExtensionFromUrl,deletFileFromCloudinary,updateCloudinaryFile};