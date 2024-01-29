const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const morgan = require('morgan');
const xssClean = require('xss-clean');
const rateLimit= require("express-rate-limit");
const { userRouter } = require('./routers/userRouter');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');
const { authRouter } = require('./routers/authRouther');
const { categoryRouter } = require('./routers/categoryRouter');
const { productRouter } = require('./routers/productRouther');


const app = express()

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message:"to many request from this ip.Please try again later"
})


app.use(cookieParser());
app.use(xssClean());
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.use('/api/user',userRouter);
app.use('/api/seed',seedRouter);
app.use('/api/auth',authRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/products',productRouter);


// client error handling error
app.use(( req, res, next) => {

//   res.status(404).json({
//     message:"route not found"
//   });
  
  next(createError(404,'route not found'));
})
// server error handling error all errors
app.use((err, req, res, next) => {
  
 return errorResponse(res,{
  statusCode:err.status,
  message:err.message
});
})

module.exports=app;