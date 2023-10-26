const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const initSocket = require("./socket/index")

const app = express();
const PORT = process.env.PORT || 4000;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const authMiddleware = require("./middleware/authMiddleware");

// const corsOptions = {
//   //connect to frontend
//   origin: "https://mern-chat-l99i.onrender.com",
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
//users



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Connection Error" + err.message));

app.post("/", authMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// init socket w/ server & corsOptions
initSocket(server)