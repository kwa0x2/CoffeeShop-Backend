import {ProductService} from "../services/product.service";

export class GetAllProductsUseCase {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async execute() {
        return this.productService.getProducts()
    }
}