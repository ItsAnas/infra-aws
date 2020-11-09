import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context cannot be undefined");
  }
  return context;
}

export function isTokenValid(token) {
  // FIXME: Change this to real version
  return true;
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

  const handleSign = () => {
    // FIXME: From API
    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("token", "someToken");

    setIsSignedIn(true);
    setToken("someToken");
  };

  const handleSignIn = ({ email, password }) => {
    handleSign();
  };

  const handleSignUp = ({ email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => [...prevErrors, "Passwords does not match"]);
    } else {
      handleSign();
    }
  };

  const authContextValue = {
    isSignedIn,
    token,
    errors,
    signIn: ({ email, password }) => handleSignIn({ email, password }),
    signUp: ({ email, password, confirmPassword }) =>
      handleSignUp({ email, password, confirmPassword }),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
