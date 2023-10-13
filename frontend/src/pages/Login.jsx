import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";

const Login = ({setUser}) => {
    const [userForm, setUserForm] = useState({
        username: "",
        password: "",
    });


    const handleChange = (event) => {
        setUserForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:4000/api/auth/login", userForm).then((res) => {
            console.log(res.data);

            if(res.data.user) {
                setUser(res.data.user)

            }

            // setUserForm({
            //     username: "",
            //     password: "",
            // });
        })
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={userForm.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userForm.password}
                    onChange={handleChange}
                />

                <button type="submit" className='submit-btn'>Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

export default Login