import {GetAllProductsUseCase} from "../../application/use-cases/product/get-all-products.use-case";
import {RequestHandler} from "express";
import {redisClient} from "../../infrastructure/redis/client";

export class ProductController {
    private getAllProductsUseCase: GetAllProductsUseCase

    constructor() {
        this.getAllProductsUseCase = new GetAllProductsUseCase();
    }

    getAll: RequestHandler = async (req, res, next) => {
        try {
            const products = await this.getAllProductsUseCase.execute()

            // 1 day exp
            redisClient.set("products", JSON.stringify(products), "EX", 86400);

            res.status(200).json(products)
        }
        catch (error) {
            next(error)
        }
    }
}