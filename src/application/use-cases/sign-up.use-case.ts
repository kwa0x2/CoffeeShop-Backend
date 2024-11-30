import {UserService} from "../services/user.service";
import createHttpError from 'http-errors';

export class SignUpUseCase{
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    async execute(name:string, email:string){
        const existingUserName = await this.userService.getUserByName(name);
        if (existingUserName){
            throw createHttpError(409, 'Username already taken. Please choose a different one.')
        }

        const existingUserEmail = await this.userService.getUserByEmail(email);
        if (existingUserEmail){
            throw createHttpError(409, 'A user with this email address already exists.');
        }

        // const newUser = await this.userService.createUser(name, email, password, surname)
    }
}