import React, { useState, useEffect } from 'react'
import axios from "axios"
const RoomMembers = ({ user, setErr, selectedUsers, setSelectedUsers }) => {
    const [userList, setUserList] = useState([])

    const fetchUsers = async () => {
        axios.get(`http://localhost:4000/api/users/${user._id}/contacts`, {withCredentials: true}).then((res) => {
            if (res.data.users) {
                setUserList(res.data.users)
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const handleSelect = (userId) => {
        // console.log('selected ' + userId)
        if (!selectedUsers.includes(userId)) {
            // setSelected(true)
            setSelectedUsers((prev) => [
                ...prev, userId
            ])
        }else{
            // setSelected(false)
            let newList = selectedUsers.filter(id => id !== userId);
            // console.log(newList)
            setSelectedUsers(newList)
        }
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
                        <li
                            onClick={() => handleSelect(contact._id)}
                            key={contact._id}
                            className={selectedUsers.includes(contact._id) ? "selected" : ""}
                        >
                            {contact.username}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default RoomMembers