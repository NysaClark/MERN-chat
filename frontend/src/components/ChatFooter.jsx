import React, { useState } from 'react'
import axios from 'axios'
import { baseURL } from "../util"

const ChatFooter = ({ openChat, socket, user, setMessages }) => {
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }
    const newMessage = {
      sender: user._id,
      message,
      chatId: openChat.chatId
    }
    let receivers = openChat.members.filter((memberId) => memberId !== user._id);
    // send new message to any other members of the chat that are online



    socket.current.emit("sendMessage", {
      sender: user._id,
      receivers,
      message,
      chatId: openChat.chatId
    })
    // add message to DB
    await axios.post(`${baseURL}/users/message`, newMessage).then((res) => {
      // console.log(res.data.message);
      setMessages((prev) => [...prev, res.data.message]);
    }).catch(err => console.log(err))
    setMessage("");
  }

  return (
    <div className='chat-footer'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Write message'
          className='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button disabled={message.length > 280 ? true : false} className="sendBtn"><i className="bi bi-send-fill"></i></button>
      </form>
    </div>
  )
}

export default ChatFooter