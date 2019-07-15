import React, { useContext, useState, } from "react";
import { FlashContext, } from "./FlashProvider";
import axios from "axios";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = ({ children, }) => {
  const [user, setUser] = useState(null);
  const { setFlashMessage, } = useContext(FlashContext);

  const handleRegister = (userData, history) => {
    axios.post("/api/auth", userData)
      .then( res => {
        setUser(res.data.data);
        history.push("/");
      })
      .catch( err => {
        setFlashMessage(err.response.data.errors[0], "red");
      })
  };

  const handleLogin = (userData, history) => {
    axios.post("/api/auth/sign_in", userData) 
    .then( res => {
      setUser(res.data.data);
      history.push("/");
    })
    .catch( err => {
      setFlashMessage(err.response.data.errors[0], "red");
    })
  };

  const handleLogout = (history) => {
    axios.delete("/api/auth/sign_out")
      .then( () => {
        setUser(null);
        history.push("/login");
        setFlashMessage("Successfully Logged Out", "green");
      })
      .catch( err => {
        setFlashMessage(err.response.data.errors[0], "red");
      })
  };

  return (
    <AuthContext.Provider value={{
      user,
      authenticated: user !== null,
      handleRegister,
      handleLogin,
      handleLogout,
      setUser: (user) => setUser(user),
    }}>
      { children }
    </AuthContext.Provider>
  );
};
