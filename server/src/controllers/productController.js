const createError = require('http-errors');
const slugify = require('slugify')
const { successResponse } = require('./responseController');
const Category = require('../models/categoryModels');
const { getProducts, getSingleProduct, createProducts, updatedProducts, deleteProducts } = require('../services/productsServices');
const Product = require('../models/productModels');



// create product
const handleCreateProduct=async (req, res,next) => {
  try {
 const product=await createProducts(req);
   return successResponse(res,{
     statusCode:201,
     message:"Product was created successfully",
     payload:{product}
   })
  } catch (error) {
    next(error); 
  } 
 }
// get category 
const handleGetProducts=async (req, res,next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

  const result =  await getProducts(search, limit, page);
   return successResponse(res,{
     statusCode:200,
     message:"Product was get successfully",
     payload:{
        products: result.products,
        pagination: result.pagination,
     
     }
   })
  } catch (error) {
    next(error); 
  } 
 }
// get single category  with slug
const handleGetSingleProduct=async (req, res,next) => {
  try {
    const slug= req.params.slug;
    const result =  await getSingleProduct(slug);
    
   return successResponse(res,{
     statusCode:200,
     message:"Single Products was get successfully",
    payload:{result}
   })
  } catch (error) {
    next(error); 
  } 
 }
// updated category  with slug
const handleUpdatedProducts=async (req, res,next) => {
  try {
    const productsUpdated =  await updatedProducts(req);

   return successResponse(res,{
     statusCode:200,
     message:"Products was updated successfully",
     payload:productsUpdated
   })
  } catch (error) {
    next(error); 
  } 
 }
// updated category  with slug
const handleDeleteProducts=async (req, res,next) => {
  try {
    const slug= req.params.slug;
 
   await deleteProducts(slug);
   return successResponse(res,{
     statusCode:200,
     message:"Products was deleted successfully",
   
   })
  } catch (error) {
    next(error); 
  } 
 }

module.exports={
    handleCreateProduct,
    handleGetProducts,
    handleGetSingleProduct,
    handleUpdatedProducts,
    handleDeleteProducts
};