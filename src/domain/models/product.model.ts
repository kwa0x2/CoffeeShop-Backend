import mongoose = require('mongoose');

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    category_title:string
    description: string;
    price: number;
    stock_quantity: number;
    origin: string;
    roast_level: string;
    flavor_notes: string[];
}

const ProductSchema: mongoose.Schema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto:true},
    title: {type: String, required: true},
    category_title: {type: Number, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock_quantity: {type: Number, required: true},
    origin: {type: String, required: true},
    roast_level: {type: String, required: true},
    flavor_notes: {type: [String], required: true},
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
