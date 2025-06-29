import { Router } from "express";
import { registerUser } from "../src/controller/userController.js";

const router = Router()

router.post('/usuarios', registerUser)

export default router