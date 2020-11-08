import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          EpiTweet
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
