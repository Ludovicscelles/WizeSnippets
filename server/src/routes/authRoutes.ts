import { Router } from "express";
import { login, me, register } from "../controllers/authController";
import { registerSchema } from "../service/utils/registerSchema";
import { validateSchema } from "../service/middlewares/validateSchema";
import { loginSchema } from "../service/utils/loginSchema";
import { authMiddleware } from "../service/middlewares/authMiddleware";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);

router.get("/me", authMiddleware, me);

router.post("/register", validateSchema(registerSchema), register);

export default router;
