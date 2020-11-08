import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <Box width="60%">{children}</Box>
      </main>
    </div>
  );
};

export default Layout;
