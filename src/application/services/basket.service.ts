import mongoose from "mongoose";
import {BasketItem} from "../../domain/entities/basket";
import {BasketRepository} from "../../infrastructure/repositories/basket.repository";

export class BasketService {
    private basketRepository: BasketRepository;

    constructor() {
        this.basketRepository = new BasketRepository();
    }

    async getBasketByUserID(user_id: mongoose.Types.ObjectId): Promise<BasketItem[]> {
       return this.basketRepository.getBasketByUserID(user_id);
    }

    async setBasketByUserID(user_id: mongoose.Types.ObjectId, data: BasketItem[]) {
        return this.basketRepository.setBasketByUserID(user_id, data);
    }
}