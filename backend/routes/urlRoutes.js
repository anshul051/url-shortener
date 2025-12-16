import express from "express";
import { createShortUrl, redirectToOriginal } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortCode", redirectToOriginal);

export default router;