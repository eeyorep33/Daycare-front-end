import React, { Component } from 'react';
import Modal from '../../../Components/Modals/EditModal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import styles from './StudentAdminStyles';
import SnackBar from '@material-ui/core/Snackbar';
import DeleteModal from '../../../Components/Modals/DeleteModal';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';
import {
  getStudents,
  editStudent,
  deleteStudent,
  addStudent,
} from '../../../Actions/StudentActions';
import { getClassrooms } from '../../../Actions/ClassroomActions';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class StudentAdmin extends Component {
  state = {
    student: {
      name: '',
      email: '',
      is_active: 'true',
      classroomId: '',
      classroomName: '',
      image: '',
      newImage: '',
      id: '',
    },

    nameHelper: '',
    emailHelper: '',
    open: false,
    deleteOpen: false,
    index: '',
  };

  componentDidMount() {
    this.props.getStudents(
      this.props.token,
      this.props.facilityId,
      this.props.user.id
    );
    this.props.getClassrooms(this.props.token, this.props.facilityId);
  }

  setImage(file, type) {
    if (type === 'edit') {
      this.setState((prevState) => ({
        student: { ...prevState.student, newImage: file },
      }));
    } else {
      this.setState((prevState) => ({
        student: { ...prevState.student, image: file },
      }));
    }
  }

  openModal(i, student, type) {
    if (type === 'edit') {
      const classindex = this.props.classrooms.findIndex((classroom) => {
        return classroom.id === student.classroomId;
      });
      const classroomName = this.props.classrooms[classindex].name;
      console.log(classroomName);
      this.setState((prevState) => ({
        open: true,
        index: i,
        student: {
          ...prevState.student,
          name: student.name,
          email: student.email,
          id: student.id,
          classroomId: student.classroomId,
          classroomName: classroomName,

          image: student.image,
          is_active: student.is_active.toString(),
        },
      }));
    } else {
      this.setState((prevState) => ({
        student: { ...prevState.student, name: student, id: i },
        deleteOpen: true,
      }));
    }
  }

  closeModal(type) {
    if (type === 'edit') {
      this.setState((prevState) => ({
        open: false,
        index: '',
        student: {
          ...prevState.student,
          name: '',
          email: '',
          id: '',
          image: '',
          classroomId: '',
          classroomName: '',
          newImage: '',
          is_active: 'true',
        },
      }));
    } else {
      this.setState((prevState) => ({
        student: { ...prevState.student, name: '', id: '' },
        deleteOpen: false,
      }));
    }
  }

  updateContent(e, type) {
    let valid;
    if (type === 'name') {
      this.setState((prevState) => ({
        student: { ...prevState.student, name: e },
      }));
    } else if (type === 'email') {
      this.setState((prevState) => ({
        student: { ...prevState.student, email: e },
      }));
    }
    if (type === 'email') {
      valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e);
    } else {
      valid = e.length > 0;
    }
    if (!valid) {
      if (type === 'name') {
        this.setState({
          nameHelper: 'Please enter an student name.',
        });
      } else {
        this.setState({
          emailHelper: 'Please enter a valid email student email.',
        });
      }
    } else {
      this.setState({
        nameHelper: '',
        emailHelper: '',
      });
    }

    if (type === 'active') {
      this.setState((prevState) => ({
        student: { ...prevState.student, is_active: e },
      }));
    }
  }

  naturalCompare = (a, b) => {
    var aName = a.name.split(' ');
    var bName = b.name.split(' ');

    var aLastName = aName[aName.length - 1];
    var bLastName = bName[bName.length - 1];

    if (aLastName < bLastName) return -1;
    if (aLastName > bLastName) return 1;
    return 0;
  };

  handleChange = (event) => {
    this.setState((prevState) => ({
      student: { ...prevState.student, classroomId: event.target.value },
    }));
  };

  addStudent() {
    const formData = new FormData();
    formData.append('name', this.state.student.name);
    formData.append('email', this.state.student.email);
    formData.append('is_active', this.state.student.is_active);
    formData.append('image', this.state.student.image);
    formData.append('classroomId', this.state.student.classroomId);
    this.props.addStudent(
      formData,
      this.props.token,
      this.props.facilityId,
      this.props.user.id
    );
    this.setState((prevState) => ({
      student: {
        ...prevState,
        name: '',
        email: '',
        image: '',
        id: '',
        classroomId: '',
      },
    }));
  }

  editStudent() {
    const formData = new FormData();
    formData.append('name', this.state.student.name);
    formData.append('email', this.state.student.email);
    formData.append('is_active', this.state.student.is_active);
    formData.append('classroomId', this.state.student.classroomId);
    if (this.state.student.newImage) {
      formData.append('image', this.state.student.newImage);
    }
    this.props.editStudent(
      formData,
      this.state.student.id,
      this.props.token,
      this.props.user.id,
      this.props.facilityId
    );
    this.closeModal('edit');
  }

  deleteStudent() {
    this.props.deleteStudent(
      this.state.student.id,
      this.props.token,
      this.props.user.id,
      this.props.facilityId
    );
    this.closeModal('delete');
  }

  render() {
    const { classes } = this.props;
    const label = this.state.student.image
      ? this.state.student.image.name
      : 'Upload Image Here';
    let studentMap = null;
    if (this.props.students) {
      studentMap = (
        <div>
          {this.props.students.sort(this.naturalCompare).map((student, i) => {
            return (
              <React.Fragment key={student.id}>
                <Grid
                  container
                  spacing={3}
                  className={classes.buttonContainer}
                  key={student.id}
                >
                  <Grid
                    className={classes.mobile}
                    item
                    xs={12}
                    sm={6}
                    key={student.id}
                  >
                    <Typography
                      color="secondary"
                      variant="h4"
                      style={{ fontWeight: 700 }}
                      className={classes.margin}
                    >
                      {student.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.mobile}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      color="secondary"
                      onClick={() => this.openModal(i, student, 'edit')}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.button}
                      color="secondary"
                      onClick={() =>
                        this.openModal(student.id, student.name, 'delete')
                      }
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <hr className={classes.divMargin}></hr>
              </React.Fragment>
            );
          })}

          <Modal
            open={this.state.open}
            close={() => this.closeModal('edit')}
            change={(e) => this.updateContent(e.target.value, e.target.name)}
            drop={(file, text) => this.setImage(file, 'edit')}
            update={() => this.editStudent()}
            student={this.state.student}
            classrooms={this.props.classrooms}
            changeClassroom={(e) => this.handleChange(e)}
            component={this.props.students}
            index={this.state.index}
            type={'Student'}
            compare={this.naturalCompare}
            emailHelper={this.state.emailHelper}
            nameHelper={this.state.nameHelper}
          />

          <DeleteModal
            deleteOpen={this.state.deleteOpen}
            close={() => this.closeModal()}
            name={this.state.student.name}
            delete={(e) => this.deleteStudent()}
            type={'Student'}
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <SnackBar
          styles={{ display: 'flex', justifyContent: 'center' }}
          open={
            this.props.studentError !== null &&
            this.props.studentError.length !== 0
              ? true
              : false
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={this.props.studentError}
          ContentProps={{
            style: {
              backgroundColor: 'orange',
            },
          }}
          onClose={() => this.props.clearError()}
          autoHideDuration={4000}
        ></SnackBar>
        <Grid container className={classes.gridContainer}>
          <Grid
            container
            item
            direction="column"
            className={classes.formContainer}
            spacing={3}
            xs={9}
          >
            <Typography className={classes.title}>Add a Student</Typography>
            <Grid item xs={12} className={classes.textContainer}>
              <TextField
                className={classes.root}
                variant="outlined"
                fullWidth
                error={this.state.nameHelper.length !== 0}
                id="name"
                name="name"
                helperText={this.state.nameHelper}
                onChange={(e) =>
                  this.updateContent(e.target.value, e.target.name)
                }
                label="Student Name"
                value={this.state.student.name}
              ></TextField>
            </Grid>
            <Grid item xs={12} className={classes.textContainer}>
              <TextField
                className={classes.root}
                variant="outlined"
                fullWidth
                type="text"
                error={this.state.emailHelper.length !== 0}
                id="email"
                helperText={this.state.emailHelper}
                onChange={(e) => this.updateContent(e.target.value, 'email')}
                label="Student Email"
                value={this.state.student.email}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined">
                <InputLabel color="secondary" id="classroom">
                  Classroom
                </InputLabel>
                <Select
                  className={classes.dropdown}
                  labelId="classroom"
                  id="classroom"
                  value={this.state.student.classroomId}
                  onChange={(e) => this.handleChange(e)}
                  label="Classroom"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.props.classrooms &&
                    this.props.classrooms
                      .sort(this.naturalCompare)
                      .map((classroom) => {
                        return (
                          <MenuItem value={classroom.id}>
                            {classroom.name}
                          </MenuItem>
                        );
                      })}
                </Select>
              </FormControl> 
            </Grid>

            <Grid item xs={12}>
              <StyledDropZone
              className={classes.imagePicker}
                children={label}
                onDrop={(file, text) => this.setImage(file)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={
                  this.state.nameHelper.length !== 0 ||
                  this.state.emailHelper.length !== 0
                }
                type="submit"
                onClick={() => this.addStudent()}
                variant="contained"
                color="secondary"
                className={classes.button2}
              >
                Add Student
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Typography className={classes.title}>Current Students</Typography>
        <hr className={classes.divMargin}></hr>
        {studentMap}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.appReducer.isAuth,
    token: state.appReducer.token,
    user: state.appReducer.user,
    facilityId: state.appReducer.facilityId,
    authLoading: state.appReducer.authLoading,
    students: state.studentReducer.students,
    studentError: state.studentReducer.studentError,
    classrooms: state.classReducer.classrooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: (token, facility, user) =>
      dispatch(getStudents(token, facility, user)),
    addStudent: (student, token, facility, user) =>
      dispatch(addStudent(student, token, facility, user)),
    editStudent: (student, id, token, user, facility) =>
      dispatch(editStudent(student, id, token, user, facility)),
    clearError: () => dispatch({ type: 'CLEAR_STUDENT_ERROR' }),
    deleteStudent: (id, token, user, facility) =>
      dispatch(deleteStudent(id, token, user, facility)),
    getClassrooms: (token, facilityId) =>
      dispatch(getClassrooms(token, facilityId)),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(StudentAdmin)
);
