import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({

    userID: {
        type: Number,
        unique: true
    },
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
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

userSchema.plugin(AutoIncrement,{
    inc_field: 'userID',
    start_seq: 0
});

const User = mongoose.model('User', userSchema);

export default User;