import express from 'express';
import morgan from 'morgan';
import connectDB from './Config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();
const app = express();
const PORT= process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send("hello there hhe")
})

connectDB();

// rest object
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);

const handler = serverless(app);

// Export the handler function
export const apiHandler = async (req, res) => {
    return handler(req, res);
};
