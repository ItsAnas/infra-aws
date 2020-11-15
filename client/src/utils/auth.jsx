import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import API from "./api";

const AuthContext = React.createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context cannot be undefined");
  }
  return context;
}

export function isTokenValid(token) {
  const { exp } = jwt_decode(token);
  const now = Date.now().valueOf() / 1000;
  return now < exp;
}

const AuthContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("isSignedIn") === "true" || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [errors, setErrors] = useState([]);


  const handleSignIn = ({ email, password }) => {
    API.login({ email, password })
      .then(resp => {
        localStorage.setItem("isSignedIn", resp.data.success ? "true" : "false");
        localStorage.setItem("token", resp.data.token);

        setIsSignedIn(resp.data.success);
        setToken(resp.data.token);
      })
      .catch(err => setErrors((prevErrors) => [...prevErrors, err.response.data.error]));
  };

  const handleSignUp = ({ email, password, confirmPassword, nickname, group }) => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => [...prevErrors, "Passwords does not match"]);
    } else {
      API.signUp({ email, password, nickname, group })
        .then(() => handleSignIn({ email, password }))
        .catch(err => setErrors((prevErrors) => [...prevErrors, err.response.data.error]));
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setToken(null);

    localStorage.clear();
  };

  const authContextValue = {
    isSignedIn,
    token,
    errors,
    signIn: ({ email, password }) => handleSignIn({ email, password }),
    signUp: ({ email, password, confirmPassword, nickname, group }) =>
    handleSignUp({ email, password, confirmPassword, nickname, group }),
    signOut: () => handleSignOut(),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
