const createError = require('http-errors');
const slugify = require('slugify')
const Category = require('../models/categoryModels');





// create category 
const createCategory=async (name) => {

const newCategory = await Category.create({ name: name, slug: slugify(name) });
 return newCategory;  
 
 }
// get category 
const getCategory=async () => {
    const categories=await Category.find({}).select('name slug').lean();
    if(!categories){
        throw createError(404,"Category Not Found");
     }
 return categories;  
 }
// get single category 
const getSingleCategory=async (slug) => {
    const category=await Category.findOne({slug}).select('name slug').lean();
    console.log(category);
    if(!category){
        throw createError(404,"Category Not Found");
     }
 return category;  
 }
// get updated category 
const updatedCategory=async (name,slug) => {
     const filter={slug};
     const updates= {$set:{name:name,slug:slugify(name)}};
     const options=  {new:true};
    const updatedCategory= await Category.findOneAndUpdate(
        filter,
        updates,
        options
         )
         if(!updatedCategory){
            throw createError(404,"No category found with this slug");
         }
    return updatedCategory;  
 }
// delete category 
const deleteCategory=async(slug) => {  
     const result=  await Category.findOneAndDelete({slug:slug});
     if(!result){
        throw createError(404,"No category found with this slug");
     }
    return result;  
 }

module.exports={createCategory,getCategory,getSingleCategory,updatedCategory,deleteCategory};