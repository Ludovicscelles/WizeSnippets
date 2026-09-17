import { Router, RequestHandler } from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
} from "../controllers/snippetController";
import { createComment } from "../controllers/commentController";
import { authMiddleware } from "../service/middlewares/authMiddleware";
import { createSnippetSchema } from "../service/utils/createSnippetSchema";
import { validateSchema } from "../service/middlewares/validateSchema";

const router = Router();

router.get("/", getSnippets);

router.get("/:id", getSnippetById as unknown as RequestHandler);

router.post(
  "/",
  authMiddleware,
  validateSchema(createSnippetSchema),
  createSnippet,
);

router.post(
  "/:id/comment",
  authMiddleware,
  createComment as unknown as RequestHandler,
);

export default router;
