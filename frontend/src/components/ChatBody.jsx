import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

const ChatBody = ({ messages, socket }) => {
    const [currentUser, setCurrentUser] = useState("")
    const navigate = useNavigate()

    let { username } = useParams();
    

    const handleLeaveChat = () => {
        socket.emit("userLeft")
        navigate("/")
        window.location.reload()
    }

    useEffect(() => {
        setCurrentUser(username)
    }, [])


    return (
        <>
            <header className='chat__mainHeader'>
                <p>Hangout with Colleagues</p>
                <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
            </header>
            <div className='message__container'>
                {messages.map(message => (
                    message.socketID == socket.id ? (
                        <div className="message__chats" key={message.id}>
                            <p className='sender__name'>You</p>
                            <div className='message__sender'>
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.username}</p>
                            <div className='message__recipient'>
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </>
    )
}

export default ChatBody