import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import morgan from 'morgan';

dotenv.config();

//connect to MongoDB
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

import urlRoutes from './routes/urlRoutes.js';
app.use("/", urlRoutes);

//test route
app.get('/test', (req,res) => {
    res.send('API is running...');
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on : " + PORT);
});