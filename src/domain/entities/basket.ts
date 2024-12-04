import mongoose from "mongoose";

export interface BasketItem{
    product_id: mongoose.Types.ObjectId;
    product_title: string;
    quantity: number;
    product_price: number;
}