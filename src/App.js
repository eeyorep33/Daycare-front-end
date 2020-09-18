import React, { Component } from 'react';
import MenuBar from './Components/Menu/SideMenu';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './Containers/Login/Login';
import './index.css';
import Signup from './Containers/Signup/Signup';
import Announcements from './Containers/Home/Announcements';
import ClassAdmin from './Containers/Admin/Classroom/ClassroomAdmin';
import AnnounceAdmin from './Containers/Admin/Announcements/AnnouncementsAdmin';
import EmployeeAdmin from './Containers/Admin/Employee/EmployeeAdmin';
import StudentAdmin from './Containers/Admin/Student/StudentAdmin';
import FacilityAdmin from './Containers/Admin/Facility/FacilityAdmin';
import UserProfile from './Containers/Admin/UserProfile/UserProfile';
import Archive from './Containers/Archive/Archive';
import Report from './Containers/Report/Report';
import ReportArchive from './Containers/Archive/ReportArchive';
import ReportList from './Containers/Archive/ReportList';
import Classroom from './Containers/Classrooms/Classroom';
import Header from './Components/NavBar/toolbar';
import { ThemeProvider } from '@material-ui/styles';
import theme from './util/Theme';
import { connect } from 'react-redux';
import axios from 'axios';
import { getMenu, getAuth } from './Actions/ApplicationActions';
import IdleTimer from 'react-idle-timer';

class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
  }
  state = {
    sideDrawerOpen: false,
  };
  componentDidMount() {
   
    if (!this.props.token || !this.props.expiryDate) {
      return;
    }
    if (new Date(this.props.expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    this.props.getSideMenuItems(
      this.props.facilityId,
      this.props.token,
      this.props.user.id
    );
  }

  logoutHandler = () => {
        this.props.logout();
    localStorage.removeItem('persist:root');
  
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    const auth = { userName: authData.userName, password: authData.password };
    this.props.login(auth);

  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    const facility = {
      email: authData.facilityEmail,
      name: authData.facilityName,
      adminName: authData.adminName,
      adminEmail: authData.adminEmail,
    };
    axios
      .post( 'https://helping-hand-node.herokuapp.com/signup' 
      || "http://localhost:8080/signup", facility, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.status === 303) {
          this.props.setError(res.data.message);
        }
        if (res.status === 201) {
          this.props.history.replace('/');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Enrollment failed!');
        }
      })

      .catch((err) => {
        this.props.setError(err);
      });
  };

  handleOnIdle(event) {
    if (this.props.isAuth) {
      this.logoutHandler();
    }
    console.log('user is idle', event);
    console.log('last active', this.idleTimer.getLastActiveTime());
  }
 
  drawerToggleClickHandler = () => {
    this.setState({
      sideDrawerOpen: !this.state.sideDrawerOpen,
    });
  };

  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <Login
              {...props}
              onLogin={this.loginHandler}
              loading={this.props.authLoading}
              error={this.props.error}
              clearError={this.props.clearError}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={(props) => (
            <Signup
              {...props}
              error={this.props.error}
              clearError={this.props.clearError}
              onSignup={this.signupHandler}
              loading={this.props.authLoading}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Announcements
                {...props}
                token={this.props.token}
                facility={this.props.facilityId}
              />
            )}
          />
          <Route
            path="/admin/student"
            exact
            render={(props) => (
              <StudentAdmin
                {...props}
                token={this.props.token}
                facility={this.props.facilityId}
              />
            )}
          />
          <Route
            exact
            path="/admin/classrooms"
            render={(props) => (
              <ClassAdmin
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/user/profile"
            render={(props) => (
              <UserProfile
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/admin/announcements"
            render={(props) => (
              <AnnounceAdmin
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/admin/facility"
            render={(props) => (
              <FacilityAdmin
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/admin/employee"
            render={(props) => (
              <EmployeeAdmin
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/classroom/:id"
            render={(props) => (
              <Classroom
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/report/archive"
            render={(props) => (
              <Archive
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/admin/employee"
            render={(props) => (
              <EmployeeAdmin
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/report/list/:id"
            render={(props) => (
              <ReportList
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/report/:id"
            render={(props) => (
              <Report
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />
          <Route
            exact
            path="/report/archive/:id"
            render={(props) => (
              <ReportArchive
                loading={this.props.loading}
                {...props}
                token={this.props.token}
              />
            )}
          />

          {/* // <Redirect to="/" /> */}
        </Switch>
      );
    }

    let menu = null;
    if (this.props.isAuth && this.props.menuItems) {
      menu = (
        <MenuBar
          show={this.state.sideDrawerOpen}
          drawerClickHandler={this.drawerToggleClickHandler}
          menuItems={this.props.menuItems}
        />
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 60 * 15}
          onIdle={() => this.handleOnIdle()}
          debounce={250}
        />
        <Header
          isAuth={this.props.isAuth}
          open={this.drawerToggleClickHandler}
          logout={this.logoutHandler}
          user={this.props.user}
        />
        {menu}
        {routes}
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.appReducer.menuItems,
    isAuth: state.appReducer.isAuth,
    token: state.appReducer.token,
    user: state.appReducer.user,
    facilityId: state.appReducer.facilityId,
    authLoading: state.appReducer.authLoading,
    error: state.appReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSideMenuItems: (facility, token, user) =>
      dispatch(getMenu(facility, token, user)),
    login: (auth) => dispatch(getAuth(auth)),
    logout: () => dispatch({ type: 'LOG_OUT' }),
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
    setError: (error) => dispatch({ type: 'SET_ERROR', error: error }),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
