import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './MedStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Meds = (props) => {
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
          Medicine
        </Typography>
      </Grid>
      {props.type === 'add' && (
        <Grid item container xs={12} className={classes.addContainer}>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TextField
              variant="outlined"
              id="name"
              name="name"
              className={classes.root}
              onChange={props.addChange}
              label="Name of Medicine"
              value={props.meds.name}
            ></TextField>
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TextField
              variant="outlined"
              id="dosage"
              name="dosage"
              className={classes.root}
              onChange={props.addChange}
              label="Dosage"
              value={props.meds.dosage}
            ></TextField>
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <TimePicker
              name="medsTime"
              showSecond={false}
              onChange={props.addTime}
              defaultValue={now}
              format={format}
              use12Hours
              value={props.meds.time}
              inputReadOnly
            />
          </Grid>
          <Grid item sm={3} xs={12} className={classes.titleContainer}>
            <Button
              disabled={
                props.meds.name.length === 0 || props.meds.dosage.length === 0
              }
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={props.addMeds}
            >
              Add Medicine
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
          <Typography color="secondary">Name</Typography>
        </Grid>
        <Grid
          item
          sm={props.type === 'add' ? 3 : 4}
          xs={4}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Dosage</Typography>
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
        props.report.medicines.map((med) => {
          let formattedTime = moment(med.time, 'HH:mm').format('h:mm a');

          return (
            <Grid item container xs={12}>
              <Grid
                item
                sm={props.type === 'add' ? 3 : 4}
                xs={4}
                className={classes.titleContainer}
              >
                <Typography>{med.name}</Typography>
              </Grid>
              <Grid
                item
                sm={props.type === 'add' ? 3 : 4}
                xs={4}
                className={classes.titleContainer}
              >
                <Typography>{med.dosage}</Typography>
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
                    onClick={() => props.open('edit', 'Meds', med.id, med)}
                    style={{ marginRight: '2rem' }}
                    className={classes.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.open('delete', 'Meds', med.id)}
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

export default Meds;
