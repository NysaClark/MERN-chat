import React, { useEffect, useState } from 'react'
import axios from "axios"
import { baseURL } from '../util';

const ChatBody = ({ openChat, user, messages }) => {
    const [members, setMembers] = useState({});
    useEffect(() => {
        // console.log("getMembers")
        const getMembers = () => {
            setMembers();

            openChat.members.forEach(async (memberId) => {
                await axios.get(`${baseURL}/users/${memberId}`).then((res) => {
                    
                    if (res.data.user) {
                        setMembers((prev) => ({
                            ...prev,
                            [res.data.user._id]: res.data.user.username,
                        }));
                    }
                })
            }) 

            // console.log(members)
        }
        getMembers()       
        
    }, [openChat])

    return (
        <div className='chat-body'>
            <div className="messages">
                {messages.length ?
                    messages.map((msg) => {
                        return (
                            <div className={msg.sender == user._id ? "message you" : "message other"} key={msg._id} >
                                <p>{msg.message}</p>
                                <span>{members[msg.sender]}</span>
                            </div>
                        )
                    }) : <h2>Type to start chatting!</h2>
                }
            </div>
        </div>
    )
}
export default ChatBody