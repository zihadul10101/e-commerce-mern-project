const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');



const connectDatabase=async(optins={})=>{
    try {
        await mongoose.connect(mongodbURL,optins);
        console.log("Connection to DB is successfullly");
        mongoose.connection.on("error",(error)=>{
            console.log("Connection to DB is error");  
        })
    } catch (error) {
        console.log("could not connect to DB:",error.toString());    
    }
}
module.exports= connectDatabase;
