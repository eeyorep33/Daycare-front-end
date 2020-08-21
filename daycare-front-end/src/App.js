import React, { Component } from 'react';
import MenuBar from './Components/Menu/SideMenu';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './Containers/Login/Login';
import './index.css';
import Signup from './Containers/Signup/Signup';
import Announcements from './Containers/Home/Announcements';
import ClassAdmin from './Containers/Admin/Classroom/ClassroomAdmin';
import AnnounceAdmin from './Containers/Admin/Announcements/AnnouncementsAdmin'
import EmployeeAdmin from './Containers/Admin/Employee/EmployeeAdmin'
import FacilityAdmin from './Containers/Admin/Facility/FacilityAdmin'
import UserProfile from './Containers/Admin/UserProfile/UserProfile'
import Header from './Components/NavBar/toolbar';
import { ThemeProvider } from '@material-ui/styles';
import theme from './util/Theme'
import { connect } from 'react-redux';
import axios from 'axios';
import {
  getMenu,
  getAuth,
  checkAuth,
  clearError,
  setError,
} from './Actions/ApplicationActions';

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('route') !== null) {
      if (localStorage.getItem('route') !== '/') {
        this.props.history.replace(localStorage.getItem('route'));
      }
    }

    localStorage.setItem('route', '/');
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    this.props.checkAuth();
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
    this.props.getSideMenuItems();
  }

  logoutHandler = () => {
    this.props.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('facilityId');
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    const auth = { userName: authData.userName, password: authData.password };
    this.props.login(auth); 
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    this.setAutoLogout(remainingMilliseconds);
  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    const facility = {
      email: authData.facilityEmail,
      password: authData.password,
      name: authData.facilityName,
      adminName: authData.adminName,
      adminEmail: authData.adminEmail,
      facilityEmail: authData.facilityEmail,
      userName: authData.userName,
    };
    axios
      .post('http://localhost:8080/signup', facility, {
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
        return res.json();
      })

      .catch((err) => {
        this.props.setError(err.response.data.message);
      });
  };

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  drawerToggleClickHandler = () => {
    if (this.props.sideDrawerOpen) {
      this.props.closeMenu();
    } else this.props.openMenu();
  };

  backdropClickHandler = () => {
    this.props.closeMenu();
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
         {/* // <Redirect to="/" /> */}
        </Switch>
      );
    }

    let menu = null;
    if (this.props.isAuth && this.props.menuItems) {
      menu = (
        <MenuBar
          show={this.props.sideDrawerOpen}
          drawerClickHandler={this.drawerToggleClickHandler}
          menuItems={this.props.menuItems}
        
        />
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <Header
          isAuth={this.props.isAuth}
          open={this.drawerToggleClickHandler}
          logout={this.logoutHandler}
          user={this.props.user}
        />
        {menu}
        {/* {backdrop} */}
        {routes}
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // classrooms: state.classroomReducer.classrooms,
    menuItems: state.appReducer.menuItems,
    sideDrawerOpen: state.appReducer.sideDrawerOpen,
    isAuth: state.appReducer.isAuth,
    token: state.appReducer.token,
    user: state.appReducer.user,
    facilityId: state.appReducer.facilityId,
    authLoading: state.appReducer.authLoading,
    error: state.appReducer.error,
    classError: state.classroomReducer.classError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSideMenuItems: () => dispatch(getMenu()),
    login: (auth) => dispatch(getAuth(auth)),
    openMenu: () => dispatch({ type: 'OPEN_MENU' }),
    closeMenu: () => dispatch({ type: 'CLOSE_MENU' }),
    checkAuth: () =>
      dispatch({
        type: 'CHECK_AUTH',
        values: {
          isAuth: true,
          token: localStorage.getItem('token'),
          facilityId: localStorage.getItem('facilityId'),
        },
      }),
    logout: () => dispatch({ type: 'LOG_OUT' }),
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
    setError: (error) => dispatch({ type: 'SET_ERROR', error: error }),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
