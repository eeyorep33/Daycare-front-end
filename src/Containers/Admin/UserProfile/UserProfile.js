import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import noImage from '../../../images/noImage.png';
import Typography from '@material-ui/core/Typography';
import styles from './UserProfileStyles';
import TextField from '@material-ui/core/TextField';
import { StyledDropZone } from 'react-drop-zone';
import { editUser, resetPassword } from '../../../Actions/ApplicationActions';

class UserProfile extends Component {
  state = {
    user: {
      name: '',
      email: '',
      is_admin: '',
      is_active: '',
      image: '',
      newImage: '',
      id: '',
      newName: '',
      newEmail: '',
      userName: '',
      oldPassword: '',
      newPassword: '',
    },

    oldPasswordHelper: '',
    newPasswordHelper: '',
    nameHelper: '',
    emailHelper: '',
    open: false,

    editPassword: false,
  };

  componentDidMount() {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        name: this.props.user.name,
        email: this.props.user.email,
        is_admin: this.props.user.is_admin,
        is_active: this.props.user.is_active,
        id: this.props.user.id,
        image: this.props.user.image,
        newName: this.props.user.name,
        newEmail: this.props.user.email,
        userName: this.props.user.userName,
      },
    }));
  }

  setImage(file, type) {
    if (type === 'edit') {
      this.setState((prevState) => ({
        user: { ...prevState.user, newImage: file },
      }));
      console.log('updating image');
    } else {
      this.setState((prevState) => ({
        user: { ...prevState.user, image: file },
      }));
    }
  }

  editProfile() {
    const formData = new FormData();
    formData.append('name', this.state.user.newName);
    formData.append('email', this.state.user.newEmail);
    if (this.state.user.newImage) {
      formData.append('image', this.state.user.newImage);
    }
    this.props.editUser(this.state.user.id, this.props.token, formData);
    this.setState({
      open: false,
    });
  }

  cancel() {
    this.setState((prevState) => ({
      open: false,
      editUserName: false,
      editPassword: false,
      user: {
        ...prevState.user,
        newName: this.props.user.name,
        email: this.props.user.email,
      },
    }));
  }

  updateContent(e, type) {
    let valid;
    if (type === 'name') {
      this.setState((prevState) => ({
        user: { ...prevState.user, newName: e },
      }));
    } else if (type === 'email') {
      this.setState((prevState) => ({
        user: { ...prevState.user, newEmail: e },
      }));
    } else if (type === 'oldPassword') {
      this.setState((prevState) => ({
        user: { ...prevState.user, oldPassword: e },
      }));
    } else if (type === 'newPassword') {
      this.setState((prevState) => ({
        user: { ...prevState.user, newPassword: e },
      }));
    }
    if (type === 'email') {
      valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e);
    } else if (type === 'userName') {
      valid = e.length >= 6;
    } else if (type === 'oldPassword' || type === 'newPassword') {
      valid = e.length >= 7;
    } else {
      valid = e.length >= 2;
    }
    if (!valid) {
      if (type === 'name') {
        this.setState({
          nameHelper: 'Please enter an employee name.',
        });
      } else if (type === 'oldPassword') {
        this.setState({
          oldPasswordHelper: 'Please enter a valid password.',
        });
      } else if (type === 'newPassword') {
        this.setState({
          newPasswordHelper: 'Password must be at least 7 characters long.',
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
        oldPasswordHelper: '',
        newPasswordHelper: '',
      });
    }
  }

  resetPassword() {
    let passwords = {
      password: this.state.user.oldPassword,
      newPassword: this.state.user.newPassword,
      userName: this.state.user.userName,
    };
    this.props.resetPassword(passwords, this.props.token, this.props.user.id);

    this.setState((prevState) => ({
      editPassword: false,
      user: { ...prevState.user, oldPassword: '', newPassword: '' },
    }));
  }

  render() {
    let label = this.state.user.newImage
      ? this.state.user.newImage.name
      : 'Upload Image Here';
    const { classes } = this.props;
    let image;
    let displayImage = (
      <Grid item xs={12} sm={2} className={classes.radioContainer}> 
        <img className={classes.noImage} src={noImage} alt="None" />
      </Grid>
    );
    if (this.props.user) {
      if (this.props.user.image !== null && this.props.user.image !== '') {
        image = 'https://helping-hand-node.herokuapp.com/' + this.props.user.image;
        displayImage = (
          <Grid item xs={12} sm={2} className={classes.radioContainer}>
            <img className={classes.displayImage} src={image} alt="None" />
          </Grid>
        );
      }
    }

    let profile = (
      <React.Fragment>
        <Grid item container>
          <Grid item container xs={12}>
            <Grid xs={12} className={classes.editButtons}>
              <Button
                disableRipple
                className={classes.editButton}
                onClick={() => this.setState({ open: true })}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid xs={12} className={classes.editButtons}>
              <Button
                disableRipple
                className={classes.editButton}
                onClick={() => this.setState({ editPassword: true })}
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
          <Grid item sm={2} xs={12} className={classes.imageContainer}>
            {displayImage}
          </Grid>

          <Grid style={{ alignItems: 'center' }} container item xs={12} sm={9}>
            <Grid item container sm={6}>
              <Grid item xs={12} className={classes.currentInfo}>
                <Typography>
                  <span className={classes.profileInfo}>Name:</span>&nbsp;{' '}
                  {this.props.user.name}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.currentInfo}>
                <Typography>
                  <span className={classes.profileInfo}>Email:</span>&nbsp;{' '}
                  {this.props.user.email}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.currentInfo}>
                <Typography>
                  <span className={classes.profileInfo}>Is Administrator:</span>{' '}
                  &nbsp; {this.props.user.is_admin ? 'Yes' : 'No'}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container sm={6}>
              <Grid item xs={12} className={classes.currentInfo}>
                <Typography>
                  <span className={classes.profileInfo}>Is Active:</span> &nbsp;{' '}
                  {this.props.user.is_active ? 'Yes' : 'No'}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.currentInfo}>
                <Typography>
                  <span className={classes.profileInfo}>User Name:</span> &nbsp;{' '}
                  {this.props.user.userName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.title}>User Profile</Typography>
          </Grid>
          {profile}
          {this.state.editPassword && (
            <React.Fragment>
              <Grid container spacing={2} className={classes.gridContainer}>
                <Grid
                  container
                  item
                  direction="column"
                  className={classes.formContainer}
                  spacing={3}
                  xs={9}
                >
                  <Grid item xs={12} className={classes.textContainer}>
                    <TextField
                      className={classes.root}
                      variant="outlined"
                      fullWidth
                      type="password"
                      error={this.state.oldPasswordHelper.length !== 0}
                      id="oldPassword"
                      helperText={this.state.oldPasswordHelper}
                      onChange={(e) =>
                        this.updateContent(e.target.value, 'oldPassword')
                      }
                      label="Old Password"
                      value={this.state.oldPassword}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} className={classes.textContainer}>
                    <TextField
                      className={classes.root}
                      variant="outlined"
                      fullWidth
                      type="password"
                      error={this.state.newPasswordHelper.length !== 0}
                      id="newPassword"
                      helperText={this.state.newPasswordHelper}
                      onChange={(e) =>
                        this.updateContent(e.target.value, 'newPassword')
                      }
                      label=" New Password"
                      value={this.state.newPassword}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.buttonContainer}>
                <Button
                  type="submit"
                  onClick={() => this.resetPassword()}
                  disabled={
                    this.state.oldPasswordHelper.length !== 0 &&
                    this.state.newPasswordHelper.length !== 0
                  }
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.cancel()}
                  color="secondary"
                >
                  Cancel
                </Button>
              </Grid>
            </React.Fragment>
          )}
          {this.state.open && (
            <React.Fragment>
              <Grid container spacing={2} className={classes.gridContainer}>
                <Grid
                  container
                  item
                  direction="column"
                  className={classes.formContainer}
                  spacing={3}
                  xs={9}
                >
                  <Grid item xs={12} className={classes.textContainer}>
                    <TextField
                      variant="outlined"
                      id="name"
                      type="text"
                      multiline
                      fullWidth
                      name="name"
                      value={this.state.user.newName}
                      className={classes.input}
                      onChange={(e) =>
                        this.updateContent(e.target.value, 'name')
                      }
                      error={this.state.nameHelper.length > 0}
                      helperText={this.state.nameHelper}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.textContainer}>
                    <TextField
                      variant="outlined"
                      id="email"
                      type="text"
                      name="email"
                      fullWidth
                      value={this.state.user.newEmail}
                      className={classes.input}
                      style={{ marginBottom: '10px' }}
                      onChange={(e) =>
                        this.updateContent(e.target.value, 'email')
                      } 
                      error={this.state.emailHelper.length > 0}
                      helperText={this.state.emailHelper} 
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.radioContainer}>
                    <StyledDropZone
                      className={classes.imagePicker}
                      children={label}
                      onDrop={(file, text) => this.setImage(file, 'edit')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.buttonContainer}>
                <Button
                  type="submit"
                  onClick={() => this.editProfile()}
                  disabled={this.state.nameHelper.length !== 0}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.cancel()}
                  color="secondary"
                >
                  Cancel
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
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
    facility: state.appReducer.facility,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (id, token, user) => dispatch(editUser(id, token, user)),
    resetPassword: (passwords, token, user) =>
      dispatch(resetPassword(passwords, token, user)),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(UserProfile)
);
