import {GetAllProductsUseCase} from "../../application/use-cases/get-all-products.use-case";
import {RequestHandler} from "express";

export class ProductController {
    private getAllProductsUseCase: GetAllProductsUseCase

    constructor() {
        this.getAllProductsUseCase = new GetAllProductsUseCase();
    }

    getAll: RequestHandler = async (req, res, next) => {
        try {
            const products = await this.getAllProductsUseCase.execute()
            res.status(200).json(products)
        }
        catch (error) {
            next(error)
        }
    }
}