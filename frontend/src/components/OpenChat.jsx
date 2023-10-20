import axios from 'axios'
import React, { useEffect } from 'react'
import ChatFooter from './ChatFooter'
import ChatBody from './ChatBody'


const OpenChat = ({ socket, openChat }) => {
  useEffect(() => {
    console.log(openChat)

    // if(openChat.contact){
    //   socket.emit("joinChat", openChat, socket.id)
    // }else if(openChat.room){
    //   socket.emit("joinRoom", openChat)
    // }
  }, [openChat, socket])


  return (
    <div id='openChat'>
      <div className="chat-header">
        {openChat.contact ? openChat.contact.username : openChat.room.roomName}
      </div>
      <ChatBody openChat={openChat} socket={socket} />
      <ChatFooter />
    </div>
  )
}

export default OpenChat