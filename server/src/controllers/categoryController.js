const createError = require('http-errors');
const slugify = require('slugify')
const { successResponse } = require('./responseController');
const Category = require('../models/categoryModels');
const { createCategory, getCategory, getSingleCategory, updatedCategory, deleteCategory } = require('../services/categoryServices');





// create category 
const handleCreateCategory=async (req, res,next) => {
  try {
    const { name } = req.body;
    await createCategory(name);
   return successResponse(res,{
     statusCode:201,
     message:"Category was created successfully",
   })
  } catch (error) {
    next(error); 
  } 
 }
// get category 
const handleGetCategories=async (req, res,next) => {
  try {
    const { name } = req.body;
  const getAllCategory =  await getCategory(name);
   return successResponse(res,{
     statusCode:200,
     message:"Category was get successfully",
     payload:getAllCategory
   })
  } catch (error) {
    next(error); 
  } 
 }
// get single category  with slug
const handleGetSingleCategory=async (req, res,next) => {
  try {
    const slug= req.params.slug;
  const getSingleCategories =  await getSingleCategory(slug);
   return successResponse(res,{
     statusCode:200,
     message:"Single Category was get successfully",
     payload:getSingleCategories
   })
  } catch (error) {
    next(error); 
  } 
 }
// updated category  with slug
const handleUpdatedCategory=async (req, res,next) => {
  try {
    const name= req.body.name;
    const slug= req.params.slug;
   
  const CategoryUpdated =  await updatedCategory(name,slug);
   return successResponse(res,{
     statusCode:200,
     message:"Category was updated successfully",
     payload:CategoryUpdated
   })
  } catch (error) {
    next(error); 
  } 
 }
// updated category  with slug
const handleDeleteCategory=async (req, res,next) => {
  try {
    const slug= req.params.slug;
   
   await deleteCategory(slug);
   return successResponse(res,{
     statusCode:200,
     message:"Category was deleted successfully",
   
   })
  } catch (error) {
    next(error); 
  } 
 }

module.exports={handleCreateCategory,handleGetCategories,handleGetSingleCategory,handleUpdatedCategory,handleDeleteCategory};