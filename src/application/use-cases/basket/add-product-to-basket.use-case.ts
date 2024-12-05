import {BasketService} from "../../services/basket.service";
import mongoose from "mongoose";
import {ProductService} from "../../services/product.service";
import {BasketItem} from "../../../domain/entities/basket";
import createHttpError from "http-errors";

export class AddProductToBasketUseCase {
    private basketService = new BasketService();
    private productService = new ProductService();

    constructor() {
        this.basketService = new BasketService();
        this.productService = new ProductService();
    }

    async execute(user_id: mongoose.Types.ObjectId, product_id: mongoose.Types.ObjectId) {
        const basketData = await this.basketService.getBasketByUserID(user_id)
        const productsData = await this.productService.getProductsFromCache()

        if (!basketData) {
            throw createHttpError(404, "Basket not found for the user.");
        }

        const existingItem = basketData.find(item => item.product_id === product_id);
        const selectedProduct =  productsData.find(item => item._id === product_id);

        if (!selectedProduct) {
            throw createHttpError(404, "Product not found.");
        }


        if(existingItem) {
            if (selectedProduct.stock_quantity >=existingItem.quantity + 1) {
               existingItem.quantity += 1
            }else {
                throw createHttpError(400, "Insufficient stock for the product.");
            }
        } else {
            if (selectedProduct.stock_quantity > 0) {
                const newBasketItem: BasketItem = {
                    product_id: selectedProduct._id,
                    product_title: selectedProduct.title,
                    quantity: 1,
                    product_price: selectedProduct.price,
                }
                basketData.push(newBasketItem);
            } else {
                throw createHttpError(400, "The product is out of stock.");
            }
        }

        await this.basketService.setBasketByUserID(user_id, basketData)
        return true;
    }
}