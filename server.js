import express from 'express'
import morgan from 'morgan';
import connectDB from './Config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const PORT= process.env.PORT || 8080;

// connectDB();

//rest object
const app=express();

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

// app.use('/api/v1/auth',authRoutes)
// app.use('/api/v1/category',categoryRoute);
// app.use('/api/v1/product',productRoute);

app.get('/',(req,res)=>{
    res.send("<h1>Welcom to the ecommerce app</h1>")
})

app.listen(8080,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port 8080`)
})