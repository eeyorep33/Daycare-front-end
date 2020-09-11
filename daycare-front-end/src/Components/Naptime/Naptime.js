import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './NaptimeStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Naptime = (props) => {
  const format = 'h:mm a';
  const now = moment().hour(6).minute(30);
  const classes = useStyles();

  return (
    <Grid item container xs={12} className={classes.componentBorder}>
      <Grid item xs={12}>
        <hr className={classes.divider}></hr>
      </Grid>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography color="secondary" className={classes.subTitle}>
          Nap Time
        </Typography>
      </Grid>
      {props.type === 'add' && (
        <Grid item container xs={12} className={classes.addContainer}>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TimePicker
              name="startTime"
              showSecond={false}
              onChange={(value) => props.addTime(value, 'nap', 'start')}
              defaultValue={now}
              format={format}
              use12Hours
              value={props.naptime.start_time}
              inputReadOnly
            />
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TimePicker
              name="endtime"
              showSecond={false}
              onChange={(value) => props.addTime(value, 'nap', 'end')}
              defaultValue={now}
              format={format}
              use12Hours
              value={props.naptime.end_time}
              inputReadOnly
            />
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <Button
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={props.addNap}
            >
              Add Nap Time
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
          sm={props.type === 'add' ? 4 : 6}
          xs={6}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Start Time</Typography>
        </Grid>
        <Grid
          item
          sm={props.type === 'add' ? 4 : 6}
          xs={6}
          className={classes.titleContainer}
        >
          <Typography color="secondary">End Time</Typography>
        </Grid>

        <Grid item xs={12}>
          <hr className={classes.lineSpacing}></hr>
        </Grid>
      </Grid>
      {props.report &&
        props.report.naptimes.map((nap) => {
          let startTime = moment(nap.start_time, 'HH:mm').format('h:mm a');
          let endTime = moment(nap.end_time, 'HH:mm').format('h:mm a');

          return (
            <Grid item container xs={12}>
              <Grid
                item
                sm={props.type === 'add' ? 4 : 6}
                xs={6}
                className={classes.titleContainer}
              >
                <Typography>{startTime}</Typography>
              </Grid>
              <Grid
                item
                sm={props.type === 'add' ? 4 : 6}
                xs={6}
                className={classes.titleContainer}
              >
                <Typography>{endTime}</Typography>
              </Grid>

              {props.type === 'add' && (
                <Grid item sm={4} xs={12} className={classes.mobileButtons}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.open('edit', 'Naptime', nap.id, nap)}
                    style={{ marginRight: '2rem' }}
                    className={classes.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.open('delete', 'Naptime', nap.id)}
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

export default Naptime;
