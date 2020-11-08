import { makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./Header";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;
