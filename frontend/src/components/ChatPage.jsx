// import React, { useEffect, useState, useRef} from 'react'
// import ChatBar from './ChatBar'
// import ChatBody from './ChatBody'
// import ChatFooter from './ChatFooter'

// const ChatPage = ({socket}) => { 
//   const [messages, setMessages] = useState([])

//   useEffect(()=> {
//     socket.on("message", (data) => {
//       setMessages((prev) => [...prev, data])
//     })
//   }, [socket])

//   return (
//     <div className="chat">
//       <ChatBar socket={socket}/>
//       <div className='chat__main'>
//         <ChatBody messages={messages} socket={socket} />
//         <ChatFooter socket={socket}/>
//       </div>
//     </div>
//   )
// }

// export default ChatPage