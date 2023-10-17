// const mongoose = require("mongoose");
const router = require("express").Router();

// import middleware (?)
// const authMiddleware = require('../middleware/authMiddleware')
// router.use(authMiddleware)

// import Models
const userSchema = require("../models/User");
const roomSchema = require("../models/Room");
const messageSchema = require("../models/Message");

// GET user contacts
router.route("/:userId/contacts").get(async (req, res, next) => {
  const { userId } = req.params;

  console.log(req.params)

  // $ne selects the documents where the value of the specified field is not equal to the specified value.
  // so this find will return to the user a list of all the users in the DB except for themself
  // find only returns the users' _id and username (not their email or password)
  await userSchema
    .find({ _id: { $ne: userId } }, "_id username")
    .then((users) => {
      //   console.log(users);

      res.json({ users });
    })
    .catch((err) => {
      console.log("Contacts Error " + err.messge);
      return next(err);
    });

  // res.send("user contacts")
});

// GET user messages
router.route("/:userId/messages").get(async (req, res, next) => {
  const { userId } = req.params;
  const { chatId } = req.query;

  if (!userId || !chatId) {
    return res.status(400).json({ message: "Missing required information." });
  }

  await messageSchema
    .find({ chatId: chatId })
    .then((messages) => {
      //   console.log(messages);
      res.json({ messages });
    })
    .catch((err) => {
      console.log("Get Messages Error " + err.message);
      return next(err);
    });

  //   res.send("user messages");
});

// GET user rooms
router.route("/:userId/rooms").get(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Missing required information." });
  }

  // find rooms where the user is included in the room's list of users
  // find returns the rooms' id, users, and room name
  await roomSchema
    .find({ chatUsers: {$in: [userId]} }, "chatId chatUsers roomName")
    .then((rooms) => {
      // console.log(rooms);
      res.json({ rooms });
    })
    .catch((err) => {
      console.log("Get Messages Error " + err.message);
      return next(err);
    });

  //   res.send("user messages");
});

// POST send user message
router.route("/:userId/message").post(async (req, res, next) => {
  const { userId } = req.params;
  const { chatId } = req.query;
  const { message } = req.body;

  if (!userId || !chatId || !message) {
    return res.status(400).json({ message: "Missing required information." });
  }

  await messageSchema
    .create({
      message,
      chatId: chatId,
      sender: userId,
    })
    .then((newMessage) => {
      console.log(newMessage);
      res.json({ newMessage });
    })
    .catch((err) => {
      console.log("Send Message Error " + err.message);
      return next(err);
    });

  //   res.send("send user message");
});

// POST create room
router.route("/:userId/room").post(async (req, res, next) => {
  const { userId } = req.params;
  const { roomName, users } = req.body;
  // const { chatId } = req.query;

  let chatId = "15";

  if (!userId || !roomName || !chatId) {
    return res.status(400).json({ message: "Missing required information." });
  }

  // TODO Check if there's already a room w/ this chatId 

  await roomSchema
    .create({
      roomName,
      chatId: chatId,
      chatUsers: [...users, userId],
    })
    .then((newRoom) => {
      // console.log(newRoom);
      res.json({ room: newRoom });
    })
    .catch((err) => {
      console.log("Create Room Error " + err.message);
      return next(err);
    });
  //   res.send("create chat room");
});

module.exports = router;
