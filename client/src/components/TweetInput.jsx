import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState, useCallback } from "react";
import API from "../utils/api";
import { useAuth } from "../utils/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    display: "flex",
    flexGrow: 1,
    color: "white",
  },
}));

const TweetInput = ({ refreshTweets }) => {
  const classes = useStyles();
  const authContext = useAuth();
  const [tweetInput, setTweetInput] = useState("");

  const onTweetSend = useCallback(() => {
    API.postTweet({ message: tweetInput })
      .then(refreshTweets);
  }, [tweetInput]);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} direction="column">
        <Grid item container direction="row" spacing={3} wrap="nowrap">
          <Grid item>
            <Avatar
              src={
                `https://eu.ui-avatars.com/api/?background=random&name=${authContext.nickname}`
              }
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="tweet-input"
              placeholder="What's your mood today?"
              multiline
              className={classes.textField}
              onChange={(e) => setTweetInput(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item container justify="flex-end">
          <Button variant="contained" color="secondary" onClick={onTweetSend}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TweetInput;
