const userSchema = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ message: 'Unauthorized' })
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
     return res.json({ message: 'Unauthorized' })
    } else {
      req.user = {username: decoded.username, userId: decoded._id}
      next()
    }
  })
}

module.exports = authMiddleware