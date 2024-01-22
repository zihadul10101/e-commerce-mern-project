require('dotenv').config()
 const serverPort=process.env.SERVER_PORT || 3002;
//  const mongodbURL=process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB";
  const mongodbURL="mongodb://localhost:27017";
 const defaultImagePath =process.env.DEFAULT_USER_IMAGE || 'public/image/users/user.png';
 
const jwtActivationKey=process.env.jwtActivationKey || "AAAAAAAAhhhSSSSSS555$$";
const jwtAcccessKey=process.env.JWT_ACCESS_KEY || "AAAAAAAAhhhSSSSSS555$$";
const smtpUsername=process.env.SMTP_USERNAME || "";
const smtpPassword=process.env.SMTP_PASSWORD || "";
const clientURL=process.env.CLIENT_URL || "http://localhost:3000";
const uploadDir = process.env. UPLOAD_FILE || "../public/images/users";

module.exports={serverPort,mongodbURL,defaultImagePath,jwtActivationKey,
    smtpUsername,smtpPassword,clientURL,uploadDir,jwtAcccessKey};