const mongoose = require("mongoose");
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
  // console.log("GET contacts")
  const { userId } = req.params;

  // console.log(req.params)

  // $ne selects the documents where the value of the specified field is not equal to the specified value.
  // so this find will return to the user a list of all the users in the DB except for themself
  // find only returns the users' _id and username (not their email or password)
  await userSchema
    .find({ _id: { $ne: userId } }, "_id username")
    .then((users) => {
      //   console.log(users);

      res.json({ users });
    })
    .catch((error) => {
      
      console.log("Contacts Error " + error);
      return next(error);
    });

  // res.send("user contacts")
});

// GET user messages
router.route("/:userId/messages").get(async (req, res, next) => {
  // console.log(req.query)
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ message: "Missing required information." });
  }

  let id = new mongoose.Types.ObjectId(userId)

  await messageSchema
    .find({ $or: [{ "reciever._id": id}, {"sender._id": id}]})
    .then((messages) => {
      console.log(messages);
      res.json({ messages });
    })
    .catch((error) => {
      console.log("Get Messages Error " + error);
      return next(error);
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
    .catch((error) => {
      console.log("Get Messages Error " + error);
      return next(error);
    });

  //   res.send("user messages");
});

// POST send user message
router.route("/:userId/:contactId/message").post(async (req, res, next) => {
  const { userId, contactId } = req.params;
  const { message } = req.body;

  if (!userId || !message || !contactId) {
    return res.status(400).json({ message: "Missing required information." });
  }

  let user = await userSchema.findById(userId);
  let contact = await userSchema.findById(contactId);

  await messageSchema
    .create({
      message,
      reciever: {_id: contact._id, username: contact.username},
      sender: {_id: user._id, username: user.username},
    })
    .then((newMessage) => {
      console.log(newMessage);
      res.json({ newMessage });
    })
    .catch((error) => {
      console.log("Send Message Error " + error);
      return next(error);
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
    .catch((error) => {
      console.log("Create Room Error " + error);
      return next(error);
    });
  //   res.send("create chat room");
});

module.exports = router;
