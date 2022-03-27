const { validationResult } = require('express-validator');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = async (payload) =>{
    try {
        return jwt.sign({ payload },process.env.SECRET_KEY,{expiresIn:'1h'})
    } catch (error) {
        console.log(error);
    }
}

module.exports.register = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name,email,password } = req.body;
    try {
        const userExist = await User.findOne({ email })
        if (!userExist) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            const user = await User.create({
                name,
                email,
                password:hashPassword,
            })
            if (user) {
                return res.status(201).json({ success: [{'msg':`user created successfully`}] });
            }
            else{
                return res.status(400).json({ errors: [{'msg':`user can't be created`}] });
            }
        }
        else{
            return res.status(400).json({ errors: [{'msg':`${email} is already taken`}] });
        }
    } catch (error) {
        return res.status(500).json({ errors: [{'error':'something went wrong'}] });
    }
}

module.exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email,password } = req.body;
    try {
       const user = await User.findOne({ email }) 
       if (user) {
           const matched = await bcrypt.compare(password,user.password)
           if (matched) {
               const token = await createToken({ id:user._id,name:user.name })
               if (user.admin) {
                   return res.status(200).json({token,admin:true})    
               }
               else{
                   return res.status(200).json({token,admin:false})
               }
           }
           else{
            return res.status(400).json({ errors:[{'msg':'Password not matched' }] }); 
           }
       }
       else{
        return res.status(400).json({ errors:[{'msg':`${email} is not found`}] }); 
       }

    } catch (error) {
        return res.status(400).json({ errors:[{'msg':'something went wrong'}] });
    }
}