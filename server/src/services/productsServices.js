const createError = require('http-errors');
const slugify = require('slugify')
const cloudinary = require('../config/cloudinary');
const Product = require('../models/productModels');
const { deleteProductImage } = require('../helper/deleteImageHelper');
const { publicIdWithoutExtensionFromUrl, deletFileFromCloudinary } = require('../helper/cloudinaryHelper');


// create product
const createProducts=async (req) => {
    // name , slug , description , price , quantity , sold , shipping ,image
    const { name ,description,price,quantity , sold , shipping,category} = req.body;
    let image=req.file?.path;
    if (image && image.size>1024*1024*4) {
        throw new Error("File too large.It must be lees then 4 MB.");
      }
      const productExists=await Product.exists({name:name});
if(productExists){
 throw createError(409,"Product with this name already exists .");
} 

if(image){
 const response = await cloudinary.uploader.upload(image, {
   folder: "ecommerceMern/products",
 });
image = response?.secure_url;
}
const newProduct = await Product.create({
     name: name,
     slug: slugify(name) ,
     description:description,
     price:price,
     quantity:quantity,
     sold:sold,
     shipping:shipping,
     image:image,
     category:category
    });
 return newProduct;  
  }
 
// get all product
const getProducts=async (search,limit,page) => {
    
    const searchRegExp = new RegExp(".*"+ search + ".*",'i');
    const filter = {
   
      $or:[
        {name:{$regex:searchRegExp}},
      //  {email:{$regex:searchRegExp}},
       
      ]
    }
    const products=await Product.find(filter)
    .limit(limit)
    .skip((page-1)*limit);
    const count= await Product.find(filter).countDocuments();
    
    if(!products || products.length==0){
        throw createError(404,"products Not Found");
     }
 return{
    products,
    pagination:{
      totalPage:Math.ceil(count/limit),
      currentPage:page,
      previousPage:page-1>0? page-1:null,
      nextPage:page+1<Math.ceil(count/limit)? page+1:null,
      totalNumberOfProduct:count
    }, 
 } ;  
 }
// get single product 
const getSingleProduct=async (slug) => {
    const product=await Product.find({slug});
  
    if(!product){
        throw createError(404,"Product Not Found");
     }
 return product;  
 }
// get updated product
const updatedProducts=async (req) => {
      const slug = req.params.slug;
      const product=await Product.findOne({slug});
     if(!product){
        throw createError(404,"Product Not Found");
     }
     let updates={};
     const allowedFields=['name' ,'description','price','quantity' , 'sold' , 'shipping','category'];
     for(const key in req.body){
      if(allowedFields.includes(key)){
        updates[key]=req.body[key];
      }
     
     }
     const image=req.file?.path;
  
     if (image && image.size>1024*1024*4) {
         throw new Error("File too large.It must be lees then 4 MB.");
       }
       updates.image = image;
       // before image replace at this time
      //  if (product.image && product.image !== 'default.png') {
      //   deleteImage(product.image);
      // }
       product.image != 'default.png' && deleteProductImage(product.image);
      
     const updateOptions={new:true,runValidators:true,context:'query'};
    
    const updatedProducts= await Product.findOneAndUpdate(
        {slug},
        updates,
        updateOptions
         );
         if(!updatedProducts){
            throw createError(404,"No product found with this slug");
         }

         return updatedProducts;  
 }
// delete product 
const deleteProducts=async(slug) => {  
  const productExists= await Product.findOne({slug:slug});
 
  if(productExists && productExists.image){
    const publicId = await publicIdWithoutExtensionFromUrl(productExists.image);
    deletFileFromCloudinary("ecommerceMern/products",publicId,"Product");

  }
    await Product.findOneAndDelete({slug:slug});
    //  const result=  await Product.findOneAndDelete({slug:slug});
    //  if(result && result.image){
    //   await deleteProductImage(result.image); 
    // }  
  //    if(!isProduct){
  //       throw createError(404,"No product found with this slug");
  //    }
  // return isProduct;
 }

module.exports={createProducts,getProducts,getSingleProduct,updatedProducts,deleteProducts};