
import User from "../models/model.user.js";
import cloudinary from "../lib/cloudinary.js";


export const getUserById = async(req, res, next)=>{
    const  _id  = req.params._id;
    const user = await User.findById({_id});
    if(!user) return res.status(404).json({message:"user not found"});

    res.status(200).json( {message:user} );
}

export const updateProfileImage = async(req, res, next)=>{
    const image = await cloudinary.uploader.upload(req.body.image);
    const status = await User.updateOne({_id : req.body._id}, {$set : {profilePicture : image.secure_url}});
    if(!status) return res.status(400).json({message:"couldn't update profileImage"});

    res.status(200).json({message:"profilePicture updated successfully"});
}


