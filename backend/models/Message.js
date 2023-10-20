const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    // chatId: {
    //   type: String,
    //   required: true
    // },
    sender: {
      type: Object,
      required: true
    },
    reciever: {
      type: Object,
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