import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose.connect(
    "mongodb+srv://tanveer:tanveer@cluster0.5ksc8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    () => {
      console.log("connect to mongoDB Database");
    }
  );
};
export default connectToDatabase;
