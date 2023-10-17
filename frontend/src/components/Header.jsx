import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = ({ username, removeCookie }) => {
    let navigate = useNavigate();
    // const [cookies, removeCookie] = useCookies([]);
    
    const handleLogout = async () => {
        // post axios to /auth/logout
        // await axios.post("http://localhost:4000/api/auth/logout", {}, {withCredentials: true})
        removeCookie("token");
        navigate("/login");
    }

    return (
        <div className='header'>
            <h1><Link to="/">Chat App</Link></h1>
            <div className="aside">
                <p>Welcome {username}!</p>
                <Link to="/create-room" className='btn'><i className="bi bi-person-plus-fill"></i></Link>
                {/* <Link to="/login" className='btn'><i className="bi bi-box-arrow-right"></i></Link> */}
                <button onClick={handleLogout} className='btn'><i className="bi bi-box-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default Header