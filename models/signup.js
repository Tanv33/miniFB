import mongoose from "mongoose";

export const signup = mongoose.model("signup User", {
  fullName: String,
  email: String,
  gender: String,
  phoneNumber: Number,
  password: String,
  address: String,
});
