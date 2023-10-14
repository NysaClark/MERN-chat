import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";

const SignUp = ({ setUser }) => {

  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: ""
  });

  const [err, setErr] = useState()

  const handleChange = (event) => {
    setUserForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErr();

    if (userForm.password !== userForm.confirmPass) {
      return setErr("Passwords do not match");

    }

    axios.post("http://localhost:4000/api/auth/register", {
      username: userForm.username,
      email: userForm.email,
      password: userForm.password
    }).then((res) => {
      // console.log(res.data);

      if (res.data.user) {
        setUser(res.data.user)

      }
    }).catch((err) => {
      console.log(err.message)
      setErr(err.response.data.message)
    })
  }

  return (
    <div className="form-wrapper">
      <div className='container'>
        <h1>Sign Up</h1>
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
            type="email"
            placeholder="Email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPass"
            value={userForm.confirmPass}
            onChange={handleChange}
          />

          <button type="submit" className='btn'>Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default SignUp