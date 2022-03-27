const { body } = require('express-validator');
module.exports.registerValidator = [
    body('name').not().isEmpty().trim().escape().withMessage('name is required'),
    body('email').not().isEmpty().trim().escape().withMessage('email is required'),
    body('password').isLength({ min: 5 }).withMessage('Password shoul be 5 character long')
]
module.exports.loginValidator = [
    body('email').not().isEmpty().trim().withMessage('email is required'),
    body('password').not().isEmpty().trim().withMessage('password is required')
]