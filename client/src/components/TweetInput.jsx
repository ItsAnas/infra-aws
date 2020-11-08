import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  textField: {
    display: "flex",
    flexGrow: 1,
    color: "white",
  },
}));

const TweetInput = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} direction="column">
        <Grid item container direction="row" spacing={3}>
          <Grid item xs={1}>
            {/* FIXME: Should be current user */}
            <Avatar
              src={
                "https://eu.ui-avatars.com/api/?background=random&?name=Jonh+Doe"
              }
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="tweet-input"
              placeholder="What's your mood today?"
              multiline
              className={classes.textField}
            />
          </Grid>
        </Grid>
        <Grid item container justify="flex-end">
          <Button variant="contained" color="secondary">
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TweetInput;
