import express from "express";
import { addFood, getAllFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";  // for image upload or storage system
import auth from "../middleware/auth.js";
const foodRouter = express.Router();


// Image Storage System
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage });


        
// add food item
foodRouter.post("/add", auth, upload.single("image"), addFood); 

// get all food items
foodRouter.get("/list", getAllFood);

// remove food item
foodRouter.post("/remove", removeFood);

export default foodRouter;
