import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/dbConfig.js";
import { authRouter as authRoutes } from "./routes/authRoutes.js";
import roomRequestRoutes from "./routes/roomRequestRoutes.js";
import announcementRoute from "./routes/announcementRoutes.js";
import complaintRoute from "./routes/complainRoutes.js";
import paymentReceiptRoutes from "./routes/paymentReceiptRoutes.js"
import latePassRoutes from "./routes/latePassRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import rulesRoutes from "./routes/rulesRoutes.js";


dotenv.config();

// Validate Environment Variables
if (!process.env.PORT) {
    console.warn("⚠️ Warning: PORT is not defined in .env file!");
}
if (!process.env.CONNECTION_STRING) {
    console.warn("⚠️ Warning: CONNECTION_STRING is not defined in .env file!");
}
if (!process.env.JWT_SECRET) {
    console.warn("⚠️ Warning: JWT_SECRET is not defined in .env file!");
}

const app = express();
app.use(express.json()); // Parse JSON data

// Connect to Database
connectDb().catch((err) => {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1); // Exit on DB connection failure
});

// Test Route
app.get("/", (req, res) => {
    console.log("✅ Root endpoint hit");
    res.status(200).json({ message: "You will be successful!" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/room-requests", roomRequestRoutes);
app.use("/api/announcement", announcementRoute);
app.use("/api/complains",complaintRoute);
app.use("/api/receipts",paymentReceiptRoutes);
app.use("/api/late-passes", latePassRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rules", rulesRoutes);



// Global Error Handling
app.use((err, req, res, next) => {
    console.error("❌ Global Error Handler:", err.message);
    console.error(err.stack); // Log stack trace for backend debugging
    res.status(500).json({ 
        message: "Internal Server Error", 
        error: err.message, // Return specific error message
    });
});


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;

