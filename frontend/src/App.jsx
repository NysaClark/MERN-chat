import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseURL } from "./util";

import Chats from "./pages/Chats"
import Login from "./pages/Login"
import Rooms from "./pages/Rooms"
import SignUp from "./pages/SignUp"

function App() {
  const [user, setUser] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    setUser()
    const verifyCookie = async () => {
      if (cookies.token && cookies.token !== "undefined") {
        await axios.post(`${baseURL}/`, {}, { withCredentials: true })
          .then((res) => {
            setUser(res.data.user)
          }).catch(err => {
            console.log(err)
          })
      };
    }

    verifyCookie();
  }, [cookies, removeCookie]);

  const logout = () => {
    removeCookie("token");
    setUser()
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/chats" element={user ? <Chats user={user} logout={logout} /> : <Navigate to="/" replace={true} />} />
          <Route path="/create-room" element={user ? <Rooms user={user} logout={logout} /> : <Navigate to="/" replace={true} />} />
          <Route path="/" element={user ? <Navigate to="/chats" replace={true} /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={user ? <Navigate to="/chats" replace={true} /> : <SignUp setUser={setUser} />} />
          <Route path="*" element={user ? <Chats user={user} logout={logout} /> : <Navigate to="/" replace={true} />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;