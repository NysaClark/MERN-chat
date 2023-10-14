import React from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = ({ username }) => {
    const handleLogout = () => {
        // post axios to /auth/logout
    }

    return (
        <div className='header'>
            <h1><Link to="/">Chat App</Link></h1>
            <div className="aside">
                <p>Welcome {username}!</p>
                <Link to="/create-room" className='btn'><i className="bi bi-person-plus-fill"></i></Link>
                <Link to="/login" className='btn'><i className="bi bi-box-arrow-right"></i></Link>
                {/* <button onClick={handleLogout} className='btn'>Logout</button> */}
            </div>
        </div>
    )
}

export default Header