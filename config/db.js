const mongoose = require('mongoose');

const connect = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if (conn) {
           console.log('Database connection Successfull'); 
        } 
    } catch (error) {
        console.log(`database error ${error}`);
    }
    
}
module.exports = connect;