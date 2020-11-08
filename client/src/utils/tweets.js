import _ from "lodash";
import groups from "../constants/groups";

const getMockedTweets = () => {
  const tweetList = [];

  for (var i = 0; i < 15; i++) {
    const pseudo = `Pseudo ${i}`;
    const group = _.sample(groups);
    const message = `L'erreur du parieur est une erreur de logique consistant à croire que si, lors d'un tirage aléatoire, un résultat peu probable est obtenu un grand nombre de fois, les tirages suivants vont probablement compenser cette déviation et donner de nombreuses fois le résultat opposé.${i}`;
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
