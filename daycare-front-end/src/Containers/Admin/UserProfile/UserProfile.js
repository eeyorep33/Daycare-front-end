
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '../../../Components/Modals/EditModal';
import Button from '@material-ui/core/Button';
import noImage from '../../../images/noImage.png'
import Typography from '@material-ui/core/Typography';
import styles from './UserProfileStyles'
import { getUser } from '../../../Actions/ApplicationActions'





class UserProfile extends Component {

    state= {
        user: {
          name: '',
          email: '',
          is_admin: '',
          is_active: '',        
          image: '',
          newImage: '',
          id: ''
          
        },
        
        nameHelper: '',
        emailHelper: '',
        open: false,
        deleteOpen: false,
        index: ''
      }
    
      componentDidMount() {
        localStorage.setItem('route', '/user/profile');    
        
       
       
      }

    render() {
        if(this.state.user.name === '') {
            this.props.getUser(localStorage.getItem("userId")) 
            if(this.props.user) {
               this.setState(prevState => ({
                   user: {...prevState.user, name: this.props.user.name, email: this.props.user.email,
                   is_admin: this.props.user.is_admin, is_active: this.props.user.is_active, id: this.props.user.id,
               image: this.props.user.image}
               })) 
        }
     
        }
        const { classes } = this.props;
        let image;
        let displayImage =(<Grid item xs={12} sm={3} className={classes.radioContainer}><img className={classes.noImage}src={noImage} alt="None"/></Grid>)
        if(this.props.user) {
            if(this.state.user.image !== null && this.state.user.image !== '') {
                image = "http://localhost:8080/" + this.state.user.image
                displayImage =(<Grid item xs={12} sm={3} className={classes.radioContainer}><img className={classes.displayImage}src={image} alt="None"/></Grid>)
               }
        }
        
           let profile =   (<React.Fragment>
            <Grid item sm={3} xs={12}
             className={classes.imageContainer}>   
              {displayImage}            
              </Grid>
              <Grid   container item xs = {12} sm={8}>
          <Grid item xs={12} className={classes.currentInfo}>
            <Typography>Name:&nbsp;   {this.state.user.name}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.currentInfo}>
            <Typography>Email:&nbsp;   {this.state.user.email}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.currentInfo}>
            <Typography>Is Administrator: &nbsp;  {this.state.user.is_admin}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.currentInfo}>
            <Typography>Is Active: &nbsp;   {this.state.user.is_active}</Typography>
          </Grid>
              </Grid>
              </React.Fragment>)
        
        return (
<React.Fragment>
  
{profile}
</React.Fragment>
       
        )
    }
}

const mapStateToProps = state => {
    return {    
         isAuth: state.appReducer.isAuth,
        token: state.appReducer.token,
        user: state.appReducer.user,
         facilityId: state.appReducer.facilityId,     
        facility: state.appReducer.facility
    }
    } 
    
    const mapDispatchToProps = dispatch => {
    
      return {      
     getUser: (id) => dispatch(getUser(id))
    
      }
    }

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(UserProfile)
)