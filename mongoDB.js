import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGODBURL, () => {
    console.log("connect to mongoDB Database");
  });
};
export default connectToDatabase;
