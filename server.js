import express from 'express'
// import morgan from 'morgan';
// import connectDB from './Config/db.js';
// import authRoutes from './routes/authRoute.js'
// import categoryRoute from './routes/categoryRoute.js'
// import productRoute from './routes/productRoute.js'

import dotenv from 'dotenv';
dotenv.config();

// const PORT= process.env.PORT || 8080;

// connectDB();

//rest object
const app = express();

app.use(express.json());
// app.use(morgan('dev'));

// app.use('/api/v1/auth',authRoutes)
// app.use('/api/v1/category',categoryRoute);
// app.use('/api/v1/product',productRoute);

app.get('/',(req,res)=>{
    res.send("hello there")
})

app.listen(5000, ()=>{
    console.log(`Server running on port 5000`);
})