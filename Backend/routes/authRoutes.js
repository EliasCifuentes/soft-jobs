import { Router } from "express";
import { getUsuario, loginUser } from "../src/controller/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router()

router.post('/login', loginUser)
router.get('/usuarios', verifyToken, getUsuario)

export default router