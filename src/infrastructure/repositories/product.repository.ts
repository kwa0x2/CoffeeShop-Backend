import {IProduct, Product} from "../../domain/models/product.model";
import {redisClient} from "../third-party/redis";

export class ProductRepository {
    async findAll() {
        return await Product.find();
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
}