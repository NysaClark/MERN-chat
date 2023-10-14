import React, {useState} from 'react'
import ContactsList from '../components/ContactsList'
import OpenChat from '../components/OpenChat'

import Header from '../components/Header'

const Home = ({ user }) => {
  const [openChat, setOpenChat] = useState()

  return (
    <>
      <Header username={user.username} />
      <div id='chats'>
        <ContactsList user={user} setOpenChat={setOpenChat} />
        <OpenChat openChat={openChat} setOpenChat={setOpenChat} />
      </div>
    </>
  )
}

export default Home