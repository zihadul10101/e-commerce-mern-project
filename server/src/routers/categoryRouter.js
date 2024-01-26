const express= require("express");

const { runValidation } = require("../validors");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const { validateCategory } = require("../validors/categories");
const { handleCreateCategory, handleGetCategories, handleGetSingleCategory, handleUpdatedCategory, handleDeleteCategory } = require("../controllers/categoryController");
const categoryRouter = express.Router();

// POST /api/categories
categoryRouter.post('/',validateCategory,runValidation,isLoggedIn,isAdmin,handleCreateCategory);
// GET /api/categories
categoryRouter.get('/',handleGetCategories);
// GET /api/categories => single category 
categoryRouter.get('/:slug',handleGetSingleCategory);
// PUT /api/categories => updated category 
categoryRouter.put('/:slug',validateCategory,runValidation,isLoggedIn,isAdmin,handleUpdatedCategory);
// DELETE /api/categories /:slug-> DELETE categories
categoryRouter.delete('/:slug',isLoggedIn,isAdmin,handleDeleteCategory);


module.exports={categoryRouter};