import {RequestHandler} from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import {AddProductToBasketUseCase} from "../../application/use-cases/add-product-to-basket.use-case";
import {GetBasketUseCase} from "../../application/use-cases/get-basket.use-case";
import {RemoveItemFromBasketUseCase} from "../../application/use-cases/remove-item-from-basket.use-case";
import {OrderBasketUseCase} from "../../application/use-cases/order-basket.use-case";

interface ProductIDBody {
    product_id: mongoose.Types.ObjectId;
}

export class  BasketController {
    private addProductToBasketUseCase: AddProductToBasketUseCase;
    private getBasketUseCase: GetBasketUseCase;
    private removeItemFromBasketUseCase: RemoveItemFromBasketUseCase
    private orderBasketUseCase: OrderBasketUseCase;

    constructor() {
        this.addProductToBasketUseCase = new AddProductToBasketUseCase();
        this.getBasketUseCase = new GetBasketUseCase();
        this.removeItemFromBasketUseCase = new RemoveItemFromBasketUseCase();
        this.orderBasketUseCase = new OrderBasketUseCase();
    }

    getBasket: RequestHandler = async (req,res,next) => {
        try {
            const user_id = new mongoose.Types.ObjectId("675129e0bb2eaa4f71fb1632")
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

            const user_id = new mongoose.Types.ObjectId("675129e0bb2eaa4f71fb1632")
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

            const user_id = new mongoose.Types.ObjectId("675129e0bb2eaa4f71fb1632")
            await this.removeItemFromBasketUseCase.execute(user_id, product_id)

            res.sendStatus(200)
        }
        catch (error) {
            next(error);
        }
    }

    orderBasket: RequestHandler = async (req,res,next) => {
        try {
            const userId = new mongoose.Types.ObjectId("675129e0bb2eaa4f71fb1632");
            const result = await this.orderBasketUseCase.execute(userId);
            res.status(200).json({ success: result });
        } catch (error) {
            next(error);
        }
    }
}