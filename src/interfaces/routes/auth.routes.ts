import {Router} from "express";
import {emailVerify, signUp} from "../controllers/auth.controller";

const router= Router();

router.post('/signup', signUp)
router.get('/email-verify', emailVerify)

export default router;