import React, { useState } from 'react'

const ChatFooter = ({  }) => {
//   const [message, setMessage] = useState("")

//   const handleSendMessage = (e) => {
//     e.preventDefault()
//     if (message.trim()) {
//       socket.emit("chatMessage",
//         {
//           msg: message,
//         }
//       )
//     }
//     setMessage("")
//   }
  return (
    <div className='chat-footer'>
      <form className='form' onSubmit={() => {}}>
        <input
          type="text"
          placeholder='Write message'
          className='message'
        //   value={message}
        //   onChange={e => setMessage(e.target.value)}
        />
        <button className="sendBtn"><i className="bi bi-send-fill"></i></button>
      </form>
    </div>
  )
}

export default ChatFooter