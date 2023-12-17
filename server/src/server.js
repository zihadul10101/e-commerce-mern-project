const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(morgan("dev"));
const port = 3000
const isLoggedIn=(req,res,next)=>{
  // console.log("Is loggedin middlewar");
  const login= false;
  if (login) {
    next()
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
  console.log("user profile");
  res.status(200).send({
    message:"user profile return"
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})