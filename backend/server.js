import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import path from "path";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// App config

const app = express();
const port = process.env.PORT || 5000 ;

// middleware
// whenever we get a request, express.json() will be parses and executed 
app.use(express.json());

app.use(cors())  // access backend from frontend and frontend use data from backend

// db connection
connectDB();

// api endpoints

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/food", foodRouter);   
// app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Images Upload

app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})




