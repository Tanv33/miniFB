import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import connectToDatabase from "./mongoDB.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import routerForgetPassword from "./routes/forgetPassword.js";
import routerAuth from "./routes/auth.js";
import routerPostCRUD from "./routes/postCRUD.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;
const __dirname = path.resolve();

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
connectToDatabase();

app.use("/", express.static(path.join(__dirname, "/web/build")));
// app.get("/", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "./web/build/index.html"));
// });

app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/new", routerForgetPassword);

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: "*" } });
export const socketInstance = io;

app.use("/api/v1/post", routerPostCRUD);

app.use("/**", (req, res) => {
  // res.redirect("/")
  res.sendFile(path.join(__dirname, "/web/build/index.html"));
});

// app.listen(PORT, () =>
//   console.log(`Example app listening on http://localhost:${PORT}`)
// );


io.on("connection", (socket) => {
  console.log("New client connected with id: ", socket.id);

  // to emit data to a certain client
  // socket.emit("topic 1", "some data");

  // collecting connected users in a array
  // connectedUsers.push(socket)

  socket.on("disconnect", (message) => {
    console.log("Client disconnected with id: ", message);
  });
});

server.listen(PORT, function () {
  console.log(`server is running on http://localhost:${PORT}`);
});
