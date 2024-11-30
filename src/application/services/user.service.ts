import {UserRepository} from "../../infrastructure/repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserByName(name: string) {
        return await this.userRepository.getUserByName(name);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email);
    }

    async createUser(name: string, email: string, password: string, surname?: string) {
        return await this.userRepository.createUser(name, email, password, surname)
    }
}