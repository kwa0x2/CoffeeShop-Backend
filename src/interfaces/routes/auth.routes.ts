import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";

const router= Router();
const authController = new AuthController();

router.post('/signup', authController.signUp);
router.get('/email-verify',authController.emailVerify)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

export default router;