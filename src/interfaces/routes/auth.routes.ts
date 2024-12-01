import {Router} from "express";
import {emailVerify, login, logout, signUp} from "../controllers/auth.controller";

const router= Router();

router.post('/signup', signUp)
router.get('/email-verify', emailVerify)
router.post('/login', login)
router.get('/logout', logout)

export default router;