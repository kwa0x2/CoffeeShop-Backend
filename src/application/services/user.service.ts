import {UserRepository} from "../../infrastructure/repositories/user.repository";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserByID(user_id:mongoose.Types.ObjectId) {
        return this.userRepository.getUserByID(user_id)
    }


    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    async createUser(name: string, email: string, password: string, surname?: string) {
        return this.userRepository.createUser(name, email, password, surname)
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw createHttpError(401, 'Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw createHttpError(401, "Invalid email or password");
        }

        return user
    }
}