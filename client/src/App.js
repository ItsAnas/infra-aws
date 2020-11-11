import React, { Suspense } from "react";
import Home from "./views/Home";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";
import Sign from "./views/Sign";
import AuthContextProvider from "./utils/auth";
import PrivateRoute from "./components/PrivateRoute";

const history = createBrowserHistory();

const App = () => (
  <ThemeProvider theme={theme()}>
    <Router history={history}>
      <Suspense fallback={<div>loading...</div>}>
        <AuthContextProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route exact path="/auth/sign">
              <Sign />
            </Route>
          </Switch>
        </AuthContextProvider>
      </Suspense>
    </Router>
  </ThemeProvider>
);

export default App;
