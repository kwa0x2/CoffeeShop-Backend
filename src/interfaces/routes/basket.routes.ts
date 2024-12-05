import {Router} from "express";
import {BasketController} from "../controllers/basket.controller";

const router = Router();
const basketController = new BasketController();

router.post("", basketController.addProductToBasket)
router.get("", basketController.getBasket)
router.delete("", basketController.removeProductFromBasket)
router.post("/order", basketController.orderBasket)

export default router;