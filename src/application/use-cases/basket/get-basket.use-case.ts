import {BasketService} from "../../services/basket.service";
import mongoose from "mongoose";

export class GetBasketUseCase {
    private basketService: BasketService;

    constructor() {
        this.basketService = new BasketService();
    }

    async execute(user_id: mongoose.Types.ObjectId,) {
        const basketData =  await this.basketService.getBasketByUserID(user_id)
        if (!basketData) return null

        const subTotal = parseFloat(basketData.reduce((sum, item) => sum + item.product_price * item.quantity, 0).toFixed(2))
        let total = subTotal
        let gift = false

        const shippingCost = subTotal > 500 ? 0 : 54.99;

        if (subTotal > 1000 && subTotal < 1500) {
            total = subTotal - subTotal * 0.1;
            gift = false;
        } else if (subTotal > 1500 && subTotal < 2000) {
            gift = false;
            total = subTotal - subTotal * 0.15;
        } else if (subTotal > 2000 && subTotal < 3000) {
            gift = false;
            total = subTotal - subTotal * 0.2;
        } else if (subTotal > 3000) {
            total = subTotal - subTotal * 0.25;
            gift = true;
        }

        total = parseFloat(total.toFixed(2))
        return {basketData, total, subTotal, gift, shippingCost}
    }
}