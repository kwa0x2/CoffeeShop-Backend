import {Product} from "../../domain/models/product.model";

export class ProductRepository {
    async findAll() {
        return await Product.find();
    }
}