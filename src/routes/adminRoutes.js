import express from "express";
import { getStats } from "../controllers/adminController.js";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/stats").get(protect, authorizeAdmin, getStats);

export default router;
