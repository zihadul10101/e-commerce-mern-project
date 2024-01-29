const {body}= require('express-validator');
// create product validator
// name , slug , description , price , quantity , sold , shipping ,image
const validateCreateProduct=[
    body('name')
    .trim()
    .notEmpty()
    .withMessage("Product name is required.")
    .isLength({min:3,max:150})
    .withMessage("Product name should be at least 3-150 characters long"),
    body('description')
    .trim()
    .notEmpty()
    .isLength({min:3})
    .withMessage("Product description should be at least 3 characters long.") ,
    body('price')
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({min:0})
    .withMessage("Price must be a positive number"),
    body('quantity')
    .trim()
    .isInt({min:1})
    .withMessage("quantity must be a positive number"),
    body('image')
    .optional()
    .isString()
    .withMessage("Product Image is optional"),
    body('category')
    .trim()
    .notEmpty()
    .withMessage("category is required"),
   
]

module.exports={validateCreateProduct}