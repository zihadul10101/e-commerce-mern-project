const {Schema,model} = require('mongoose');
const bcrypt = require('bcryptjs');
const { defaultImagePath } = require('../secret');

const userSchema= new Schema({
  name:{
   type:  String,
   require:[true,'User name is required'],
   trim:true,
   minLength:[3,"The length of user name can be minmum 3"],
   maxLength:[31,"The length of user name can be minmum 31"]
  },
  email:{
    type:  String,
    require:[true,'User email is required'],
    unique:true,
    lowercase: true,
    trim:true,
    Validate:{
     validator: function (v) {
      return /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/;
     },
     message:"Please enter a valid email"
     }
   },
   password:{
    type:  String,
    require:[true,'User password is required'],
    minLength:[6,"The length of user password can be minmum 6"],
    set:(v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
   },
  //  image:{
  //   type:  Buffer,
  //   contentType: String,
  //   require:[true,'User image is required'],
   
  //  },
  image:{
    type:  String,
    default: defaultImagePath || 'public/image/users/user.png'

   },
   address:{
    type:  String,
    minLength:[3,"The length of user address can be minmum 3"],
    require:[true,'User address is required'],

   },
   phone:{
    type:  String,
    require:[true,'User phone is required'],

   },
   isAdmin:{
    type: Boolean,
    default: false

   },
   isBanned:{
    type: Boolean,
    default: false
   },
},{timestamps: true});


const User=model('User',userSchema);
module.exports= User;