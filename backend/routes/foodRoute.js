import express from "express";
import { addFood, getAllFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";  // for image upload or storage system
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const foodRouter = express.Router();

// Image Storage System
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// })


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'Airbnb_Project',
//       allowed_formats: ["png","jpg","jpeg"],
//     },
//   });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// multer middleware
const upload = multer({ storage: storage });
        
// add food item
foodRouter.post("/add", upload.single("image"), addFood); 

// get all food items
foodRouter.get("/list", getAllFood);

// remove food item
foodRouter.post("/remove", removeFood);

export default foodRouter;
