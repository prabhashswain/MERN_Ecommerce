const categoryRoute = require('express').Router();
const category = require('../controllers/categoryController');
const { categoryValidator } = require('../validators/categoryValidators');
const Authorization = require('../controllers/authorizationController');

categoryRoute.post('/create',[ categoryValidator,Authorization.authorized ],category.create);
categoryRoute.get('/categories/:page',category.categories);
categoryRoute.get('/category/:id',category.fetchCategory);
categoryRoute.put('/update/:id',categoryValidator,category.updateCategory);
categoryRoute.delete('/delete/:id',category.deleteCategory);

module.exports = categoryRoute;