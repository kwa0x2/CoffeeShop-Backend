import {UserModel} from "../../domain/models/user.model";
import mongoose from "mongoose";

export class UserRepository {
    async getUserByID(user_id: mongoose.Types.ObjectId) {
        return UserModel.findById(user_id);
    }

    async getUserByName(name: string) {
        return  UserModel.findOne({ name })
    }

    async getUserByEmail(email: string) {
        return UserModel.findOne({ email })
    }

    async createUser(name: string, email: string, password: string, surname?: string) {
        const newUser = new UserModel({name, email, password, surname})
        return await newUser.save()
    }
}