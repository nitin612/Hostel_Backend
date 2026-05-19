import asyncHandler from "express-async-handler";
import LatePass from "../models/latePassModel.js";

// @desc    Apply for a late pass
// @route   POST /api/late-passes
// @access  Private (Student)
const applyLatePass = asyncHandler(async (req, res) => {
  const { reason, departure_date, departure_time, arrival_date, arrival_time } = req.body;

  if (!reason || !departure_date || !departure_time || !arrival_date || !arrival_time) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const latePass = await LatePass.create({
    user: req.user.id,
    reason,
    departure_date,
    departure_time,
    arrival_date,
    arrival_time,
  });

  res.status(201).json({
    message: "Late pass application submitted!",
    latePass,
  });
});

// @desc    Get current user's late passes
// @route   GET /api/late-passes/my
// @access  Private (Student)
const getMyLatePasses = asyncHandler(async (req, res) => {
  const latePasses = await LatePass.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(latePasses);
});

// @desc    Get all late passes (Admin only)
// @route   GET /api/late-passes
// @access  Private (Admin)
const getAllLatePasses = asyncHandler(async (req, res) => {
  const latePasses = await LatePass.find({}).populate("user", "full_name email registration_no").sort("-createdAt");
  res.status(200).json(latePasses);
});

// @desc    Update late pass status (Admin only)
// @route   PATCH /api/late-passes/:id
// @access  Private (Admin)
const updateLatePassStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["approved", "rejected"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status update");
  }

  const latePass = await LatePass.findById(id);

  if (!latePass) {
    res.status(404);
    throw new Error("Late pass not found");
  }

  latePass.status = status;
  await latePass.save();

  res.status(200).json({
    message: `Late pass ${status} successfully!`,
    latePass,
  });
});

export {
  applyLatePass,
  getMyLatePasses,
  getAllLatePasses,
  updateLatePassStatus,
};
