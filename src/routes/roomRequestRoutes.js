import express from "express";
import { 
  createRoomRequest, 
  getPendingRequests, 
  updateRoomRequest, 
  getUserRequests, 
  getAcceptedRoomRequests,
  updateRoomDetails,
  getAllRequest
} from "../controllers/roomRequestControler.js";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

// Resident actions
router.post("/", protect, createRoomRequest);
router.get("/user/:userId", protect, getUserRequests);

// Administration actions
router.get("/admin", protect, authorizeAdmin, getPendingRequests);
router.put("/approval", protect, authorizeAdmin, updateRoomRequest);
router.get("/all", protect, authorizeAdmin, getAllRequest);
router.put("/update", protect, updateRoomDetails);
router.get("/accepted", protect, authorizeAdmin, getAcceptedRoomRequests);


export default router;
