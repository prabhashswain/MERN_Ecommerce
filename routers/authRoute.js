const { register, login }  = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidators');
const authRoute = require('express').Router();

authRoute.post('/register',registerValidator,register)
authRoute.post('/login',loginValidator,login)

module.exports = authRoute;

