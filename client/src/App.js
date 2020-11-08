import React, { Suspense } from "react";
import Home from "./views/Home";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";
import Login from "./views/Login";
import AuthContextProvider from "./utils/auth";
import PrivateRoute from "./components/PrivateRoute";

const history = createBrowserHistory();

const App = () => (
  <ThemeProvider theme={theme()}>
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
        {/* FIXME: Add auth context provider */}
        <AuthContextProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route exact path="/auth/login">
              <Login />
            </Route>
          </Switch>
        </AuthContextProvider>
      </Suspense>
    </Router>
  </ThemeProvider>
);

export default App;
