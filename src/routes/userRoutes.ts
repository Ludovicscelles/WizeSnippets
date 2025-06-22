import { Router, RequestHandler } from "express";
import { getUsers, getUserById } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById as unknown as RequestHandler);

export default router;
