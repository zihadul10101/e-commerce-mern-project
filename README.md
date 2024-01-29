#ECOMERE PROJECT MERAN 
## Enverment setup
1. node install, 
## Express server setup
1. npm init -y
2. npm i express
## HTTP request and  response
## Nodemon and morgan package
1. npm i --save-dev nodemon
chang packaje.jeson
  "scripts": {
    "start": "node ./src/server.js",
    "dev": "nodemon ./src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
2. npm i --save-dev morgan

## api test with postman
## Middleware (req,res,next) 
## Built-in middleware
1. express.json
2. express.urlencoded
## Error-handling middleware
## Third-party middleware
 0. npm i body-parser
  1. server error handling error
  2. client error handling error
## How to handle HTTP errors
1. npm install http-errors

## How to secure API -> xss-clean , express-rate-limit
1. npm i xss-clean
2. npm i express-rate-limit

##  Environment variable and .gitignore
1. npm i dotenv

## MVC Architecture
1. modeal view controller 

## DataBase connection mongodb
1. install mongodb
2. install mongodb connection
3. npm install mongoose --save

## Schema and Model for user
1. npm i bcrypt
## Create a Seed route for user
## GET/api/users -> isAdmin-> getAllUsers ->SearchByName -> pagination functionality
## response Handler controller for error or success 
## GET /api/user/:id -> get a single user by id
## How to create services in the backend
## Delete/api/user/:id -> delete a single user by id
## Refoctor and reuability , dynamic
## Delete Image helper
## Post / api/user/process-register-> process the registration
## Create JWT -> npm i jsonwebtoken
1. npm i nodemailer
2. prepare smtp and prepare email
3. serch => security.google.com/settings/apppassword =>appname=>website=>vxdd qgrj ckag phjc

4. npm i bcryptjs
5. and uninstall npm uninstall bcrypt
6. npm install nodemailer

## Post / api/users/verify 
1. verify + register into data
## add multer middlewar Image upload
1. npm i multer
## File filtering file size and refactor
## add express validator middlewar
1. npm i express-validator
## Storing image as buffer or string?
## user logoutPUT/api/users/:id -> update a single user by id
 ***authentication and authorization *** 
## POST/api/auth/login=> user login using JWT
   1. email password req.body
   2. isExist 
   3. compare the password
   4. is banned 
   5. token set,cookie -> npm i cookie-parser
## POST/api/auth/logout=>  
## Middlewares => isLoggedIn,isLoggedOut,isAdmin
## input validation when signed ID and refactoring
## PUT /api/users/ban-user -> ban user
## PUT /api/users/unban-user -> unban user
## PUT /api/users/updated-password -> updated the password
 0. req body => email,oldPassword,newPassword,confirmedPassword
 1. extract email,oldPassword,newPassword,confirmedPassword
 2. isExist
 3. isPasswordMatch(oldPassword,password)
 4. setup updated option
 5. response
 ## POST /api/users/forget-password -> forget the password
 1. fetch the email
 2. user isExist
 3. create a json web token
 4. send reset password link in email including token 

 ## PUT /api/users/reset-password -> reset the password 
 0. body=> token and password
 1. fetch the token and password from req.body
 2. verify token
 3. if decode is empty show error message
 4. findOneAndUpdated
 5. if updated is not successfullly show error message

 ## Create refresh-token GET /api/auth/refresh-token
 ## Create protected route GET /api/auth/protected
 ## npm i winston
 ## Category CRUD Api :
 ## POST /api/categories -> create categories
  1. create category, modeal, route ,controller  and use npm i slugify
 ## GET /api/categories -> read categories
  1.  GET /api/categories
  2.  GET /api/categories/:slug
 ## PUT /api/categories /:slug-> Updated categories
 ## DELETE /api/categories /:slug-> DELETE categories
  ## Product CRUD Api:
  1. product api model
  2. create seed route for testing products
  ## POST /api/products -> create products
  ## GET /api/products -> read products
  ## PUT /api/products -> updated products
  ## DELETE /api/products -> delete products
  ## product API - Search products
  ## product API - filter products



