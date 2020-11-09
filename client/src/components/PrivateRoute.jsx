import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isTokenValid, useAuth } from "../utils/auth";

function RedirectToSign() {
  return <Redirect to="/auth/sign" />;
}

export default function PrivateRoute({ children, ...props }) {
  const authContext = useAuth();
  if (authContext.token && !isTokenValid(authContext.token)) {
    authContext.signOut();
    return <RedirectToSign />;
  }

  return (
    <Route {...props}>
      {authContext.isSignedIn ? children : <RedirectToSign />}
    </Route>
  );
}
