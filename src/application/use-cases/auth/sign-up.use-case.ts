import { UserService } from "../../services/user.service";
import { CheckExistsUseCase } from "./check-exists.use-case";

export class SignUpUseCase {
    private userService: UserService;
    private checkExistsUseCase: CheckExistsUseCase;

    constructor() {
        this.userService = new UserService();
        this.checkExistsUseCase = new CheckExistsUseCase();
    }

    async execute(name: string, email: string, password: string, surname?: string) {
        await this.checkExistsUseCase.execute(email);

        const newUser = await this.userService.createUser(name, email, password, surname);
        return newUser;
    }
}
