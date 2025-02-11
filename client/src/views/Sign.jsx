import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { useAuth } from "../utils/auth";
import groups from "../constants/groups";

const LOGIN_MODE = "Login";
const SIGNUP_MODE = "Sign up";

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
  title: {
    fontWeight: 700,
  },
  errors: {
    color: "#dd2c00",
  },
  label: {
      top: "auto",
      left: "auto",
  },
}));

const Errors = ({ errors }) => {
  const classes = useStyles();

  return (
    <div className={classes.errors}>
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  );
};

const Sign = () => {
  const classes = useStyles();
  const authContext = useAuth();

  // State
  const [currentMode, setCurrentMode] = useState(LOGIN_MODE);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [group, setGroupe] = useState("");

  const onSignActionClick = () => {
    if (currentMode === LOGIN_MODE) authContext.signIn({ email, password });
    else authContext.signUp({ email, password, confirmPassword, nickname, group });
  };

  const onChangeModeClick = useCallback(() => {
    // Switch mode
    if (currentMode === LOGIN_MODE) setCurrentMode(SIGNUP_MODE);
    else setCurrentMode(LOGIN_MODE);
  }, [currentMode]);

  if (authContext.isSignedIn) {
    return <Redirect to="/" />;
  }

  const title = currentMode === LOGIN_MODE ? "Login 🤘" : "Sign up 💁‍♂️";
  const changeMode =
    currentMode === LOGIN_MODE
      ? "Don't have any account? Sign up"
      : "Already have an account? Login";

  return (
    <div className={classes.root}>
      <FormControl>
        <Paper className={classes.paper}>
          <Grid
            container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5" className={classes.title}>
                {title}
              </Typography>
            </Grid>
            {authContext.errors !== [] && (
              <Errors errors={authContext.errors} />
            )}
            <Grid item className={classes.inputContainer}>
              <TextField
                label="Email"
                className={classes.inputContainer}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item className={classes.inputContainer}>
              <TextField
                label="Password"
                className={classes.inputContainer}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {currentMode === SIGNUP_MODE && (
              <Grid item className={classes.inputContainer}>
                <TextField
                  label="Confirm password"
                  className={classes.inputContainer}
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            )}
            {currentMode === SIGNUP_MODE && (
              <Grid item className={classes.inputContainer}>
                <TextField
                  label="Nickname"
                  className={classes.inputContainer}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Grid>
            )}
            {currentMode === SIGNUP_MODE && (
              <Grid item className={classes.inputContainer}>
                <InputLabel id="group-label" className={classes.label}>Group</InputLabel>
                <Select
                  labelId="group-label"
                  value={group}
                  onChange={(e) => setGroupe(e.target.value)}
                  className={classes.inputContainer}
                >
                  {groups.map((g, i) => (
                    <MenuItem value={g} key={i}>
                      {g}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={onSignActionClick}
              >
                {currentMode}
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onChangeModeClick}>{changeMode}</Button>
            </Grid>
          </Grid>
        </Paper>
      </FormControl>
    </div>
  );
};

export default Sign;
