const express= require("express");

const { runValidation } = require("../validors");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const { validateCategory } = require("../validors/categories");
const { handleCreateProduct, handleGetProducts, handleGetSingleProduct, handleUpdatedProducts, handleDeleteProducts } = require("../controllers/productController");
const { uploadProductImage } = require("../middlewares/uplodeFile");
const { validateCreateProduct } = require("../validors/products");

const productRouter = express.Router();

// POST /api/product
productRouter.post('/',uploadProductImage.single("image"),validateCreateProduct,runValidation,isLoggedIn,isAdmin,handleCreateProduct);
// GET /api/products
productRouter.get('/',handleGetProducts);
// GET /api/product => single product 
productRouter.get('/:slug',handleGetSingleProduct);
// PUT /api/products => updated products 
productRouter.put('/:slug',uploadProductImage.single("image"),
validateCreateProduct,isLoggedIn,isAdmin,handleUpdatedProducts);
// DELETE /api/products /:slug-> DELETE products
productRouter.delete('/:slug',isLoggedIn,isAdmin,handleDeleteProducts);


module.exports={productRouter};