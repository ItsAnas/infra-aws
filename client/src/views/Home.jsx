import { Divider, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Layout from "../components/Layout";
import TweetInput from "../components/TweetInput";
import TweetList from "../components/TweetList";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refreshTweets = () => setRefreshIndex(refreshIndex + 1);

  return (
    <Layout key={refreshIndex}>
      <TweetInput refreshTweets={refreshTweets} />
      <Divider variant="middle" className={classes.divider} />
      <TweetList />
    </Layout>
  );
};

export default Home;
