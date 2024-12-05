import {UserService} from "../services/user.service";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import {sendToQueue} from "../../infrastructure/rabbitmq/producer";
import {GetBasketUseCase} from "./get-basket.use-case";

export class OrderBasketUseCase {
    private userService: UserService;
    private getBasketUseCase: GetBasketUseCase;

    constructor() {
        this.userService = new UserService();
        this.getBasketUseCase = new GetBasketUseCase()
    }

    async execute(user_id: mongoose.Types.ObjectId) {
        const userData = await this.userService.getUserByID(user_id);
        if (!userData) throw createHttpError(404, "User not found");

        const userBasketData = await this.getBasketUseCase.execute(user_id);
        if (!userBasketData) throw createHttpError(400, "Basket not found");

        const extendedBasket = {
            ...userBasketData,
            user_id,
            user_email: userData.email,
        };

        await sendToQueue("order", extendedBasket);
        return true;
    }
}