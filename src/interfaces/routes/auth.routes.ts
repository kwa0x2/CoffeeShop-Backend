import {Router} from "express";
import {emailVerify, login, signUp} from "../controllers/auth.controller";

const router= Router();

router.post('/signup', signUp)
router.get('/email-verify', emailVerify)
router.post('/login', login)

export default router;