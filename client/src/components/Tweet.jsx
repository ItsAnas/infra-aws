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
    marginRight: theme.spacing(1),
    color: "rgb(136, 153, 166)",
  },
  createdAt: {
    color: "rgb(136, 153, 166)",
  },
}));

const Tweet = ({ tweet }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3} direction="row" wrap="nowrap">
        <Grid item>
          <Avatar
            src={`https://eu.ui-avatars.com/api/?background=random&?name=${tweet.pseudo}`}
          />
        </Grid>

        <Grid item xs={11}>
          <Grid item container direction="row" alignItems="center">
            <Typography variant="h6" className={classes.pseudo}>
              {tweet.pseudo}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.group}
            >{` - ${tweet.group}`}</Typography>
            <Typography
              variant="subtitle2"
              className={classes.createdAt}
            >{` - ${tweet.createdAt}`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{tweet.message}</Typography>
          </Grid>
        </Grid>
  
      </Grid>
    </Paper>
  );
};

export default Tweet;
