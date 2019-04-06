import React, { useState, } from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const handleRegister = (userData, history) => {
    axios.post("/api/auth", userData)
      .then( res => {
        setUser(res.data.data);
        history.push("/");
      })
      .catch( err => {
        console.log(err.response);
      })
  }

  const handleLogin = (userData, history) => {
    axios.post("/api/auth/sign_in", userData) 
      .then( res => {
        setUser(res.data.data);
        history.push("/");
      })
      .catch( err => {
        console.log(err.response);
      })
  }

  const handleLogout = (history) => {
    axios.delete("/api/auth/sign_out")
      .then( res => {
        setUser(null);
        history.push("/login");
      })
      .catch( err => {
        console.log(err.response);
      })
  }

  return (
    <AuthContext.Provider value={{
      user,
      authenticated: user !== null,
      handleRegister,
      handleLogin,
      handleLogout,
      setUser: (user) => setUser(user),
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}
