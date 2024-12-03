import {UserModel} from "../../domain/models/user.model";

export class UserRepository {
    async getUserByName(name: string) {
        return await UserModel.findOne({ name })
    }

    async getUserByEmail(email: string) {
        return await UserModel.findOne({ email })
    }

    async createUser(name: string, email: string, password: string, surname?: string) {
        const newUser = new UserModel({name, email, password, surname})
        return await newUser.save()
    }
}