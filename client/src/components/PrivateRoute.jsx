import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isTokenValid, useAuth } from "../utils/auth";

function RedirectToLogin() {
  return <Redirect to="/auth/login" />;
}

export default function PrivateRoute({ children, ...props }) {
  const authContext = useAuth();
  if (authContext.token && !isTokenValid(authContext.token)) {
    authContext.signOut();
    return <RedirectToLogin />;
  }

  return (
    <Route {...props}>
      {authContext.isSignedIn ? children : <RedirectToLogin />}
    </Route>
  );
}
