import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

const ChatBody = ({ }) => {
    // const [currentUser, setCurrentUser] = useState("")
    // const navigate = useNavigate()

    // let { username } = useParams();


    // const handleLeaveChat = () => {
    //     socket.emit("userLeft")
    //     navigate("/")
    //     window.location.reload()
    // }

    // useEffect(() => {
    //     setCurrentUser(username)
    // }, [])


    return (
        <div className='chat-body'>
            <div className="messages">Chat Body</div>
        </div>
    )
}

export default ChatBody