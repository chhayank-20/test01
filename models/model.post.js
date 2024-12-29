import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    content: {
        type: String,
        // required: true,
    },
    image: {
        type: String, // URL of the image (if uploaded)
        default: '',
    },
    comments: [{
        content : String ,
        user :  { 
            type: mongoose.Schema.Types.ObjectId,  // .populate 
            ref: 'user' 
        },
        createdAt : {type : Date , default : Date.now }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    
} , {timestamps : true} );


const Post = mongoose.model("post" , postSchema);

export default Post ;

