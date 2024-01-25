const createHttpError = require("http-errors");
const { emailWithNodeMailer } = require("./email");

const sendEmail=async(emailData)=>{
    try {
        await emailWithNodeMailer(emailData);
        } catch (emailError) {
          throw createHttpError(500,"Failed to send verifation email");
        }
}
module.exports=sendEmail;