const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    chatId: {
      type: String,
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
    // readers: {
    //   type: Array,
    //   default: []
    // }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Message', messageSchema)