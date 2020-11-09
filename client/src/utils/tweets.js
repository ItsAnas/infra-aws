import _ from "lodash";
import groups from "../constants/groups";
import * as Chance from "chance";

const getMockedTweets = () => {
  const tweetList = [];
  const chance = new Chance();

  for (var i = 0; i < 15; i++) {
    const pseudo = chance.name();
    const group = _.sample(groups);
    const message = chance.paragraph();
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
