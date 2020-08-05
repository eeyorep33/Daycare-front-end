import React, { Component } from 'react';
import MenuBar from './Components/Menu/SideMenu'
import { StylesProvider } from '@material-ui/styles'
import NavBar from './Components/NavBar/NavBar'
import Backdrop from './Components/Backdrop/Backdrop';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './Containers/Login/Login'
import "./index.css"
import Signup from './Containers/Signup/Signup'
import Announcements from './Containers/Home/Announcements';
import ClassAdmin from './Containers/Admin/Classroom/ClassroomAdmin'
class App extends Component {
  state= {
    sideDrawerOpen: false,
    isAuth: false,
    token: null,
    userId: null,
    facilityId: null,
    authLoading: false,   
    menuItems: null
   

  };

  componentDidMount() {
    console.log("app mounting")
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
    const facilityId = localStorage.getItem('facilityId')
    this.getMenuItems(facilityId)
   
  
  }


getMenuItems = (facilityId) => {  
  fetch('http://localhost:8080/menu/' + facilityId)
  .then(res => {
    if (res.status !== 200) {
      throw new Error('Failed to fetch menu.');
    }
    return res.json();
  })
  .then(resData => {        
    this.setState({
      menuItems: resData.menuItems     
    });
  })
  .catch(this.catchError);
}

classroomHandler(mode) {
if(mode === "add") {
  fetch('http://localhost:8080/classroom')
}
}


  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  loginHandler = (event, authData) => {
    event.preventDefault();   
    this.setState({ authLoading: true });    
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: authData.userName,
        password: authData.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {                      
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,          
          userId: resData.id,
          facilityId: resData.facilityId
        });
        this.getMenuItems(resData.facilityId); 
        //this.getAnnouncements(resData.facilityId)            
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.id);
        localStorage.setItem('facilityId', resData.facilityId)
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);       
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };


  signupHandler = (event, authData) => {
    event.preventDefault();   
    this.setState({ authLoading: true });
    fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.signupForm.facilityEmail.value,
        password: authData.signupForm.adminPassword.value,
        name: authData.signupForm.facilityName.value,
        adminName: authData.signupForm.adminName.value,
        adminEmail: authData.signupForm.adminEmail.value,
        userName: authData.signupForm.userName.value
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Creating a user failed!');
        }
        return res.json();
      })
      .then(resData => {       
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace('/');
      })
      .catch(err => {       
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };


  drawerToggleClickHandler = () => {
    this.setState((prevState)=> {     
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler =  () => {   
    this.setState({sideDrawerOpen: false})    
  }
  render() {
    let routes = (
      <Switch>
      <Route
        path="/"
        exact
        render={props => (
          <Login
            {...props}
            onLogin={this.loginHandler}
            loading={this.state.authLoading}
          />
        )}
      />
      <Route
        path="/signup"
        exact
        render={props => (
          <Signup
            {...props}
            onSignup={this.signupHandler}
            loading={this.state.authLoading}
          />
        )}
      />
      <Redirect to="/" />
    </Switch>
    )  
    if(this.state.isAuth) {
      console.log(this.state.isAuth)
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Announcements userId={this.state.userId} token={this.state.token} facility={this.state.facilityId}/>
            )}
          />        
          
          <Route
            path="/classroom/add"
            
            render={props => (
              <ClassAdmin mode={"add"} loading = {this.state.loading} token={this.state.token}/>
            )}
          />
          <Redirect to="/" />
        </Switch>
      )
    }
    let backdrop = null;
    if(this.state.sideDrawerOpen) {      
      backdrop = <Backdrop click={this.backdropClickHandler}/>
    }
    let menu = null;
    if(this.state.isAuth && this.state.menuItems) {    
      menu = <MenuBar show= {this.state.sideDrawerOpen} drawerClickHandler = {this.drawerToggleClickHandler} menuItems= {this.state.menuItems}/>       
    }
    return (
      <StylesProvider injectFirst>
<NavBar drawerClickHandler = {this.drawerToggleClickHandler} isAuth= {this.state.isAuth}/>  

{menu}   
{backdrop}
   {routes}
    </StylesProvider> 
    )
  }
}
export default withRouter(App);