const {body}= require('express-validator');
// Category validator
const validateCategory =[
    body('name')
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({min:3})
    .withMessage("Category nameshould be at least 3-31 characters long"),
    
]
module.exports={validateCategory}