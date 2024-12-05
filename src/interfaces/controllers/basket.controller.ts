import {RequestHandler} from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import {AddProductToBasketUseCase} from "../../application/use-cases/basket/add-product-to-basket.use-case";
import {GetBasketUseCase} from "../../application/use-cases/basket/get-basket.use-case";
import {RemoveItemFromBasketUseCase} from "../../application/use-cases/basket/remove-item-from-basket.use-case";
import {OrderBasketUseCase} from "../../application/use-cases/basket/order-basket.use-case";

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
            if (!req.session.user_id) {
                throw createHttpError(400, "User ID is missing from the session.");
            }

            const basket = await this.getBasketUseCase.execute(req.session.user_id)
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
            if (!req.session.user_id) {
                throw createHttpError(400, "User ID is missing from the session.");
            }

            await this.addProductToBasketUseCase.execute(req.session.user_id, product_id)

            res.status(200).json({message: "Product successfully added to basket"})
        }
        catch (error) {
            next(error);
        }
    }

    removeProductFromBasket: RequestHandler<unknown, unknown, ProductIDBody, unknown> = async (req,res,next) => {
        const product_id = req.body.product_id;

        try{
            if (!product_id) {
                throw createHttpError(400, "Missing parameters");
            }
            if (!req.session.user_id) {
                throw createHttpError(400, "User ID is missing from the session.");
            }

            await this.removeItemFromBasketUseCase.execute(req.session.user_id, product_id)

            res.status(200).json({message: "Product successfully removed from basket"})
        }
        catch (error) {
            next(error);
        }
    }

    orderBasket: RequestHandler = async (req,res,next) => {
        try {
            if (!req.session.user_id) {
                throw createHttpError(400, "User ID is missing from the session.");
            }

            await this.orderBasketUseCase.execute(req.session.user_id);
            res.status(200).json({ message: "Failed to order basket" });
        } catch (error) {
            next(error);
        }
    }
}