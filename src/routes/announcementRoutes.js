import express from "express";
import {
  createAnnouncement,
  deleteAnnouncements,
  getAllAnnouncements,
} from "../controllers/announcementController.js";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js"; // Import middleware

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Administration actions
router.post("/", protect, authorizeAdmin, upload.single("image"), createAnnouncement);

router.post("/delete", protect, authorizeAdmin, deleteAnnouncements);

// Accessible by all authenticated users
router.get("/allannouncements", protect, getAllAnnouncements);


export default router;
