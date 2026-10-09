const {Router} = require('express');
const  authController  = require('../controllers/auth.controller');
const authmiddleware = require('../middleware/auth.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');

const authRouter = Router();

authRouter.post('/register', authLimiter, authController.registerUserController);

authRouter.post('/login', authLimiter, authController.loginUserController);

authRouter.get('/logout', authController.logoutUserController);

//get the currently logged in user details
authRouter.get('/get-me', authmiddleware.authUser, authController.getMeController);

module.exports = authRouter;