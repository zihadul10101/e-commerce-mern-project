#ECOMERE PROJECT MERAN 
## Enverment setup
node install, 
## Express server setup
npm init -y
npm i express
## HTTP request and  response
## Nodemon and morgan package
npm i --save-dev nodemon
chang packaje.jeson
  "scripts": {
    "start": "node ./src/server.js",
    "dev": "nodemon ./src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
npm i --save-dev morgan

## api test with postman
## Middleware (req,res,next)
*Built-in middleware
1.express.json
2.express.urlencoded
*Error-handling middleware
*Third-party middleware
 npm i body-parser
  1.server error handling error
  2.client error handling error
## How to handle HTTP errors
npm install http-errors

## How to secure API -> xss-clean , express-rate-limit
npm i xss-clean
npm i express-rate-limit

##  Environment variable and .gitignore
npm i dotenv

## MVC Architecture
modeal view controller 

## DataBase connection mongodb
install mongodb
install mongodb connection
npm install mongoose --save

## Schema and Model for user
npm i bcrypt

## Create a Seed route for user

## GET/api/users -> isAdmin-> getAllUsers ->SearchByName -> pagination functionality
## response Handler controller for error or success 

