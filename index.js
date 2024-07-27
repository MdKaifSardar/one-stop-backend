const express = require('express')
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello there hhe")
})

app.listen(5000, ()=>{
    console.log(`Server hehe running on port 5000`);
})

// import morgan from 'morgan';
// import connectDB from './Config/db.js';
// import authRoutes from './routes/authRoute.js'
// import categoryRoute from './routes/categoryRoute.js'
// import productRoute from './routes/productRoute.js'

// require('dotenv').config();
// dotenv.config();

// const PORT= process.env.PORT || 8080;

// connectDB();

//rest object
// app.use(express.json());
// app.use(morgan('dev'));

// app.use('/api/v1/auth',authRoutes)
// app.use('/api/v1/category',categoryRoute);
// app.use('/api/v1/product',productRoute);