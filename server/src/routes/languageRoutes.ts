import { Router } from "express";
import {
  getLanguages,
  getLanguageById,
} from "../controllers/languageController";

const router = Router();

router.get("/", getLanguages);
router.get("/:id", getLanguageById);

export default router;
