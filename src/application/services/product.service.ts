import {ProductRepository} from "../../infrastructure/repositories/product.repository";

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProducts() {
        return await this.productRepository.findAll()
    }
}