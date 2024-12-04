import {RequestHandler} from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import {AddProductToBasketUseCase} from "../../application/use-cases/add-product-to-basket.use-case";
import {GetBasketUseCase} from "../../application/use-cases/get-basket.use-case";
import {RemoveItemFromBasketUseCase} from "../../application/use-cases/remove-item-from-basket.use-case";

interface ProductIDBody {
    product_id: mongoose.Types.ObjectId;
}

export class  BasketController {
    private addProductToBasketUseCase: AddProductToBasketUseCase;
    private getBasketUseCase: GetBasketUseCase;
    private removeItemFromBasketUseCase: RemoveItemFromBasketUseCase

    constructor() {
        this.addProductToBasketUseCase = new AddProductToBasketUseCase();
        this.getBasketUseCase = new GetBasketUseCase();
        this.removeItemFromBasketUseCase = new RemoveItemFromBasketUseCase();
    }

    getBasket: RequestHandler = async (req,res,next) => {
        try {
            const user_id = new mongoose.Types.ObjectId("674fec170a21be140bfe6911")
            const basket = await this.getBasketUseCase.execute(user_id)
            res.status(200).json(basket)
        }
        catch (error) {
            next(error);
        }
    }

    addProductToBasket: RequestHandler<unknown, unknown, ProductIDBody, unknown> = async (req, res,next) => {
        const product_id = req.body.product_id;

        try {
            if (!product_id) {
                throw createHttpError(400, "Missing parameters");
            }

            const user_id = new mongoose.Types.ObjectId("674fec170a21be140bfe6911")
            await this.addProductToBasketUseCase.execute(user_id, product_id)

            res.sendStatus(200)
        }
        catch (error) {
            next(error);
        }
    }

    removeItemFromBasket: RequestHandler<unknown, unknown, ProductIDBody, unknown> = async (req,res,next) => {
        const product_id = req.body.product_id;

        try{
            if (!product_id) {
                throw createHttpError(400, "Missing parameters");
            }

            const user_id = new mongoose.Types.ObjectId("674fec170a21be140bfe6911")
            await this.removeItemFromBasketUseCase.execute(user_id, product_id)

            res.sendStatus(200)
        }
        catch (error) {
            next(error);
        }
    }
}