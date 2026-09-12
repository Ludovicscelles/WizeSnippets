import { Router } from "express";
import { login, register } from "../controllers/authController";
import { registerSchema } from "../service/utils/registerSchema";
import { validateSchema } from "../service/middlewares/validateSchema";
import { loginSchema } from "../service/utils/loginSchema";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);

router.post("/register", validateSchema(registerSchema), register);

export default router;
