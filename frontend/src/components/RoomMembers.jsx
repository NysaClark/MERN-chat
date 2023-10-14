import React, { useState, useEffect } from 'react'
import axios from "axios"
const RoomMembers = ({user}) => {
    const [userList, setUserList] = useState([])

    const fetchUsers = async () => {
        axios.get(`http://localhost:4000/api/users/${user._id}/contacts`).then((res) => {
            if (res.data.users) {
                setUserList(res.data.users)
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div id='roomMembers'>
            <h3>Select Your Room Members</h3>
            <ul className="contacts">
                {userList && userList.map((contact) => {
                    return (
                        <li onClick={() => setOpenChat(contact._id)} key={contact._id}>{contact.username}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default RoomMembers