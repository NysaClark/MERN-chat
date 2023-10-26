import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";

const Login = ({ setUser }) => {
    const [userForm, setUserForm] = useState({
        username: "",
        password: "",
    });

    const [err, setErr] = useState()


    const handleChange = (event) => {
        setErr();
        setUserForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setErr();

        axios.post("http://localhost:4000/api/auth/login", userForm, { withCredentials: true }).then((res) => {
            // console.log(res.data.user);

            if (res.data.user) {
                setUser(res.data.user)
            }else{
                setErr(res.data.error)
            }
        }).catch((error) => {
            console.log(error.message)
            setErr(error.message)
        })
    }

    return (
        <div className="form-wrapper">
            <div className='container'>
                <h1>Login</h1>
                {err && <div className="err">
                    <p>{err}</p>
                </div>}
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
                    <button type="submit" className='btn'>Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login