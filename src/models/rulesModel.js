import mongoose from "mongoose";

const rulesSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Rule", rulesSchema);
