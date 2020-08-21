import React, { Component } from 'react'
import hands from '../../images/hands.jpg'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { getAnnouncements, getMenu,  getFacility  } from '../../Actions/ApplicationActions'
import styles from './AnnounceStyles'
import { Typography } from '@material-ui/core';


class Announcements extends Component {
 state= {
     announcements: null
 }
    componentDidMount() {    
      localStorage.setItem('route', "/")
        let facility = this.props.facility  
        if(facility ==null) {
            facility = localStorage.getItem('facilityId')
        }
        this.props.getSideMenuItems()  
        this.props.getAnnouncements()
        this.props.getFacility()
    
    }

    

    render() {      
       
      const { classes } = this.props;
       let announce = null
        if(this.props.announcements) {
            announce =  (<React.Fragment formType={"announcements"}>
            <img className={classes.hands} src={hands} alt="hands"/>
           <div className={classes.container}>           
              <h1 className = {classes.title}>Announcements</h1>             
              {this.props.announcements.map(announcement => {
              let date = new Date (announcement.createdAt)            
              const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
              const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
              let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
              if(da.substring(0,1) === "0") {
              da = da.substring(1,2)
              }
              let append = "";
              switch(da) {
                  case "1": append= "st";
                  break;
                  case "2": append = "nd";
                  break;
                  case "3": append = "rd";
                  break;
                  default: append = "th"
              }
              da = da + append;
              date = `${mo} ${da}, ${ye}`
              
           return (
               <div className = {classes.content}key={announcement.id}>
                   <Typography color="secondary" className={classes.date}>{date}</Typography>
                   <Typography>{announcement.content}</Typography>
               </div>
           )
              })}
           </div>
               </React.Fragment>)
        } else {         
            
            announce = (<React.Fragment formType={"announcements"}>
            <img className={classes.hands} src={hands} alt="hands"/>
   <div>    
      <h1 className = {classes.title}>Announcements</h1>
      </div>
      </React.Fragment>)
        }
        return (
            <React.Fragment>              
                
  {announce}
            </React.Fragment>
          
        )
        
};
}


const mapStateToProps = state => {
  return {
     menuItems: state.appReducer.menuItems,
       sideDrawerOpen: state.appReducer.sideDrawerOpen,
       isAuth: state.appReducer.isAuth,
      token: state.appReducer.token,
      user: state.appReducer.user,
       facilityId: state.appReducer.facilityId,
      authLoading: state.appReducer.authLoading,
      announcements: state.appReducer.announcements,
      error: state.appReducer.error,
      facility: state.appReducer.facility
  }
  } 
  
  const mapDispatchToProps = dispatch => {
  
    return {      
      getAnnouncements: () => dispatch(getAnnouncements()),
      getSideMenuItems: () => dispatch(getMenu()),
      getFacility: () => dispatch(getFacility())
  
    }
  }
  export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(Announcements)
)
