// const mongoose = require("mongoose");
const router = require("express").Router();

// import middleware (?)

// import Models
const userSchema = require("../models/User");
// const roomSchema = require("../models/Room");
// const messageSchema = require("../models/Message");

// POST Create User
router.route("/register").post(async (req, res, next) => {
  await userSchema
    .create(req.body)
    .then((newUser) => {
      // add bcrypt & jwtoken
      res.json({
        user: newUser,
      });
    })
    .catch((err) => {
      console.log("Register Error " + err.messge);
      return next(err);
    });

  // res.send("register")
});

// Post User Login
router.route("/login").post(async (req, res, next) => {
  const { username, password } = req.body;

  await userSchema.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    // password doesn't match
    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    res.json({ user });
  }).catch((err) => {
    console.log("Login Error " + err.message)
    return next(err)
  })
//   res.send("login");
});

// POST User Logout (remove token from cookie)
router.route("/logout").post(async (req, res, next) => {
  res.send("logout");
});

module.exports = router;
