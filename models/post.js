import mongoose from "mongoose";

export const post = mongoose.model("Users Post", {
  text: String,
  postUrl: String,
  imgStrPath: String,

  created: { type: Date, default: Date.now },

  author: String,
  authorId: String,
});
