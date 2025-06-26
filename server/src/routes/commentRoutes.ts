import { Router, RequestHandler } from "express";
import { getComments, getCommentById } from "../controllers/commentController";

const router = Router();

router.get("/", getComments);

router.get("/:id", getCommentById as unknown as RequestHandler);

export default router;
