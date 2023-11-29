import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ChatFooter from './ChatFooter'
import ChatBody from './ChatBody'

import { io } from "socket.io-client"
import { baseURL } from '../util'

const OpenChat = ({ openChat, user }) => {
  const [messages, setMessages] = useState([])

  const socket = useRef();

  const getMessages = async () => {
    setMessages([])
    console.log(openChat.chatId)
    await axios.get(`${baseURL}/users/messages/${openChat.chatId}`).then((res) => {
      if (res.data.messages.length) setMessages(res.data.messages);

    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {

    getMessages();

    socket.current = io(`${baseURL}/`);

    socket.current.on("getNewMessage", (newMessage) => {
      console.log("Chat To: " + newMessage.chatTo);
      console.log("Open Chat: " + openChat.chatId);
      if (socket.current.id == newMessage.socketId) {
      setMessages((prev) => [...prev, newMessage]);
      }
    })

  }, [openChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user])

  return (
    <div id='openChat'>
      <div className="chat-header">
        {openChat.title}
      </div>
      <ChatBody openChat={openChat} user={user} socket={socket} messages={messages} />
      <ChatFooter openChat={openChat} user={user} socket={socket} setMessages={setMessages} />
    </div>
  )
}

export default OpenChat