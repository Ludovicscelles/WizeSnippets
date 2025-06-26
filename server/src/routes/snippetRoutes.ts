import { Router, RequestHandler } from "express";
import { getSnippets, getSnippetById } from "../controllers/snippetController";

const router = Router();

router.get("/", getSnippets);

router.get("/:id", getSnippetById as unknown as RequestHandler);

export default router;