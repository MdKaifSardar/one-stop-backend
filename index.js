import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
const app = express();
const PORT= process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send("hello there hhe")
})

// rest object
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('The db is Connected!');
    app.listen(PORT, () => {
        console.log(`listeinng to ${PORT}`);
    })
})
.catch(() => {
    console.log("The db is not connected");
})
