import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGODBURL, () => {
    console.log("connect to mongoDB Database");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
export default connectToDatabase;
