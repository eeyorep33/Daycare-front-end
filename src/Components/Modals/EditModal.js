import React from 'react';

import Dialog from '@material-ui/core/Dialog/';
import DialogTitle from '@material-ui/core/DialogTitle/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import useStyles from './EditModalStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
import noImage from '../../images/noImage.png';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const DialogModal = (props) => {
  const classes = useStyles();
  let emailShow = 'hidden';
  let adminShow = false;
  let activeShow = false;
  let name = '';
  let email = '';
  let admin = '';
  let active = '';
  let id = '';
  let classroomId = '';
  let classroomName = '';
  let image = null;
  let label = '';
  let emailHelper = '';
  let displayImage = (
    <Grid item xs={12} sm={3} className={classes.radioContainer}>
      <img className={classes.noImage} src={noImage} alt="None" />
    </Grid>
  );
  let currentName = '';
  let currentEmail = '';
  let currentIsActive = '';
  let currentAdmin = '';
  if (props.index !== null && props.index !== '') {
    id = props.component[props.index].id;
    if (props.type === 'Classroom' || props.type === 'Announcement') {
      name = props.name;
    }
    if (props.type === 'Student') {
      label = props.student.newImage
        ? props.student.newImage.name
        : 'Upload Image Here';
      email = props.student.email;
      name = props.student.name;
      classroomName = props.student.classroomName;
      classroomId = props.student.classroomId;
      emailHelper = props.emailHelper;
      currentEmail = props.component[props.index].email;
      currentIsActive =
        props.component[props.index].is_active === true ? 'Yes' : 'No';
      currentName = props.component[props.index].name;
      active = props.student.is_active.toString();
      emailShow = 'text';
      if (props.student.image !== null && props.student.image !== '') {
        image = 'https://helping-hand-node.herokuapp.com/' + props.student.image;
        displayImage = (
          <Grid item xs={12} sm={3} className={classes.radioContainer}>
            <img className={classes.displayImage} src={image} alt="None" />
          </Grid>
        );
      }
    }
    if (props.type === 'Employee' || props.type === 'Profile') {
      label = props.employee.newImage
        ? props.employee.newImage.name
        : 'Upload Image Here';
      email = props.employee.email;
      emailHelper = props.emailHelper;
      currentEmail = props.component[props.index].email;
      currentIsActive =
        props.component[props.index].is_active === true ? 'Yes' : 'No';
      currentName = props.component[props.index].name;
      emailShow = 'text';
    }
    if (props.type === 'Employee') {
      name = props.employee.name;
      admin = props.employee.is_admin.toString();
      active = props.employee.is_active.toString();
      currentAdmin =
        props.component[props.index].is_admin === true ? 'Yes' : 'No';
      adminShow = true;
      if (props.employee.image !== null && props.employee.image !== '') {
        image = 'https://helping-hand-node.herokuapp.com/' + props.employee.image;
        displayImage = (
          <Grid item xs={12} sm={3} className={classes.radioContainer}>
            <img className={classes.displayImage} src={image} alt="None" />
          </Grid>
        );
      }
    }
    if (props.type === 'Employee' || props.type === 'Student') {
      activeShow = true;
    }
  }

  return (
    <Dialog open={props.open} fullScreen={true}>
      <div className={classes.formContainer}>
        <DialogTitle className={classes.title}>Update {props.type}</DialogTitle>
        <form onSubmit={props.update}>
          <Grid
            container
            spacing={2}
            //  xs={12}
          >
            {props.type === 'Employee' && (
              <React.Fragment>
                <Grid item sm={3} xs={12} className={classes.imageContainer}>
                  {displayImage}
                </Grid>
                <Grid container item xs={12} sm={8}>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>Name:&nbsp; {currentName}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>Email:&nbsp; {currentEmail}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>
                      Is Administrator: &nbsp; {currentAdmin}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>Is Active: &nbsp; {currentIsActive}</Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
            {props.type === 'Student' && (
              <React.Fragment>
                <Grid item sm={3} xs={12} className={classes.imageContainer}>
                  {displayImage}
                </Grid>
                <Grid container item xs={12} sm={8}>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>Name:&nbsp; {currentName}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>Email:&nbsp; {currentEmail}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>Classroom: &nbsp; {classroomName}</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.currentInfo}>
                    <Typography>Is Active: &nbsp; {currentIsActive}</Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                id={`${props.type}Name`}
                type="text"
                multiline
                name="name"
                value={name}
                className={classes.input}
                onChange={props.change}
                error={props.nameHelper.length > 0}
                helperText={props.nameHelper}
              />
            </Grid>
            {props.type !== 'Announcement' && (
 <Grid item xs={12}>
 <TextField
   variant="outlined"
   id="email"
   type={emailShow}
   name="email"
   value={email}
   className={classes.input}
   style={{ marginBottom: '10px' }}
   onChange={props.change}
   error={emailHelper.length > 0}
   helperText={emailHelper}
 />
</Grid>
            )}
           
            {props.type === 'Student' && (
              <Grid item xs={12} className={classes.radioContainer}>
                <FormControl variant="outlined">
                  <InputLabel color="secondary" id="classroom">
                    Classroom
                  </InputLabel>
                  <Select
                    className={classes.dropdown}
                    labelId="classroom"
                    id="classroom"
                    value={classroomId}
                    onChange={props.changeClassroom}
                    label="Classroom"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.classrooms &&
                      props.classrooms.sort(props.compare).map((classroom) => {
                        return (
                          <MenuItem value={classroom.id}>
                            {classroom.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {adminShow && (
              <Grid
                item
                container
                style={{ marginTop: '2rem', marginBottom: '4rem' }}
              >
                <Grid item xs={12} sm={6} className={classes.radioContainer}>
                  <Typography color="secondary" className={classes.titleMargin}>
                    Has Administrative Rights
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.radioContainer}>
                  <FormControl>
                    <RadioGroup
                      className={classes.radioGroup}
                      value={admin}
                      name="admin"
                      onChange={props.change}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            {activeShow && (
              <Grid
                item
                container
                style={{ marginTop: '2rem', marginBottom: '4rem' }}
              >
                <Grid item xs={12} sm={6} className={classes.radioContainer}>
                  <Typography color="secondary" className={classes.titleMargin}>
                    Active Status
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.radioContainer}>
                  <FormControl>
                    <RadioGroup
                      className={classes.radioGroup}
                      value={active}
                      name="active"
                      onChange={props.change}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {activeShow && (
              <Grid item xs={12} >
                <StyledDropZone 
                className={classes.imagePicker}
                children={label} onDrop={props.drop} />
              </Grid>
            )}
          </Grid>

          <TextField
            variant="outlined"
            id="id"
            type="hidden"
            name="id"
            value={id}

            //  style={{marginBottom: "10px"}}
          />

          <div className={classes.buttonContainer}>
            <Button
              type="submit"
              onClick={props.update}
              disabled={props.nameHelper.length !== 0}
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
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default DialogModal;
