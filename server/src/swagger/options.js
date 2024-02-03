const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Ecommerce Mern",
        version: "1.0.0",
        description: "Create routes for handling user authentication, product listing, product details,Your API description",
        contact: {
          name: "Zihadul Islam",
          email: "zihadul10101@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3002/api/user", // Update with your API base URL
          description: "Local Development Server",
        },
        
      ],
     
    },
 //  apis: ["./routers/userRouter.js"],
 apis: ['./src/routers/userRouter*.js']
  
  };
 module.exports=swaggerOptions;

  