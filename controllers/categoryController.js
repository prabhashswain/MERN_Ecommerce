const { validationResult } = require('express-validator');
const { Category } = require('../models/category');

class CategoryController {
    async create(req, res) {
        const errors = validationResult(req);
        const { name } = req.body;
        if (errors.isEmpty()) {
            try {
                const isExist = await Category.findOne({ name }) 
                if (!isExist) {
                    const category = await Category.create({ name })
                    return res.status(200).json({ message: 'Category Created Successfully', category });
                }
                return res.status(400).json({ errors : [{'msg':`${name} category Already exist`}] });
            } catch (error) {
                return res.status(400).json({ errors: [{ 'msg': 'something went wrong' }] });
            }
        }
        return res.status(400).json({ errors: errors.array() });
    }
    async categories(req,res){
        const page = req.params.page;
        const perPage = 4;
        const skip = (page - 1)*perPage
        try {
            const count = await Category.find({}).countDocuments();
            const response = await Category.find({}).skip(skip).limit(perPage).sort({updatedAt:-1})
            return res.status(200).json({ response,count,perPage })
        } catch (error) {
            return res.status(400).json({ errors: [{ 'msg': 'something went wrong' }] });
        }

    }
    async fetchCategory(req,res){
        const { id } = req.params;
        try {
            const category = await Category.findById({_id:id})
            return res.status(200).json({ category })
        } catch (error) {
            return res.status(400).json({ errors: [{ 'msg': 'something went wrong' }] });
        }
    }
}

module.exports = new CategoryController;