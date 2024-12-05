import {IProduct, Product} from "../../domain/models/product.model";
import {redisClient} from "../third-party/redis";
import mongoose from "mongoose";

export class ProductRepository {
    async findAll() {
        return Product.find();
    }

    async getProductsFromCache(): Promise<IProduct[]> {
        const products = await redisClient.get("products")
        if (products) {
            try {
                return JSON.parse(products);
            }
            catch (error) {
                return []
            }
        }
        return []
    }

    async setProductsFromCache(products: IProduct[]) {
        await redisClient.set("products", JSON.stringify(products));
        return true
    }

    async discardProductFromDB(product_id: mongoose.Types.ObjectId, discardCount: number) {
        const result = await Product.findByIdAndUpdate(
            product_id,
            { $inc: { stock_quantity: -discardCount } },
            { new: true, runValidators: true, context: "query" }
        );

        if (!result || result.stock_quantity < 0) {
            throw new Error("Insufficient stock or product not found.");
        }

        return result;
    }



}