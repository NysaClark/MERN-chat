import React, { useEffect, useState } from 'react'
import axios from "axios"
import { baseURL } from '../util';

const ChatBody = ({ openChat, user, messages }) => {
    // console.log(openChat)
    
  // let {chatId, chatType, title, members } = openChat;
    const [members, setMembers] = useState({});

    useEffect(() => {
      const getMembers =  () =>{
        // console.log('function ')
         openChat.members.forEach(async (memberId) => {
            console.log('members')
            await axios.get(`${baseURL}/users/${memberId}`).then((res) => {
                console.log(res.data.user);
                // setMembers((prev) => {...prev, res.data.user})
                setMembers((prev) => ({
                    ...prev,
                    [res.data.user._id]: res.data.user.username,
                }));
            })
        })
      }
      getMembers()
    //   console.log(members)
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
                    })
                
                     : <h2>Type to start chatting!</h2> 
                }
            </div>
        </div>
    )
}

export default ChatBody