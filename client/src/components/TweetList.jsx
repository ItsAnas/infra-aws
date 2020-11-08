import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import getMockedTweets from "../utils/tweets";

const TweetList = () => {
  // FIXME: Load from API
  const tweetList = getMockedTweets();

  return (
    <List>
      {tweetList.map((tweet, index) => (
        <ListItem key={index}>
          {tweet.pseudo}
          {tweet.group}
          {tweet.message}
          {tweet.createdAt}
        </ListItem>
      ))}
    </List>
  );
};

export default TweetList;