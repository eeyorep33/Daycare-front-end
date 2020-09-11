import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './ReportModalStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ReportModal = (props) => {
  const classes = useStyles();
  const format = 'h:mm a';
  let feeding;
  let diapering;
  let nap;
  let now;
  let end;
  let meds;
  let comments;
  let supplies;
  let playtime;
  if (
    props.name === 'Feeding' ||
    props.name === 'Diapering' ||
    props.name === 'Meds'
  ) {
    now = moment(props.component.time, 'HH:mm');
  }
  if (props.name === 'Naptime') {
    now = moment(props.component.start_time, 'HH:mm');
    end = moment(props.component.end_time, 'HH:mm');
  }
  if (props.name && props.name === 'Feeding') {
    feeding = (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography className={classes.title}> Edit {props.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="food"
            name="food"
            onChange={props.change}
            label="Food"
            value={props.component.food}
          ></TextField>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="amount"
            name="amount"
            onChange={props.change}
            label="Amount"
            value={props.component.amount}
          ></TextField>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TimePicker
            name="feedingTime"
            showSecond={false}
            onChange={props.time}
            format={format}
            use12Hours
            defaultValue={now}
            inputReadOnly
          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            type="submit"
            onClick={props.update}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.close}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (props.name && props.name === 'Comments') {
    comments = (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Edit {props.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="comment"
            name="comment"
            multiline
            onChange={props.change}
            label="Comment"
            value={props.component.comment}
          ></TextField>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            type="submit"
            onClick={props.update}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.close}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (props.name && props.name === 'Supplies') {
    supplies = (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Edit {props.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="supply"
            name="supply_item"
            multiline
            onChange={props.change}
            label="Supply Item"
            value={props.component.supply_item}
          ></TextField>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            type="submit"
            onClick={props.update}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.close}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (props.name && props.name === 'Playtime') {
    playtime = (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Edit {props.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="activity"
            name="activity"
            multiline
            onChange={props.change}
            label="Activity"
            value={props.component.activity}
          ></TextField>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            type="submit"
            onClick={props.update}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.close}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (props.name && props.name === 'Diapering') {
    diapering = (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Edit {props.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="type"
            name="type"
            onChange={props.change}
            label="Type"
            value={props.component.type}
          ></TextField>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TimePicker
            name="diaperingTime"
            showSecond={false}
            onChange={props.time}
            format={format}
            use12Hours
            defaultValue={now}
            inputReadOnly
          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            type="submit"
            onClick={props.update}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.close}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }
  if (props.name && props.name === 'Meds') {
    meds = (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Edit {props.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="name"
            name="name"
            onChange={props.change}
            label="Food"
            value={props.component.name}
          ></TextField>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TextField
            variant="outlined"
            id="dosage"
            name="dosage"
            onChange={props.change}
            label="Amount"
            value={props.component.dosage}
          ></TextField>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TimePicker
            name="medsTime"
            showSecond={false}
            onChange={props.time}
            format={format}
            use12Hours
            defaultValue={now}
            inputReadOnly
          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            type="submit"
            onClick={props.update}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.close}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid> 
    );
  }
  if (props.name && props.name === 'Naptime') {
    nap = (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Edit {props.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TimePicker
            name="startNap"
            showSecond={false}
            onChange={props.napStart}
            format={format}
            use12Hours
            defaultValue={now}
            inputReadOnly
          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <TimePicker
            name="endNap"
            showSecond={false}
            onChange={props.napEnd}
            format={format}
            use12Hours
            defaultValue={end}
            inputReadOnly
          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Button
            type="submit"
            onClick={props.update}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Save Changes
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.close}
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <Dialog open={props.open}>
      {feeding}
      {diapering}
      {nap}
      {meds}
      {playtime}
      {comments}
      {supplies}
    </Dialog>
  );
};

export default ReportModal;
