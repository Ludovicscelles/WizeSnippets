import { Router, RequestHandler } from "express";
import {
  getLanguages,
  getLanguageById,
} from "../controllers/languageController";

const router = Router();

router.get("/", getLanguages);
router.get("/:id", getLanguageById as unknown as RequestHandler);

export default router;
