const {Schema,model} = require('mongoose');


const categorySchema= new Schema({
  name:{
   type:  String,
   require:[true,'category name is required'],
   trim:true,
   unique:true,
   minLength:[3,"The length of category name can be minmum 3"],
  },
  slug:{
   type:  String,
   require:[true,'slug is required'],
   lowercase:true,
   unique:true,
  },
 
 
},{timestamps: true});


const Category=model('Category',categorySchema);
module.exports= Category;