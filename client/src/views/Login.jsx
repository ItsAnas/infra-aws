import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(6),
  },
  inputContainer: {
    width: "100%",
  },
}));

const Login = () => {
  const classes = useStyles();
  const onLoginClick = () => {
    console.log("Login");
  };

  const onSignUpClick = () => {
    console.log("Signup");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h6">Login 🤘</Typography>
          </Grid>
          <Grid item className={classes.inputContainer}>
            <TextField label="Email" className={classes.inputContainer} />
          </Grid>
          <Grid item className={classes.inputContainer}>
            <TextField
              label="Password"
              className={classes.inputContainer}
              type="password"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={onLoginClick}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={onSignUpClick}>
              Don't have any account? Sign up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
