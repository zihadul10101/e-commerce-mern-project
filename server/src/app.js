const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const morgan = require('morgan')
const app = express()


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
// app.use(express.json());
// app.use(express.urlencoded({ extended:true}));

const isLoggedIn=(req,res,next)=>{
  // console.log("Is loggedin middlewar");
  const login= true;
  if (login) {
    req.body.id=101;
    next();
  } else {
    return res.status(401).json({
      message:"Please login first"
    })
  }
  // next();
}

app.get('/test', (req, res) => {
  res.status(200).send({
    message:"get:Apping tsteing successfully"
  })
})
app.get('/api/user',isLoggedIn, (req, res) => {

  console.log(req.body.id);
  res.status(200).send({
    message:"user profile return"
  })
})
// client error handling error
app.use(( req, res, next) => {

//   res.status(404).json({
//     message:"route not found"
//   });
  
  next(createError(404,'route not found'));
})
// server error handling error all errors
app.use((err, req, res, next) => {
//   console.error(err.stack)
 return res.status(err.status || 500).json({
    success:false,
    message:err.message,
 })
})

module.exports=app;