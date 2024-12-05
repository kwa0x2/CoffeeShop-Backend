import {UserService} from "../../services/user.service";

export class LoginUseCase {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async execute(email: string, password: string) {
        const user = await this.userService.login(email, password);

        return user
    }
}