import {BasketService} from "../services/basket.service";
import {ProductService} from "../services/product.service";
import mongoose from "mongoose";

export class RemoveItemFromBasketUseCase {
    private basketService: BasketService;
    private productService: ProductService;

    constructor() {
        this.basketService = new BasketService();
        this.productService =new ProductService();
    }

    async execute(user_id: mongoose.Types.ObjectId,product_id:mongoose.Types.ObjectId) {
        let basketData = await this.basketService.getBasketByUserID(user_id)
        const productsData = await this.productService.getProductsFromCache()

        const existingItem = basketData.find(item => item.product_id === product_id);
        const selectedProduct =  productsData.find(item => item._id === product_id);

        if (!selectedProduct) return null

        if (existingItem && existingItem.quantity >= 2) {
            console.warn(selectedProduct.stock_quantity)
            console.warn(existingItem.quantity)
            if (selectedProduct.stock_quantity >= existingItem.quantity) {
                existingItem.quantity -= 1
            } else {
                return null
            }
        } else if (existingItem) {
            basketData = basketData.filter((item)=>item.product_id !== existingItem.product_id)
        }

        await this.basketService.setBasketByUserID(user_id, basketData)
        return true; // hersey basarili
    }
}