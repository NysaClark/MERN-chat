// const mongoose = require("mongoose");
const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import middleware (?)

// import Models
const userSchema = require("../models/User");
// const roomSchema = require("../models/Room");
// const messageSchema = require("../models/Message");

// POST Create User
router.route("/register").post(async (req, res, next) => {
  // let password = req.body.password;
  req.body.password = await bcrypt.hash(req.body.password, 10);

  // console.log(req.body);

  await userSchema
    .create(req.body)
    .then((newUser) => {
      const payload = { userId: newUser._id, username: newUser.username };

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // console.log(`TOKEN ${token}`);
      // cookie

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

  await userSchema
    .findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      const passwordCorrect = bcrypt.compareSync(password, user.password);

      // password doesn't match
      if (!passwordCorrect) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      const payload = { userId: user._id, username: user.username };

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // console.log(token);

      //cookie
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      

      res.json({ user });
    })
    .catch((err) => {
      console.log("Login Error " + err.message);
      return next(err);
    });
  //   res.send("login");
});

// // POST User Logout (remove token from cookie)
// router.route("/logout").post(async (req, res, next) => {
//   res.send("logout");
// });

module.exports = router;
