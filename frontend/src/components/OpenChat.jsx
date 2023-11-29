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

      return openChat.chatId;

    }).catch(err => {
      console.log(err)
    })
  }

  const getNewMessage = async (newMessage, chatId) => {
    console.log("Chat To: " + newMessage.chatTo);
    console.log("Open Chat: " + chatId);
    if (chatId == newMessage.chatTo) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }

  useEffect(async () => {

    let chatId = await getMessages();

    socket.current = io(`${baseURL}/`);

    socket.current.on("getNewMessage", (newMessage) => {
      getNewMessage(newMessage, chatId);
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