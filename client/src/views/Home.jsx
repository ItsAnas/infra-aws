import React from "react";
import Layout from "../components/Layout";
import TweetInput from "../components/TweetInput";
import TweetList from "../components/TweetList";

const Home = () => (
  <Layout>
    <TweetInput />
    <TweetList />
  </Layout>
);

export default Home;
