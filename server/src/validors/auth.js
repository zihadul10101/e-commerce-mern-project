const {body}= require('express-validator');
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


module.exports={validateUserRegistration}