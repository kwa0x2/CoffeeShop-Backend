import {BasketService} from "../../services/basket.service";
import {ProductService} from "../../services/product.service";
import mongoose from "mongoose";
import createHttpError from "http-errors";

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

        if (!basketData) {
            throw createHttpError(404, "Basket not found for the user.");
        }

        const existingItem = basketData.find(item => item.product_id === product_id);
        const selectedProduct =  productsData.find(item => item._id === product_id);

        if (!selectedProduct) {
            throw createHttpError(404, "Product not found.");
        }

        if (existingItem && existingItem.quantity >= 2) {
            if (selectedProduct.stock_quantity >= existingItem.quantity) {
                existingItem.quantity -= 1;
            } else {
                throw createHttpError(400, "Not enough stock to reduce quantity.");
            }
        } else if (existingItem) {
            basketData = basketData.filter((item)=>item.product_id !== existingItem.product_id)
        } else {
            throw createHttpError(404, "Product is not in the basket.");
        }

        await this.basketService.setBasketByUserID(user_id, basketData)
        return true; // hersey basarili
    }
}