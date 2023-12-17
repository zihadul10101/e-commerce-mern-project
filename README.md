#ECOMERE PROJECT MERAN 
## Enverment setup
node install, 
## Express server setup
npm init -y
npm i express
## HTTP response
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
 // server error handling error
 // client error handling error
## How to handle HTTP errors
npm install http-errors

