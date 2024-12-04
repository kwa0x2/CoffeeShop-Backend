import {ProductRepository} from "../../infrastructure/repositories/product.repository";
import {IProduct} from "../../domain/models/product.model";

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
}