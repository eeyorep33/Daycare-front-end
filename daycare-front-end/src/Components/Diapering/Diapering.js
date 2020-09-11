import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './DiaperingStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Diapering = (props) => {
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
          Diapering
        </Typography>
      </Grid>
      {props.type === 'add' && (
        <Grid item container xs={12} className={classes.addContainer}>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TextField
              variant="outlined"
              id="type"
              name="type"
              onChange={props.addChange}
              className={classes.root}
              label="Type"
              value={props.diapering.type}
            ></TextField>
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TimePicker
              name="diaperingTime"
              showSecond={false}
              onChange={props.addTime}
              defaultValue={now}
              format={format}
              use12Hours
              value={props.diapering.time}
              inputReadOnly
            />
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <Button
              disabled={props.diapering.type.length === 0}
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={props.addDiaper}
            >
              Add Diapering
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
          <Typography color="secondary">Type</Typography>
        </Grid>
        <Grid
          item
          sm={props.type === 'add' ? 4 : 6}
          xs={6}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Time</Typography>
        </Grid>

        <Grid item xs={12}>
          <hr className={classes.lineSpacing}></hr>
        </Grid>
      </Grid>
      {props.report &&
        props.report.diaperings.map((diaper) => {
          let formattedTime = moment(diaper.time, 'HH:mm').format('h:mm a');

          return (
            <Grid item container xs={12}>
              <Grid
                item
                sm={props.type === 'add' ? 4 : 6}
                xs={6}
                className={classes.titleContainer}
              >
                <Typography>{diaper.type}</Typography>
              </Grid>
              <Grid
                item
                sm={props.type === 'add' ? 4 : 6}
                xs={6}
                className={classes.titleContainer}
              >
                <Typography>{formattedTime}</Typography>
              </Grid>
              {props.type === 'add' && (
                <Grid item sm={4} xs={12} className={classes.mobileButtons}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      props.open('edit', 'Diapering', diaper.id, diaper)
                    }
                    style={{ marginRight: '2rem' }}
                    className={classes.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.open('delete', 'Diapering', diaper.id)}
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
export default Diapering;
