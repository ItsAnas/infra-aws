import { Divider, makeStyles } from "@material-ui/core";
import React from "react";
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

  return (
    <Layout>
      <TweetInput />
      <Divider variant="middle" className={classes.divider} />
      <TweetList />
    </Layout>
  );
};

export default Home;
