import React from 'react';
import Dialog from '@material-ui/core/Dialog/';
import DialogTitle from '@material-ui/core/DialogTitle/';
import Button from '@material-ui/core/Button';
import useStyles from './StudentDetailsStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
import noImage from '../../images/noImage.png';

const StudentDetails = (props) => {
  const classes = useStyles();
  let label;
  let email;
  let name;
  let classroomName;
  let image = '';
  let displayImage = (
    <Grid item xs={12} sm={3} className={classes.radioContainer}>
      <img className={classes.noImage} src={noImage} alt="None" />
    </Grid>
  );
  let active;
  let checkedIn;

  if (props.student && props.classroom) {
    label = props.newImage ? props.newImage.name : 'Upload Image Here';
    email = props.student.email;
    name = props.student.name;
    classroomName = props.classroom.name;
    active = props.student.is_active === true ? 'Yes' : 'No';
    checkedIn = props.student.checked_in === true ? 'Yes' : 'No';

    if (props.student.image !== null && props.student.image !== '') {
      image = 'https://helping-hand-node.herokuapp.com/' + props.student.image;
      displayImage = (
        <Grid item xs={12} sm={3} className={classes.radioContainer}>
          <img className={classes.displayImage} src={image} alt="None" />
        </Grid>
      );
    }
  }

  return (
    <Dialog open={props.open} fullScreen={true}>
      <Grid container>
        <Grid item xs={12}>
          <DialogTitle className={classes.title}>
            Student Details{props.type}
          </DialogTitle>
        </Grid>
        <Grid item sm={3} xs={12} className={classes.imageContainer}>
          {displayImage}
        </Grid>
        <Grid container item xs={12} sm={8}>
          <Grid item container sm={6}>
            <Grid item xs={12} className={classes.currentInfo}>
              <Typography>Name:&nbsp; {name}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.currentInfo}>
              <Typography>Email:&nbsp; {email}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.currentInfo}>
              <Typography>Classroom: &nbsp; {classroomName}</Typography>
            </Grid>
          </Grid>
          <Grid item container sm={6}>
            <Grid item xs={12} className={classes.currentInfo}>
              <Typography>Is Active: &nbsp; {active}</Typography>
            </Grid> 
            <Grid
              item
              // style={{ marginTop: '-3rem' }}
              xs={12}
              className={classes.checkedIn}
            >
              <Typography>Checked In: &nbsp; {checkedIn}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.imagePicker}>
          <StyledDropZone children={label} onDrop={props.drop} />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
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
            Close
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default StudentDetails;
