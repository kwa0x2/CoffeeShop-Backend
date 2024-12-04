import {BasketItem} from "../../domain/entities/basket";
import mongoose from "mongoose";
import {redisClient} from "../third-party/redis";

export class BasketRepository {

    async getBasketByUserID(user_id: mongoose.Types.ObjectId): Promise<BasketItem[]> {
        const basketKey = `basket:${user_id}`;

        const basket = await redisClient.get(basketKey);

        if(basket) {
            try {
                return JSON.parse(basket)
            }
            catch(error) {
                // remember: sentry handle here
                return []
            }
        }
        return []
    }

    async setBasketByUserID(user_id: mongoose.Types.ObjectId, data: BasketItem[]) {
        await redisClient.set(`basket:${user_id}`, JSON.stringify(data));
        return true
    }
}