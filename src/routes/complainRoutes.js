import express from "express";
import {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplainStatus,
    deleteComplaint

} from "../controllers/complainController.js"
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js"; // Import middleware
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Resident actions
router.post("/", protect, upload.single("image"), createComplaint);
router.get("/mycomplains", protect, getMyComplaints);  // User sees their own complaints


// Administration & Shared actions
router.get("/allcomplains", protect, authorizeAdmin, getAllComplaints);
router.post("/delete", protect, authorizeAdmin, deleteComplaint);
router.post("/status", protect, authorizeAdmin, updateComplainStatus);


export default router;
