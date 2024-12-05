import {UserService} from "../../services/user.service";
import createHttpError from 'http-errors';

export class CheckExistsUseCase{
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    async execute(email:string){
        const existingUserEmail = await this.userService.getUserByEmail(email);
        if (existingUserEmail){
            throw createHttpError(409, 'A user with this email address already exists.');
        }
    }
}