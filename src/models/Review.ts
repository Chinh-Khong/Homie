import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    room_id: { type: Number, required: true },
    user_email: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);