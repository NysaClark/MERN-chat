import React, { useEffect, useState } from 'react'
import axios from "axios"

const ContactsList = ({ user, setOpenChat }) => {
  const [showContacts, setShowContacts] = useState(true);
  const [showRooms, setShowRooms] = useState(true);

  const [userList, setUserList] = useState([])
  const [roomsList, setRoomsList] = useState([])

  const fetchUsers = async () => {
    axios.get(`http://localhost:4000/api/users/${user._id}/contacts`).then((res) => {

      if (res.data.users) {
        setUserList(res.data.users)
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const fetchRooms = async () => {
    axios.get(`http://localhost:4000/api/users/${user._id}/rooms`).then((res) => {
      if (res.data.rooms) {
        setRoomsList(res.data.rooms)
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }

  useEffect(() => {
    fetchUsers()
    fetchRooms();
  }, [])

  return (
    <div id='contactsList'>
      <button onClick={() => setShowContacts(!showContacts)}>
        Users
        {showContacts ?
          <i className="bi bi-chevron-up" />
          :
          <i className="bi bi-chevron-down" />
        }
      </button>
      <ul className="contacts">
        {showContacts && userList && userList.map((contact) => {
          return (
            <li onClick={() => setOpenChat(contact._id)} key={contact._id}>{contact.username}</li>
          )
        })}
      </ul>
      <button onClick={() => setShowRooms(!showRooms)}>
        Rooms
        {showRooms ?
          <i className="bi bi-chevron-up" />
          :
          <i className="bi bi-chevron-down" />
        }
      </button>
      <ul className="rooms">
        {showRooms && roomsList.length && roomsList.map((room) => {
          return (
            <li onClick={() => setOpenChat(room.chatId)} key={room.chatId}><p>{room.roomName}</p><p>{room.chatUsers.length} users</p></li>
          )
        })}
        {showRooms && !roomsList.length && <p>You aren't in any rooms!</p>}
      </ul>
    </div>
  )
}

export default ContactsList