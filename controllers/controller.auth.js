
import User from "../models/model.user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendMail} from "../lib/email.js";
import dotenv from "dotenv";
dotenv.config();

export const signInAction = async(req , res, next)=>{
    console.log(req.body);
    try {    
        let {email , username ,password , name } = req.body;
        if( await User.findOne({email}) )
            return res.status(400).json({message : "Email already registerd."});
        
        if( await User.findOne({username}) )
            return res.status(400).json({message : "username already registerd.\nchange username"});
        
        if( password.length < 6 )
            return res.status(400).json({message : "password length must be atleast 6 chracters"});
        
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
        console.log(req.password);
        
        let user = await User.create(req.body);

        let token = jwt.sign( {email : req.body.email} , process.env.JWT_SECRET_KEY , { expiresIn : "3d" } );
        res.cookie("LinkedIn-token",token,{
            httpOnly : true, // prevents XSS attack
            sameSite : "strict" ,  // prevents CSRF attack
            secure : process.env.STATUS === "production" , // prevents man in the middle attack
        });

        user ? res.status(200).send({message : user}) : res.status(500).send({error : "not inserted"});

        //  signup - mail 
        // sendMail([{email}]);
        
    } catch (error) {
        res.status(400).json({message : "internal server error in sign-in."});
    }
}

export const logInAction = async(req , res, next)=>{
    let {email , password} = req.body;
    try {
        let user = await User.findOne({email});
        if(! user )   
            return res.status(400).json({message : "email not exists."})

        let status = await bcrypt.compare(  password , user.password );        
        if(! status)
            return res.status(400).json({message : "password mismatch."});

        let token = jwt.sign({email : req.body.email} , process.env.JWT_SECRET_KEY , {expiresIn : "2d"} );
        res.cookie( "LinkedIn-token" , token , {
            httpOnly : true ,
            sameSite : "strict" ,
            secure : process.env.STATUS==="production",
        });
        res.status(200).json({message : user });    
    
    } catch (error) {
        res.status(400).json({message : "internal server error in sign-in."});
    }
}

export const logOutAction = (req , res, next)=>{
    res.clearCookie("LinkedIn-token");
    res.json({message : "logout successful."});
}






