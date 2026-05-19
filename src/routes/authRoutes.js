import { userRegister, userLogin, changePassword, updateProfile } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import express from "express";

const authRouter = express.Router();

authRouter.route("/register").post(userRegister);
authRouter.route("/login").post(userLogin);
authRouter.route("/change-password").post(protect, changePassword);
authRouter.route("/update-profile").put(protect, upload.single("profilePic"), updateProfile);

export { authRouter };
