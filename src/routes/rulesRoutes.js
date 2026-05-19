import express from "express";
import { getHostelRules, updateHostelRules } from "../controllers/rulesController.js";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get rules (public for residents and admins)
router.get("/", protect, getHostelRules);

// Update rules (restricted to Admin)
router.post("/", protect, authorizeAdmin, updateHostelRules);

export default router;
