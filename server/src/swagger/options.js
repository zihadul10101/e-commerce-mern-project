const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Ecommerce Mern",
        version: "1.0.0",
        description: "Responsive Design:Ensure your website is responsive and works well on various devices, including desktops, tablets, and smartphones. This improves the user experience and accessibility."
        ,
        contact: {
          name: "Zihadul Islam",
          email: "zihadul10101@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3002", // Update with your API base URL
          description: "Local Development Server",
        },
        
      ],
     
    },
 //  apis: ["./routers/userRouter.js"],
 apis: ['./src/routers/userRouter*.js']
  
  };
 module.exports=swaggerOptions;

  