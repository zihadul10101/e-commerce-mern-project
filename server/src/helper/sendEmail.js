const createHttpError = require("http-errors");
const { emailWithNodeMailer } = require("./email");

const sendEmail=async(emailData)=>{
    try {
      console.log("emailData",emailData);
        await emailWithNodeMailer(emailData);
        } catch (emailError) {
          console.log("Error Data",emailError);
          throw createHttpError(500,"Failed to send verifation email");
        }
}
module.exports=sendEmail;