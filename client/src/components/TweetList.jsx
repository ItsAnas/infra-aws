import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tweet from "./Tweet";
import getMockedTweets from "../utils/tweets";
import API from "../utils/api";

const TweetList = () => {
  const [tweetList, setTweetList] = useState(null);

  useEffect(() => {
    API.getTweets()
      .then(resp => setTweetList(resp.data));
  }, []);

  if (tweetList === null) {
    return <CircularProgress />;
  }

  return (
    <List>
      {tweetList.map((tweet, index) => (
        <ListItem key={index}>
          <Tweet tweet={tweet} />
        </ListItem>
      ))}
    </List>
  );
};

export default TweetList;
