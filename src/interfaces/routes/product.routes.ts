import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { productsCacheMiddleware } from "../middlewares/cache.middleware";

const router = Router();
const productController = new ProductController();

router.get("/all", productsCacheMiddleware, productController.getAll);

export default router;
