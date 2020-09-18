import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './FeedingStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Feeding = (props) => {
  const format = 'h:mm a';
  const now = moment().hour(6).minute(30);
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.componentBorder}>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography color="secondary" className={classes.subTitle}>
          Feeding
        </Typography>
      </Grid>
      {props.type === 'add' && (
        <Grid item container xs={12} className={classes.addContainer}>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TextField
              variant="outlined"
              id="food"
              name="food"
              className={classes.root}
              onChange={props.addChange}
              label="Food"
              value={props.feeding.food}
            ></TextField>
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TextField
              variant="outlined"
              id="amount"
              name="amount"
              className={classes.root}
              onChange={props.addChange}
              label="Amount"
              value={props.feeding.amount}
            ></TextField>
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TimePicker
              name="feedingTime"
              showSecond={false}
              onChange={props.addTime}
              defaultValue={now}
              format={format}
              use12Hours
              value={props.feeding.time}
              inputReadOnly
            />
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <Button
              disabled={
                props.feeding.amount.length === 0 ||
                props.feeding.food.length === 0
              }
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={props.addFeed}
            >
              Add Feeding
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
          sm={props.type === 'add' ? 3 : 4}
          xs={4}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Food</Typography>
        </Grid>
        <Grid
          item
          sm={props.type === 'add' ? 3 : 4}
          xs={4}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Amount</Typography>
        </Grid>
        <Grid
          item
          sm={props.type === 'add' ? 3 : 4}
          xs={4}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Time</Typography>
        </Grid>

        <Grid item xs={12}>
          <hr className={classes.lineSpacing}></hr>
        </Grid>
      </Grid>
      {props.report &&
        props.report.feedings.map((feeding) => {
          let formattedTime = moment(feeding.time, 'HH:mm').format('h:mm a');

          return (
            <Grid item container xs={12}>
              <Grid
                item
                sm={props.type === 'add' ? 3 : 4}
                xs={4}
                className={classes.titleContainer}
              >
                <Typography>{feeding.food}</Typography>
              </Grid>
              <Grid
                item
                sm={props.type === 'add' ? 3 : 4}
                xs={4}
                className={classes.titleContainer}
              >
                <Typography>{feeding.amount}</Typography>
              </Grid>
              <Grid
                item
                sm={props.type === 'add' ? 3 : 4}
                xs={4}
                className={classes.titleContainer}
              >
                <Typography>{formattedTime}</Typography>
              </Grid>
              {props.type === 'add' && (
                <Grid item sm={3} xs={12} className={classes.mobileButtons}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      props.open('edit', 'Feeding', feeding.id, feeding)
                    }
                    style={{ marginRight: '2rem' }}
                    className={classes.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.open('delete', 'Feeding', feeding.id)}
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

export default Feeding;
