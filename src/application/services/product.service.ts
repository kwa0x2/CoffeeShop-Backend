import {ProductRepository} from "../../infrastructure/repositories/product.repository";
import {IProduct} from "../../domain/models/product.model";
import mongoose from "mongoose";

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProducts() {
        return this.productRepository.findAll()
    }

    async getProductsFromCache(): Promise<IProduct[]> {
        return  this.productRepository.getProductsFromCache()
    }

    async setProductsFromCache(products: IProduct[]) {
        return this.productRepository.setProductsFromCache(products)
    }

    async discardProductFromDB(product_id: mongoose.Types.ObjectId, discardCount: number)  {
        return  this.productRepository.discardProductFromDB(product_id, discardCount)
    }

    async discardProductInCacheAndDB(product_id: mongoose.Types.ObjectId, discardCount: number) {
        let productsFromCache= await this.getProductsFromCache()

        await this.discardProductFromDB(product_id, discardCount)

        const selectedProductFromCache  = productsFromCache.find((i)=>i._id === product_id);
        if (!selectedProductFromCache) return null;

        selectedProductFromCache.stock_quantity -= discardCount;


        await this.setProductsFromCache(productsFromCache);
        return true
    }
}