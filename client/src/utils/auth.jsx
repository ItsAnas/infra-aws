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
    // FIXME: This function is missing many API calls...

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("isSignedIn") === "true" || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [errors, setErrors] = useState([]);

  const handleSign = () => {
    localStorage.setItem("isSignedIn", "true");
    localStorage.setItem("token", "someToken");

    setIsSignedIn(true);
    setToken("someToken");
  };

  const handleSignIn = ({ email, password }) => {
    handleSign();
  };

  const handleSignUp = ({ email, password, confirmPassword, nickname }) => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => [...prevErrors, "Passwords does not match"]);
    } else {
      handleSign();
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
    signUp: ({ email, password, confirmPassword, nickname }) =>
      handleSignUp({ email, password, confirmPassword, nickname }),
    signOut: () => handleSignOut(),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
