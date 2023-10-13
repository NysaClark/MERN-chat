const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      unique: true
    },
    chatId: {
      type: String,
      required: true
    },
    chatUsers:{
      type: Array,
      required: true
    }
    // avatarImage: {
    //   type: String,
    //   default: ''
    // },
    // chatType: {
    //   type: String,
    //   default: 'room'
    // }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Room', roomSchema)