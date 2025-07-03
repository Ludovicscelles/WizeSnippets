import { Router, RequestHandler } from "express";
import { login, register } from "../controllers/authController";
import { registerSchema } from "../service/utils/resgisterSchema";
import { validateSchema } from "../service/middlewares/validateSchema";


const router = Router();

router.post("/login", login as unknown as RequestHandler);

router.post("/register", validateSchema(registerSchema), register as unknown as RequestHandler);

export default router;
