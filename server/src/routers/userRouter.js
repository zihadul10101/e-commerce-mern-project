
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
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user. Please enter a valid email.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user and The length of user password can be minmum 6.
 *         image:
 *           type: string
 *           description: The image URL or path of the user.
 *         address:
 *           type: string
 *           description: The address of the user.The length of user address can be minmum 3
 *         phone:
 *           type: string
 *           description: The phone number of the user.
 *       
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: Zihad1@666666
 *         image: /path/to/user/image.jpg
 *         address: 123 Main Street
 *         phone: +1234567890

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

/**
 * @swagger
 * /activate:
 *   post:
 *     summary: Activate user account
 *     description: Activate a user account using the provided activation token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Activation token received by the user.
 *             example:
 *               token: "your_activation_token_here"
 *     responses:
 *       201:
 *         description: User account activated successfully.
 *       401:
 *         description: Invalid or expired activation token.
 *       404:
 *         description: Activation token not found.
 *       409:
 *         description: User with this email already exists. Please sign in.
 */

userRouter.post('/activate',isLoggedOut,handleActivateUserAccount);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users based on search criteria, pagination, and authorization.
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering users by name, email, or phone.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The current page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of users to return per page.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User were returned successfully
 *                 payload:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalPage:
 *                           type: integer
 *                           example: 3
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         previousPage:
 *                           type: integer
 *                           nullable: true
 *                           example: null
 *                         nextPage:
 *                           type: integer
 *                           nullable: true
 *                           example: 2
 *                         totalNumberOfUsers:
 *                           type: integer
 *                           example: 10
 *       404:
 *         description: No user found based on the search criteria.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 */
userRouter.get('/',isLoggedIn,isAdmin,handleGetUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their unique identifier.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: The ID of the user to retrieve.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User was returned successfully
 *                 payload:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found based on the provided ID.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 */
userRouter.get('/:id([0-9a-fA-F]{24})',isLoggedIn,handleGetUserById );
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user based on their unique identifier. Requires admin privileges.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: The ID of the user to delete.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User was deleted successfully
 *       404:
 *         description: User not found based on the provided ID.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *       403:
 *         description: Forbidden, user does not have admin privileges.
 */
userRouter.delete('/:id([0-9a-fA-F]{24})',isLoggedIn,isAdmin,handleDeletUserById );

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user information by their unique identifier. Requires user authentication.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload for the user.
 *             example:
 *               name: John Doe
 *               password: new_password_here
 *               phone: +1234567890
 *               address: 123 Main Street
 *               email: john.doe@example.com
 *               image: image_file_here
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User was updated successfully
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid User ID or validation error in the request body.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *       404:
 *         description: User not found based on the provided ID.
 *       422:
 *         description: Validation error in the request body.
 */
userRouter.put('/:id([0-9a-fA-F]{24})',uploadUserImage.single("image"),isLoggedIn,handleUpdateUserById);

/**
 * @swagger
 * /reset-password:
 *   put:
 *     summary: Reset user password
 *     description: Reset the password for a user using a reset token. Requires a valid reset token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *               token:
 *                 type: string
 *                 description: The reset token received by the user.
 *             example:
 *               password: new_password_here
 *               token: reset_token_here
 *     responses:
 *       200:
 *         description: User password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User password reset successfully
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid or expired reset token.
 *       401:
 *         description: Unauthorized, missing or invalid reset token.
 *       500:
 *         description: Internal server error during password reset.
 */
userRouter.put('/reset-password',validateUserResetPassword,runValidation,handleResetPassword);
/**
 * @swagger
 * /manage-user/{id}:
 *   put:
 *     summary: Manage user by ID (Ban/Unban)
 *     description: Ban or unban a user by their unique identifier. Requires admin privileges.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: The ID of the user to manage (ban/unban).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [ban, unban]
 *                 description: The action to perform on the user (ban or unban).
 *             example:
 *               action: ban
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User managed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User was banned successfully
 *       400:
 *         description: Invalid action. Use 'ban' or 'unban'.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *       404:
 *         description: User not found based on the provided ID.
 *       500:
 *         description: Internal server error during user management.
 */

userRouter.put('/manage-user/:id([0-9a-fA-F]{24})',isLoggedIn,isAdmin,handleManageUserById);
/**
 * @swagger
 * /updated-password/{id}:
 *   put:
 *     summary: Update user password by ID
 *     description: Update the password for a user by their unique identifier. Requires user authentication.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: objectId
 *         required: true
 *         description: The ID of the user to update the password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               oldPassword:
 *                 type: string
 *                 description: The old password for the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *               confirmedPassword:
 *                 type: string
 *                 description: The confirmed new password for the user.
 *             example:
 *               email: user@example.com
 *               oldPassword: old_password_here
 *               newPassword: new_password_here
 *               confirmedPassword: new_password_here
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: User password updated successfully
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid User ID, email, old password, or password confirmation.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *       404:
 *         description: User not found based on the provided ID.
 *       422:
 *         description: Validation error in the request body.
 */


userRouter.put('/updated-password/:id([0-9a-fA-F]{24})',validateUserPassword,runValidation,isLoggedIn,handleUpdatedPassword);

/**
 * @swagger
 * /forget-password:
 *   post:
 *     summary: Forget password
 *     description: Initiate the forget password process by sending a reset link to the user's email.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user requesting a password reset.
 *             example:
 *               email: user@example.com
 *     responses:
 *       200:
 *         description: Forget password process initiated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Please go to your user@example.com for completing forget password.
 *                 payload:
 *                   type: string
 *                   example: reset_token_here
 *       400:
 *         description: Invalid email or validation error in the request body.
 *       404:
 *         description: Email is incorrect or the user has not verified their email address.
 *       500:
 *         description: Internal server error during forget password process.
 */

userRouter.post('/forget-password',validateUserForgetPassword,runValidation,handleForgetPassword);





module.exports={userRouter};