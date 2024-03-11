import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    saves: [{
        id: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        score: {
            type: String,
            required: true,
        },
        episodes: {
            type: String,
            required: true,
        },
    }]
})

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;

