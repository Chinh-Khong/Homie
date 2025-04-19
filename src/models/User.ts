import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  verificationCode: { type: String },
  resetToken: { type: String },
  codeExpiry: { type: Date },
  resetTokenExpiry: { type: Date },
  otp: { type: String, required: false },
  otpExpiresAt: { type: Date, required: false },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
