import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from 'dotenv';
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const port = process.env.PORT||5005

//middleware for extract data from body
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes)

app.listen(port,()=>{
    console.log(`server Running on ${port}`)
    connectDB()
})