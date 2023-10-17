import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import socketIO from "socket.io-client"
// const socket = socketIO.connect("http://localhost:4000")

import Home from "./pages/Home"
import Login from "./pages/Login"
import Rooms from "./pages/Rooms"
import SignUp from "./pages/SignUp"
import axios from "axios";

function App() {
  const [user, setUser] = useState()
  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    // setUser()

    const verifyCookie = async () => {
      // console.log(typeof cookies.token)
      if (!cookies.token || cookies.token == "undefined") {
        console.log("no user");
        // navigate("/login");
      
      } else {

        let res = await axios.post(
          "http://localhost:4000/",
          {},
          { withCredentials: true }
        );

        const { user } = res.data;
        console.log(user)
        // setCookie()
        
        setUser(user)

        // setUsername(user);
      };
    }

    verifyCookie();
  }, [cookies, removeCookie]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* If the user tries to go to the home page or create-room page but they haven't logged in they'll be sent to the login page */}
          <Route path="/" element={user ? <Home user={user}  /> : <Navigate to="/login" replace={true} />}></Route>
          <Route path="/create-room" element={user ? <Rooms user={user}  /> : <Navigate to="/login" replace={true} />}></Route>

          {/* If the user tries to go to the login or signup page but they're already logged in they'll be sent to the chat page (/) */}
          <Route path="/login" element={user ? <Navigate to="/" replace={true} /> : <Login setUser={setUser} />}></Route>
          <Route path="/signup" element={user ? <Navigate to="/" replace={true} /> : <SignUp setUser={setUser} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;