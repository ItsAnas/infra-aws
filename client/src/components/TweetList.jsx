import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tweet from "./Tweet";
import getMockedTweets from "../utils/tweets";
import API from "../utils/api";

const useStyles = makeStyles(() => ({
  noTweet: {
    display: "flex",
    color: "white",
    justifyContent: "center",
  },
}));

const TweetList = () => {
  const classes = useStyles();
  const [tweetList, setTweetList] = useState(null);

  useEffect(() => {
    API.getTweets()
      .then(resp => setTweetList(resp.data));
  }, []);

  if (tweetList === null) {
    return <CircularProgress />;
  }

  if (tweetList.length === 0) {
    return <Typography className={classes.noTweet}>No tweets for the moment 😥</Typography>;
  }

  return (
    <List>
      {tweetList.sort((x, y) => x.createdAt < y.createdAt).map((tweet, index) => (
        <ListItem key={index}>
          <Tweet tweet={tweet} />
        </ListItem>
      ))}
    </List>
  );
};

export default TweetList;
