import mongoose from "mongoose";

const latePassSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    departure_date: {
      type: String, // Storing as string for simplicity with frontend date pickers
      required: true,
    },
    departure_time: {
      type: String,
      required: true,
    },
    arrival_date: {
      type: String,
      required: true,
    },
    arrival_time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const LatePass = mongoose.model("LatePass", latePassSchema);

export default LatePass;
