import express from "express";
import {
    createPaymentReceipt,
    getMyReceipts,
    getAllReceipts,
    updaterReceiptStatus,
    deleteReceipt

} from "../controllers/paymentReceiptsController.js"
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js"; // Import middleware
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Resident actions
router.post("/", protect, upload.single("receiptImage"), createPaymentReceipt);
router.get("/user", protect, getMyReceipts);

// Administration actions
router.get("/allreceipts", protect, authorizeAdmin, getAllReceipts);
router.post("/delete", protect, authorizeAdmin, deleteReceipt);
router.post("/status", protect, authorizeAdmin, updaterReceiptStatus);



export default router;
