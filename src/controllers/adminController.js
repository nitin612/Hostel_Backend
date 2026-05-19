import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import Complain from "../models/ComplainModal.js";
import RoomRequest from "../models/roomRequestModel.js";
import LatePass from "../models/latePassModel.js";

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = asyncHandler(async (req, res) => {
  const totalStudents = await User.countDocuments({ member_type: "student" });
  const pendingComplaints = await Complain.countDocuments({ status: "pending" });
  const pendingRoomRequests = await RoomRequest.countDocuments({ status: "pending" });
  const pendingLatePasses = await LatePass.countDocuments({ status: "pending" });

  res.status(200).json({
    totalStudents,
    pendingComplaints,
    pendingRoomRequests,
    pendingLatePasses,
    occupancyRate: "85%", // Static for now or calculated if Rooms model existed
  });
});

export { getStats };
