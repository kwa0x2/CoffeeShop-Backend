import mongoose = require('mongoose');

const ProductSchema: mongoose.Schema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    title: {type: String, required: true},
    category_title: {type: Number, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    stock_quantity: {type: Number, required: true},
    origin: {type: String, required: true},
    roast_level: {type: String, required: true},
    flavor_notes: {type: [String], required: true},
})

export const Product = mongoose.model('Product', ProductSchema);
