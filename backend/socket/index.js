const messageSchema = require("../models/Message");
const userSchema = require("../models/User");
const chatSchema = require("../models/Chat");

const initSocket = (server) => {
  // const io = require("socket.io")(server, { cors: corsOptions });
  const io = require("socket.io")(server, {
    cors: {
      origin: "https://mern-chat-l99i.onrender.com",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
    },
  });

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket) => {
    // console.log(`user connected: ${socket.id}`);

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      // io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ sender, receivers, message }) => {
      receivers.forEach((receiverId) => {
        let user = getUser(receiverId);

        if (user) {
          // if the other users are online send them the new message
          io.to(user.socketId).emit("getNewMessage", {
            sender,
            message,
          });
        }
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      // console.log("user disconnected");
      removeUser(socket.id);
      // io.emit("getUsers", users);
    });

    // socket.on("sendMessage", async ({ msg, sender, recievers, chatType }) => {
    //   // console.log(recievers)

    //   let userArray = [];

    //   for(user of recievers){
    //     if(user !== sender._id){
    //       await userSchema.findOne({_id: user}, "_id username").then((u) => {
    //         userArray.push(u)
    //       })
    //     }
    //   }

    //   const newMsg = {
    //     sender,
    //     recievers: userArray,
    //     message: msg,
    //     chatType,
    //   };

    //   console.log("message", newMsg);

    //   await messageSchema.create(newMsg).then((newMsg) => {
    //     socket.emit("newMsgRecieved", newMsg)
    //   })
    //   // console.log(recieverArray);

    //   // let prevChat = messageSchema.find({ chatType: chatType, $or: [{ "sender._id": sender._id}, {"recievers": {$in: [sender]}}] })
    // });
  });
};

module.exports = initSocket;
