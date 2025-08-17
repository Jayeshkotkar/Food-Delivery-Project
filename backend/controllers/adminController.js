import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email}, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, message: "Admin Login Successful", token });
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};  

