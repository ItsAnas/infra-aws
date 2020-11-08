import _ from "lodash";
import groups from "../constants/groups";

const getMockedTweets = () => {
  const tweetList = [];

  for (var i = 0; i < 15; i++) {
    const pseudo = `Pseudo ${i}`;
    const group = _.sample(groups);
    const message = `Some message here ${i}`;
    const createdAt = new Date().toLocaleString();
    tweetList.push({
      pseudo,
      group,
      message,
      createdAt,
    });
  }

  return tweetList;
};

export default getMockedTweets;
