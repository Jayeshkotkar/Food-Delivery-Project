import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jayeshkotkar:jayeshkotkar@cluster0.r2qfgkw.mongodb.net/food-delivery')
        .then(()=>{
            console.log("MongoDB connected");
        })
        .catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;   