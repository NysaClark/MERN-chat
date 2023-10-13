import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit("joinRoom", {username})
        navigate(`/chat/${username}`)
    }
  return (
    <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Sign in to Open Chat</h2>
        <label htmlFor="username">username</label>
        <input type="text" 
        name="username" 
        id='username'
        className='username__input' 
        value={username} 
        onChange={e => setUsername(e.target.value)}
        />
        <button className='home__cta'>SIGN IN</button>
    </form>
  )
}

export default Home