
const express= require("express");
const { 
    handleManageUserById, 
    handleUpdateUserById,
    handleGetUsers,
    handleGetUserById,
    handleDeletUserById,
    handleProcessRegister,
    handleActivateUserAccount,
    handleUpdatedPassword,
    handleForgetPassword,
    handleResetPassword} = require("../controllers/userController");
const { uploadUserImage } = require("../middlewares/uplodeFile");
const { validateUserRegistration, validateUserPassword, validateUserForgetPassword, validateUserResetPassword } = require("../validors/auth");
const { runValidation } = require("../validors");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const userRouter = express.Router();


  /**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         // Define your user properties here
 *       example:
 *         // Example user object
 */

/**
 * @swagger
 * /process-register:
 *   post:
 *     summary: Process user registration
 *     description: Endpoint for processing user registration.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request - validation error or missing fields
 *       '500':
 *         description: Internal server error
 *     x-swagger-ui:
 *       css: |
 *         .swagger-ui .topbar {
 *           background-color: #3498db;
 *         }
 */

userRouter.post('/process-register',uploadUserImage.single("image"),isLoggedOut,
validateUserRegistration,runValidation,handleProcessRegister);



userRouter.post('/activate',isLoggedOut,handleActivateUserAccount);
userRouter.get('/',isLoggedIn,isAdmin,handleGetUsers);
userRouter.get('/:id([0-9a-fA-F]{24})',isLoggedIn,handleGetUserById );
userRouter.delete('/:id([0-9a-fA-F]{24})',isLoggedIn,isAdmin,handleDeletUserById );
userRouter.put('/reset-password',validateUserResetPassword,runValidation,handleResetPassword);
userRouter.put('/:id([0-9a-fA-F]{24})',uploadUserImage.single("image"),isLoggedIn,handleUpdateUserById);
userRouter.put('/manage-user/:id([0-9a-fA-F]{24})',isLoggedIn,isAdmin,handleManageUserById);
userRouter.put('/updated-password/:id([0-9a-fA-F]{24})',validateUserPassword,runValidation,isLoggedIn,handleUpdatedPassword);
userRouter.post('/forget-password',validateUserForgetPassword,runValidation,handleForgetPassword);





module.exports={userRouter};