import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
const ChatBody = ({ openChat, socket }) => {

    const [messages, setMessages] = useState([])
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

    useEffect(() => {
        console.log(openChat.user)
        const getMessages = async () => {
            await axios.get(`http://localhost:4000/api/users/${openChat.user._id}/messages`).then((res) => {
                console.log(res.data.messages);
                setMessages(res.data.messages)
            })
        }

        getMessages();
    }, [])



    return (
        <div className='chat-body'>
            <div className="messages">
                {messages.length ? <>
                    {messages.map((message) => {
                        return (
                            <div className={message.sender._id == openChat.user._id ? "message you" : "message other"} key={message._id} >
                                <p>{message.message}</p>
                                <span>{message.sender.username}</span>
                            </div>
                        )
                    })}
                </>
                : <h2>Type to start chatting!</h2>
                }
            </div>
        </div>
    )
}

export default ChatBody