import React from 'react'

const OpenChat = ({ openChat }) => {
  return (
    <div>
      {openChat ?
        <div id='openChat'>Open Chat</div>
      :
        <div id='openChat'>
          Select a user/room to start a chat
        </div>
      }
    </div>
  )
}

export default OpenChat