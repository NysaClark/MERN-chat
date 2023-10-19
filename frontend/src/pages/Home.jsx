import React, { useState, useEffect } from 'react'
import ContactsList from '../components/ContactsList'
import OpenChat from '../components/OpenChat'

import Header from '../components/Header'

const Home = ({ user, logout, socket }) => {
  const [openChat, setOpenChat] = useState()

  return (
    <>
      <Header username={user.username} logout={logout} link={"/create-room"} icon={"bi-person-plus-fill"} />
      <div id='chats'>
        <ContactsList user={user} setOpenChat={setOpenChat} />
        {openChat ?
          <OpenChat openChat={openChat} socket={socket} />
          :
          <div id='openChat'>
           <h2>Select a user/room to start a chat</h2>
          </div>
        }

      </div>
    </>
  )
}

export default Home