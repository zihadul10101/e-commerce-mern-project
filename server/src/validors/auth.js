const {body}= require('express-validator');
const { check } = require("express-validator");
// registration validator
const validateUserRegistration =[
    body('name')
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your full name")
    .isLength({min:3,max:31})
    .withMessage("Name should be at least 3-31 characters long"),
    body('email')
    .trim()
    .notEmpty()
    .withMessage("Email is required,Enter your email")
    .isEmail()
    .withMessage("Invalid email address"),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("password is required.Enter your epassword")
    .isLength({min:6})
    .withMessage("password should be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/)
    .withMessage("Password should include at least one uppercase letter, one lowercase letter, one number, and one special character."),
    body('address')
    .trim()
    .notEmpty()
    .withMessage("address is required.Enter your address")
    .isLength({min:3})
    .withMessage("address should be at least 3 characters long"),
    body('phone')
    .trim()
    .notEmpty()
    .withMessage("phone is required.Enter your Phone number"),
    // body('image')
    // .custom((value,{req})=>{
    //     if(!req.file || !req.file.buffer){
    //         throw new Error("User image is required");
    //     }
    //     return true;
    // })
    // .withMessage("User Image is required")
    body('image')
    .optional()
    .isString()
    .withMessage("Image is required")
   
]
// sign in validator
const validateUserLogin =[
    body('email')
    .trim()
    .notEmpty()
    .withMessage("Email is required,Enter your email")
    .isEmail()
    .withMessage("Invalid email address"),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("password is required.Enter your epassword")
    .isLength({min:6})
    .withMessage("password should be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/)
    .withMessage("Password should include at least one uppercase letter, one lowercase letter, one number, and one special character."),
 
   
   
]
// updated password in validator
const validateUserPassword =[
  
    body('oldPassword')
    .trim()
    .notEmpty()
    .withMessage("Old password is required.Enter your old password")
    .isLength({min:6})
    .withMessage("Old password should be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/)
    .withMessage("Old Password should include at least one uppercase letter, one lowercase letter, one number, and one special character."),
 
    body('newPassword')
    .trim()
    .notEmpty()
    .withMessage("New password is required.Enter your old password")
    .isLength({min:6})
    .withMessage("New password should be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/)
    .withMessage("New Password should include at least one uppercase letter, one lowercase letter, one number, and one special character."),
    body('confirmedPassword').custom((value,{req})=>{
        if(value != req.body.newPassword){
            throw new Error("Password did not match");
        }
        return true;
    })
   
   
]
// forget password in validator
const validateUserForgetPassword =[
    body('email')
    .trim()
    .notEmpty()
    .withMessage("Email is required,Enter your email")
    .isEmail()
    .withMessage("Invalid email address"),
   
]
// reset password in validator
const validateUserResetPassword =[
    body('token')
    .trim()
    .notEmpty()
    .withMessage("Token is required."),
    body('password')
    .trim()
    .notEmpty()
    .withMessage("password is required.Enter your epassword")
    .isLength({min:6})
    .withMessage("password should be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/)
    .withMessage("Password should include at least one uppercase letter, one lowercase letter, one number, and one special character."),
 
   
]

// otp validator
const validateOtpVerification = [
    check("email").isEmail().withMessage("Invalid email"),
    check("otp").isNumeric().isLength({ min: 6, max: 6 }).withMessage("Invalid OTP format"),
  ];
  

module.exports={validateOtpVerification,validateUserRegistration,validateUserLogin,validateUserPassword,validateUserResetPassword,validateUserForgetPassword}