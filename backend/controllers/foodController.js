import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
    try {               
        // extract file name from middleware req 
        let image_fileName = `${req.file.filename}`;  

        const { name, description, price, category } = req.body;
        const food = new foodModel({ name, description, price, image: image_fileName, category });
        await food.save();
        res.status(201).json({ success: true, message: "Food Added", food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// get all food items

const getAllFood = async (req, res) => {   
    try {
        const food = await foodModel.find({});
        console.log(food);
        res.status(200).json({ success: true, data: food });
    } catch (error) { 
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// remove food item

const removeFood = async (req, res) => {
    try {
        // const id = req.body.id;
        const food = await foodModel.findById(req.body.id);
        // const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        fs.unlink(`uploads/${food.image}`, ()=>{});
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food Remove successfully", food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



export { addFood, getAllFood, removeFood };