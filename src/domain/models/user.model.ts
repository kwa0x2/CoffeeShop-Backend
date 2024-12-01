import mongoose = require('mongoose');

interface IUser extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    surname: string;
    password: string;
    email: string;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    surname: { type: String, required: false },
    password: { type: String, required: true },
    email: { type: String, required: true },
}, {timestamps: true});

export const UserModel = mongoose.model<IUser>('User', UserSchema);