import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  pseudo: {
    fontWeight: 700,
    marginRight: theme.spacing(1),
  },
  group: {
    color: "rgb(136, 153, 166)",
  },
  createdAt: {
    color: "rgb(136, 153, 166)",
  },
}));

const Tweet = ({ tweet }) => {
  const classes = useStyles();
  const date = new Date(tweet.createdAt);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} direction="row" wrap="nowrap">
        <Grid item>
          <Avatar
            src={`https://eu.ui-avatars.com/api/?background=random&name=${tweet.user.nickname}`}
          />
        </Grid>

        <Grid item xs={11}>
          <Grid item container direction="row" alignItems="center">
            <Typography variant="h6" className={classes.pseudo}>
              {tweet.user.nickname}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.group}
            >{` @ ${tweet.user.group}`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{tweet.message}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" className={classes.createdAt}>
              {date.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Tweet;
