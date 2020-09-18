import React, { Component } from 'react';
import Modal from '../../../Components/Modals/EditModal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import styles from './EmployeeAdminstyles';
import SnackBar from '@material-ui/core/Snackbar';
import DeleteModal from '../../../Components/Modals/DeleteModal';
import {
  getEmployees,
  editEmployee,
  deleteEmployee,
  addEmployee,
} from '../../../Actions/EmployeeActions';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import { StyledDropZone } from 'react-drop-zone';
import 'react-drop-zone/dist/styles.css';

class EmployeeAdmin extends Component {
  state = {
    employee: {
      name: '',
      email: '',
      is_admin: 'false',
      is_active: 'true',
      classroomId: '',
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
    console.log('rerendering in component did mount');
    this.props.getEmployees(
      this.props.token,
      this.props.facilityId,
      this.props.user.id
    );
    console.log('state user in mount');
    console.log(this.props.user);

    console.log('employees');
    console.log(this.props.employees);
  }

  setImage(file, type) {
    if (type === 'edit') {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, newImage: file },
      }));
      console.log('updating image');
    } else {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, image: file },
      }));
    }
  }

  openModal(i, employee, type) {
    if (type === 'edit') {
      this.setState((prevState) => ({
        open: true,
        index: i,
        employee: {
          ...prevState.employee,
          name: employee.name,
          email: employee.email,
          id: employee.id,
          image: employee.image,
          is_active: employee.is_active.toString(),
          is_admin: employee.is_admin.toString(),
        },
      }));
    } else {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, name: employee, id: i },
        deleteOpen: true,
      }));
    }
  }

  closeModal(type) {
    if (type === 'edit') {
      this.setState((prevState) => ({
        open: false,
        index: '',
        employee: {
          ...prevState.employee,
          name: '',
          email: '',
          id: '',
          image: '',
          newImage: '',
          is_active: 'true',
          is_admin: 'false',
        },
      }));
      console.log('closing modal');
    } else {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, name: '', id: '' },
        deleteOpen: false,
      }));
    }
  }

  updateContent(e, type) {
    let valid;
    if (type === 'name') {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, name: e },
      }));
    } else if (type === 'email') {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, email: e },
      }));
    }
    if (type === 'email') {
      valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e);
      console.log(valid)
    } else {
      valid = e.length > 0;
    }
    if (!valid) {
      if (type === 'name') {
        this.setState({
          nameHelper: 'Please enter an employee name.',
        });
      } else {
        this.setState({
          emailHelper: 'Please enter a valid email employee email.',
        });
      }
    } else {
      this.setState({
        nameHelper: '',
        emailHelper: '',
      });
    }
    if (type === 'admin') {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, is_admin: e },
      }));
    }
    if (type === 'active') {
      this.setState((prevState) => ({
        employee: { ...prevState.employee, is_active: e },
      }));
    }
  }

  naturalCompare = (a, b) => {
    var ax = [],
      bx = [];

    a.name.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
      ax.push([$1 || Infinity, $2 || '']);
    });
    b.name.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
      bx.push([$1 || Infinity, $2 || '']);
    });

    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }

    return ax.length - bx.length;
  };

  addEmployee() {
    const formData = new FormData();
    formData.append('name', this.state.employee.name);
    formData.append('email', this.state.employee.email);
    formData.append('is_admin', this.state.employee.is_admin);
    formData.append('is_active', this.state.employee.is_active);
    formData.append('image', this.state.employee.image);
    this.props.addEmployee(
      formData,
      this.props.token,
      this.props.facilityId,
      this.props.user.id
    );
    this.setState((prevState) => ({
      employee: {
        ...prevState,
        name: '',
        email: '',
        image: '',
        is_admin: 'false',
        id: '',
      },
    }));
  }

  editEmployee() {
    console.log('state user');
    console.log(this.props.user);

    console.log('employees');
    console.log(this.props.employees);
    const formData = new FormData();
    formData.append('name', this.state.employee.name);
    formData.append('email', this.state.employee.email);
    formData.append('is_admin', this.state.employee.is_admin);
    formData.append('is_active', this.state.employee.is_active);
    if (this.state.employee.newImage) {
      formData.append('image', this.state.employee.newImage);
    }
    this.props.editEmployee(
      formData,
      this.state.employee.id,
      this.props.token,
      this.props.user.id,
      this.props.facilityId
    );
    this.closeModal('edit');
  }

  deleteEmployee() {
    this.props.deleteEmployee(
      this.state.employee.id,
      this.props.token,
      this.props.user.id,
      this.props.facilityId
    );
    this.closeModal('delete');
  }

  render() {
    const { classes } = this.props;
    const label = this.state.employee.image
      ? this.state.employee.image.name
      : 'Upload Image Here';
    let employeeMap = null;
    if (this.props.employees) {
      employeeMap = (
        <div>
          {this.props.employees
            .filter((employee) => {
              return employee.id !== this.props.user.id;
            })
            .sort(this.naturalCompare)
            .map((employee, i) => {
              return (
                <React.Fragment key={employee.id}>
                  <Grid
                    container
                    spacing={3}
                    className={classes.buttonContainer}
                    key={employee.id}
                  >
                    <Grid
                      className={classes.mobile}
                      item
                      xs={12}
                      sm={6}
                      key={employee.id}
                    >
                      <Typography
                        color="secondary"
                        variant="h4"
                        style={{ fontWeight: 700 }}
                        className={classes.margin}
                      >
                        {employee.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.mobile}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        color="secondary"
                        onClick={() => this.openModal(i, employee, 'edit')}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.button}
                        color="secondary"
                        onClick={() =>
                          this.openModal(employee.id, employee.name, 'delete')
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
            update={() => this.editEmployee()}
            employee={this.state.employee}
            component={this.props.employees}
            index={this.state.index}
            type={'Employee'}
            emailHelper={this.state.emailHelper}
            nameHelper={this.state.nameHelper}
          />

          <DeleteModal
            deleteOpen={this.state.deleteOpen}
            close={() => this.closeModal()}
            name={this.state.employee.name}
            delete={(e) => this.deleteEmployee()}
            type={'Employee'}
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <SnackBar
          styles={{ display: 'flex', justifyContent: 'center' }}
          open={
            this.props.employeeError !== null &&
            this.props.employeeError.length !== 0
              ? true
              : false
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={this.props.employeeError}
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
            <Typography className={classes.title}>Add an Employee</Typography>
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
                label="Employee Name"
                value={this.state.employee.name}
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
                label="Employee Email"
                value={this.state.employee.email}
              ></TextField>
            </Grid>
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
                    value={this.state.employee.is_admin}
                    name="admin"
                    onChange={(e) =>
                      this.updateContent(e.target.value, 'admin')
                    }
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
            <Grid item xs={12} className={classes.imagePicker}>
              <StyledDropZone
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
                onClick={() => this.addEmployee()}
                variant="contained"
                color="secondary"
                className={classes.button2}
              >
                Add Employee
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Typography className={classes.title}>Current Employees</Typography>
        <Typography className={classes.footNote}>
          **Please use User Profile if you wish to update your own information**
        </Typography>
        <hr className={classes.divMargin}></hr>
        {employeeMap}
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
    employees: state.employeeReducer.employees,
    employeeError: state.employeeReducer.employeeError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: (token, facility, user) =>
      dispatch(getEmployees(token, facility, user)),
    addEmployee: (employee, token, facility, user) =>
      dispatch(addEmployee(employee, token, facility, user)),
    editEmployee: (employee, id, token, user, facility) =>
      dispatch(editEmployee(employee, id, token, user, facility)),
    clearError: () => dispatch({ type: 'CLEAR_EMPLOYEE_ERROR' }),
    deleteEmployee: (id, token, user, facility) =>
      dispatch(deleteEmployee(id, token, user, facility)),
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeAdmin)
);
