import Cloudinary from "../lib/cloudinary.js";
import Post from "../models/model.post.js";
import { getUserById } from "./controller.user.js";

export const getFeed = async (req, res, next)=>{
    try {
        let posts = await Post.find()
        .populate("user", "name username profilePicture headline")
        .populate("comments.user" , "name profilePicture");
        res.status(200).json({message : posts});
    } catch (error) {
        console.log(error);
        
    }
}

export const addPost = async(req, res, next)=>{
    try {
        try {
            if(req.body.image){
                let image = await Cloudinary.uploader.upload(req.body.image);
                req.body.image = image.secure_url;
            }
        } catch (error) {
            console.log("cannot delete image from cloudinary.");
        }
        await Post.create(req.body);
        res.status(200).json({message : "added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "bad reqest"});
    }
}

export const deletePost = async(req, res, next)=>{
    try {
        const {userId , postId} = req.query;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
		}
		// check if the current user is the author of the post
		if (post.user.toString() !== userId.toString()) {
            console.log(post.user.toString());
            console.log(userId.toString());
			return res.status(403).json({ message: "You are not authorized to delete this post" });
		}
		// delete the image from cloudinary as well!
        try {
            if (post.image) {
                await Cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0]);
            }
        } catch (error) {
            console.log("cannot delete image from cloudinary.");
        }
        await Post.findByIdAndDelete(postId);
        res.status(200).json({message : "deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "bad reqest"});
    }
}


export const getPostById = async(req, res, next)=>{
    try {
        let {id} = req.query;
        // check wether user is owner of post or not 
        // delete its image from cloudinary - use "updloder.destroy(URL)"
        let post = await Post.findById(id);
        res.status(200).json({message : post});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "bad reqest"});
    }
}


//  look it damm
export const likePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const post = await Post.findById(postId);
		const userId = req.user._id;
		if (post.likes.includes(userId)) {
			// unlike the post
			post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
		} else {
			// like the post
			post.likes.push(userId);
			// create a notification if the post owner is not the user who liked
			if (post.author.toString() !== userId.toString()) {
				const newNotification = new Notification({
					recipient: post.author,
					type: "like",
					relatedUser: userId,
					relatedPost: postId,
				});

				await newNotification.save();
			}
		}

		await post.save();

		res.status(200).json(post);
	} catch (error) {
		console.error("Error in likePost controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
