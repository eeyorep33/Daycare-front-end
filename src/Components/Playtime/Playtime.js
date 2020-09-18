import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './PlaytimeStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Playtime = (props) => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.componentBorder}>
      <Grid item xs={12}>
        <hr className={classes.divider}></hr>
      </Grid>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography color="secondary" className={classes.subTitle}>
          Play Time
        </Typography>
      </Grid>
      {props.type === 'add' && (
        <Grid item container xs={12} className={classes.addContainer}>
          <Grid item sm={6} xs={12} className={classes.titleContainer}>
            <TextField
              variant="outlined"
              id="activity"
              name="activity"
              style={{ width: '40rem' }}
              className={classes.root}
              onChange={props.addChange}
              label="Activity"
              value={props.play.activity}
            ></TextField>
          </Grid>

          <Grid item sm={6} xs={12} className={classes.titleContainer}>
            <Button
              disabled={props.play.activity.length === 0}
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={props.addPlay}
            >
              Add Play Time
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <hr className={classes.divMargin}></hr>
      </Grid>
      <Grid item container xs={12}>
        <Grid
          item
          sm={props.type === 'add' ? 8 : 12}
          xs={12}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Activity</Typography>
        </Grid>

        <Grid item xs={12}>
          <hr className={classes.lineSpacing}></hr>
        </Grid>
      </Grid>
      {props.report &&
        props.report.playtimes.map((play) => {
          return (
            <Grid item container xs={12}>
              <Grid
                sm={props.type === 'add' ? 8 : 12}
                xs={12}
                className={classes.titleContainer}
              >
                <Typography>{play.activity}</Typography>
              </Grid>
              {props.type === 'add' && (
                <Grid item sm={4} xs={12} className={classes.mobileButtons}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      props.open('edit', 'Playtime', play.id, play)
                    }
                    style={{ marginRight: '2rem' }}
                    className={classes.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.open('delete', 'Playtime', play.id)}
                    className={classes.button}
                  >
                    Delete
                  </Button>
                </Grid>
              )}

              <Grid item xs={12}>
                <hr className={classes.lineSpacing}></hr>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
};
export default Playtime;
