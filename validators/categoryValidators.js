const { body } = require('express-validator');

module.exports.categoryValidator = [
    body('name').not().isEmpty().trim().withMessage('category is required'),
]