import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/model.user.js";

export const authenticate = async(req, res, next)=>{
    try {
        
        const token = req.cookies["LinkedIn-token"];
        if(!token) return res.status(400).json({message : "Unautherized , token not found."});

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded) return res.status(400).json({message : "Unautherized , wrong token."});
        
        const user = await User.findOne({email : decoded.email}).select("-password");
        if(!user) return res.status(400).json({message : "Unautherized , wrong token."});
        
        req.user=user;
        console.log("authentication complted.");
        
        next();
    } catch (error) {
        console.log(error, "error in athenticate .");
        res.status(500).json({error : "autherntication server error"});
    }
}





