import { RequestHandler } from "express";
import {redisClient} from "../../infrastructure/redis/client";

export const productsCacheMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const productsFromCache = await redisClient.get("products");

        if (productsFromCache) {
            const parsedProducts = JSON.parse(productsFromCache);
            res.status(200).json(parsedProducts);
            return
        }

        next();
    } catch (error) {
        console.error("ERROR checking cache:", error);
        next(error);
    }
};
