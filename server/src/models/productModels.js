const {Schema,model} = require('mongoose');
const { defaultImagePath } = require('../secret');

// name , slug , description , price , quantity , sold , shipping ,image
const productSchema= new Schema({
  name:{
   type:  String,
   require:[true,'Product name is required'],
   trim:true,
   minLength:[3,"The length of product name can be minmum 3"],
   maxLength:[150,"The length of  product name  can be maxmum 150 characters."]
  },
  slug:{
   type:  String,
   require:[true,'Product slug is required'],
   lowercase:true,
   unique:true,
  },
  description:{
    type:  String,
    require:[true,'Product description is required'],
    trim:true,
    minLength:[3,"The length of product description can be minmum 3"],
   },
  price:{
    type:  Number,
    require:[true,'Product description is required'],
    trim:true,
    validate:{
        validator:(v)=>{ v>0},
        message:(props)=>{
          `{props.value} is not a valid price!Price must be grater than 0.`
        },
    }
   },
   quantity:{
    type:Number,
    require:[true,'Product quantity is required'],
    trim:true,
    validate:{
        validator:(v)=>{ v>0},
        message:(props)=>{
          `{props.value} is not a valid quantity!Quantity must be grater than 0.`
        },
    }
   },
  sold:{
    type:Number,
    require:[true,'Product sold is required'],
    trim:true,
    default:0,
   },
   shipping:{
    type:Number,
    require:[true,'Product shipping is required'],
    trim:true,
    default:0,
    validate:{
        validator:(v)=>{ v>0},
        message:(props)=>{
          `{props.value} is not a valid Product shipping!Product shipping must be grater than 0.`
        },
    }
   },
   image:{
    type:  String,
    default: defaultImagePath || 'public/image/users/default.png'

   },
   category:{
    type:Schema.Types.ObjectId,
    ref:"Category",
    required:true
   }
},{timestamps: true});


const Product=model('Product',productSchema);
module.exports= Product;