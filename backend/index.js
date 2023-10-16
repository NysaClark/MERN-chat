const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();


const app = express();
const PORT = 4000;

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")

// import init socket
// const socketIO = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

const corsOptions = {
  //connect to frontend
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
//users

// let users = [];

// // Join user to chat
// const newUser = (id, username) => {
//   const user = { id, username };

//   users.push(user);

//   return user;
// }

// // Get current user
// const getActiveUser = (id) => {
//   return users.find((user) => user.id === id);
// }

// // User leaves chat
// const exitRoom = (id) => {
//   const index = users.findIndex((user) => user.id === id);

//   if (index !== -1) {
//     return users.splice(index, 1)[0];
//   }
// }

// // Get room users
// const getRoomUsers = () => {
//   return users;
// }

// // Listen for incoming connections from clients
// socketIO.on("connection", (socket) => {
//   socket.on("joinRoom", ({ username }) => {
//     const user = newUser(socket.id, username);

//     socket.join("Room 1");

//     // General welcome
//     socket.emit("message", {
//       username: "Chat",
//       text: "Messages are limited to this room!",
//     });

//     // Broadcast everytime users connects
//     socket.broadcast.to("Room 1").emit("message", {
//       username: "Chat",
//       text: `${user.username} has joined the room`,
//     });

//     // Current active users and room name
//     socketIO.to("Room 1").emit("roomUsers", {
//       users: getRoomUsers(),
//     });

//     // Listen for client message
//     socket.on("chatMessage", ({msg}) => {
//       console.log(msg)
//       const user = getActiveUser(socket.id);
//       socketIO.to("Room 1").emit("message", { username: user.username, text: msg, socketID: socket.id});
//     });

//     socket.on("userLeft", () => {
//       socket.disconnect();
//     })
//   });

//   // Runs when client disconnects
//   socket.on("disconnect", () => {
//     const user = exitRoom(socket.id);

//     if (user) {
//       socketIO.to("Room 1").emit("message", {
//         username: "Chat",
//         text: `${user.username} has left the room`,
//       });

//       // Current active users and room name
//       socketIO.to("Room 1").emit("roomUsers", {
//         room: "Room 1",
//         users: getRoomUsers(),
//       });
//     }
//   });
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Connection Error" + err.message));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// init socket w/ server & corsOptions
