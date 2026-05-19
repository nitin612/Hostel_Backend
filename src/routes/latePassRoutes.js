import express from "express";
import {
  applyLatePass,
  getMyLatePasses,
  getAllLatePasses,
  updateLatePassStatus,
} from "../controllers/latePassController.js";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, applyLatePass)
  .get(protect, authorizeAdmin, getAllLatePasses);

router.route("/my").get(protect, getMyLatePasses);

router.route("/:id").patch(protect, authorizeAdmin, updateLatePassStatus);

export default router;
