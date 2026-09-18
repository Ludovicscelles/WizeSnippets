import { Router } from "express";
import { getComments, getCommentById } from "../controllers/commentController";

const router = Router();

router.get("/", getComments);

router.get("/:id", getCommentById);

export default router;
