import mongoose from "mongoose";

export const otpUser = mongoose.model("Otps", {
  email: String,
  otp: String,
  used: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});
