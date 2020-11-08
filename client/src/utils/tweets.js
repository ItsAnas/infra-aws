import _ from "lodash";
import groups from "../constants/groups";
import * as Chance from "chance";

const getMockedTweets = () => {
  const tweetList = [];
  const chance = new Chance();

  for (var i = 0; i < 15; i++) {
    const pseudo = chance.name();
    const group = _.sample(groups);
    // const message = `L'erreur du parieur est une erreur de logique consistant à croire que si, lors d'un tirage aléatoire, un résultat peu probable est obtenu un grand nombre de fois, les tirages suivants vont probablement compenser cette déviation et donner de nombreuses fois le résultat opposé.${i}`;
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
