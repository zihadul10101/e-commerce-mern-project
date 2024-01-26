const data = require("../data");
const Product = require("../models/productModels");
const User = require("../models/userModels");

const seedUser= async(req, res,next) => {
try {
// deleting all existing user
  await User.deleteMany({}); 
  //  inserting new user
  const users= await User.insertMany(data.users);

  // successfully response 
  return res.status(201).json(data.users);
} catch (error) {
  next(error);  
}
}
const seedProducts= async(req, res,next) => {
try {
// deleting all existing product
  await Product.deleteMany({}); 
  //  inserting new product
  const products= await Product.insertMany(data.products);

  // successfully response 
  return res.status(201).json(data.products);
} catch (error) {
  next(error);  
}
}

module.exports= {seedUser,seedProducts}