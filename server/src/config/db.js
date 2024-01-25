const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');
const logger = require('../controllers/logger/logerController');



const connectDatabase=async(optins={})=>{
    try {
        await mongoose.connect(mongodbURL,optins);
        logger.log('info',"Connection to DB is successfullly established.");
        mongoose.connection.on("error",(error)=>{
            logger.log("error","Connection to DB is error");  
        })
    } catch (error) {
        logger.log("error","could not connect to DB:",error.toString());    
    }
}
module.exports = connectDatabase;
