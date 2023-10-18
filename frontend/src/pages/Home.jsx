import React, {useState, useEffect} from 'react'
import ContactsList from '../components/ContactsList'
import OpenChat from '../components/OpenChat'

import Header from '../components/Header'

const Home = ({ user, logout }) => {
  const [openChat, setOpenChat] = useState()
  return (
    <>
      <Header username={user.username} logout={logout} link={"/create-room"} icon={"bi-person-plus-fill"} />
      <div id='chats'>
        <ContactsList user={user} setOpenChat={setOpenChat} />
        <OpenChat openChat={openChat} setOpenChat={setOpenChat} />
      </div>
    </>
  )
}

export default Home