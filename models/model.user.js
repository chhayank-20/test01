import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: [".@", "please give a valid emial"],
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",   // cloudnary
    },
    bannerImg: {
        type: String,
        default: "",
    },
    headline: { 
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    skills: [String],
    experience: [
        {
        title: String, 
        company: String,
        startDate: Date,
        endDate: { type: Date, default: null },
        description: String,
        isCurrentJob: { type: Boolean, default: false },
        },
    ],
    followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    connections: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
},

{timestamps : true}

);

const User = mongoose.model('user',userSchema);

export default User;






// Pre-save hook to hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();  // If the password is not modified, skip hashing
//     this.password = await bcrypt.hash(this.password, 10);  // Hash the password with bcrypt
//     next();
//   });