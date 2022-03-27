const express = require('express');
require('dotenv').config();
const connect = require('./config/db');
const authRoute = require('./routers/authRoute');
const cors = require('cors');
const categoryRoute = require('./routers/categoryRoute');

const app = express();
//cors enabling
app.use(cors())

//accessing port
const PORT = process.env.PORT || 5000
//config json body middleware 
app.use(express.json())

//connect database
connect();
//config routes
app.use('/auth',authRoute);
app.use('/category',categoryRoute);
    
//app running
app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})