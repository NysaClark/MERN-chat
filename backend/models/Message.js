const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      maxLength: 280,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatId: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
