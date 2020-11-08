import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <main className={classes.content}>
        <Container maxWidth="md">{children}</Container>
      </main>
    </div>
  );
};

export default Layout;
