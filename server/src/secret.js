require('dotenv').config();
 const serverPort=process.env.SERVER_PORT || 3002;
//  const mongodbURL=process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB";
  const mongodbURL="mongodb://localhost:27017";
 const defaultImagePath =process.env.DEFAULT_USER_IMAGE || 'public/image/users/default.png';
const jwtActivationKey=process.env.jwtActivationKey || "AAAAAAAAhhhSSSSSS555$$";
const jwtAcccessKey=process.env.JWT_ACCESS_KEY || "AAAAAAAAhhhSSSSSS555$$";
const jwtRefreshKey=process.env.JWT_REFRESH_KEY || "AAAAAAAAhhhSSSSSS555$$";
const jwtForgetPasswordKey=process.env. JWT_ACCESS_FORGET_PASSWORD || "AAAAAAAAhhhSSSSSS555$$";
const smtpUsername=process.env.SMTP_USERNAME || "";
const smtpPassword=process.env.SMTP_PASSWORD || "";
const clientURL=process.env.CLIENT_URL || "http://localhost:3000";
const uploadDir = process.env. UPLOAD_FILE || "../public/images/users";
const cloudinaryName=process.env.CLOUDINARY_NAME;
const cloudinaryAppKey=process.env.CLOUDINARY_APP_KEY;
const cloudinarySecret=process.env.CLOUDINARY_SECRET;
const secret_url=process.env.CLOUDINARY_URL;

module.exports={
  serverPort,
  mongodbURL,
  defaultImagePath,
  jwtActivationKey,
   jwtRefreshKey,
    smtpUsername,
    smtpPassword,
    clientURL,
    uploadDir,
    jwtAcccessKey,
    jwtForgetPasswordKey,
    cloudinarySecret,
    cloudinaryName,
    secret_url,
    cloudinaryAppKey
  };