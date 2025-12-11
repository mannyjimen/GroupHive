import mongoose from "mongoose";

const profileSchema = new mongoose.Schema ({

    email: {
        type: String,
        required: true,
        unique: true,
    },    
    username: {
        type: String,
        required: true,
        unique: true,
    },
    realName: {
        type: String
    },
    savedEvents: [{
        eventName: String
    }],
    postedEvents: [{
        eventName: String
    }],
    bio: {
        type: String
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    age: {
        type: Number
    }
}, {
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;