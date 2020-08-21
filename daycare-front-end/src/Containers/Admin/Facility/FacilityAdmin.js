import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import styles from './FacilityAdminStyles';
import { getFacility, editFacility } from '../../../Actions/ApplicationActions'
import SnackBar from '@material-ui/core/Snackbar';

class FacilityAdmin extends Component {
  state = {
    alert: {
open: false,
message: ''
    },
   facility: {
     name:'', 
     email: '',
     id:''
   },
    nameHelper: '',
    emailHelper: ''
  };

  componentDidMount() {
    localStorage.setItem('route', '/admin/facility');    
        this.setState({facility: JSON.parse(localStorage.getItem("facility"))})  
        if(this.props.success !== null) {
          this.setState(prevState => ({
alert: {...prevState, open:true, message: this.props.success}
          }))
        }
        
        
      
  }

  

  updateContent(e, type) {    
    let valid; 
  if(type === "name") {
   this.setState(prevState => ({
     facility: {...prevState.facility, name: e}
   })) 
  } else {
    this.setState(prevState => ({
      facility: {...prevState.facility, email: e}
    })) 
  }
if(type === "email") {
    valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e) 
} else {
    valid = e.length > 0
}
if(!valid) {
    if(type === "name") {
        this.setState({
            nameHelper: "Please enter a Name for your facility."
          })
    } else {
        this.setState({
            emailHelper: "Please enter a valid email for your facility."
          })  
    }

} else {
  this.setState({
    nameHelper: "", emailHelper: ''
  })
}


  }

  editFacility() {
    let updatedFacility ={name: this.state.facility.name, email: this.state.facility.email}
    this.props.editFacility(updatedFacility, this.state.facility.id)
   
  }

  render() {
    const { classes } = this.props;

    
    return (
      <React.Fragment>
      <SnackBar
      styles={{display: "flex", justifyContent: "center"}}
      open={this.props.success !== null ? true :false}
      anchorOrigin={{vertical: "top", horizontal: "center"}}
       message={this.props.success}
        ContentProps={{style: {
        backgroundColor: 
        "orange"
      }}
    }
    onClose={() => this.props.clearSuccess()}
    autoHideDuration={4000}
      >

      </SnackBar>
     <Grid container  
className={classes.gridContainer}> 

<Grid container item
 direction="column" 
className={classes.formContainer} 
spacing={3} xs={9}>
  <Typography className={classes.title}>Update Facility Information</Typography>
<Grid item xs={12} 
className={classes.textContainer}>
  <TextField  
  className={classes.root} 
  variant="outlined" 
  fullWidth 
  error={this.state.nameHelper.length !== 0}
  id="facilityName"
  helperText= {this.state.nameHelper}
  onChange={e => this.updateContent(e.target.value, "name")} 
  label="Facility Name" 
  value={this.state.facility.name}>    
  </TextField>
 
</Grid>
<Grid item xs={12} className={classes.textContainer}>
  <TextField  className={classes.root}
   variant="outlined" 
   fullWidth 
   type="text"
   error={this.state.emailHelper.length !== 0}
   id="facilityEmail"
   helperText= {this.state.emailHelper}
   onChange={e => this.updateContent(e.target.value, "email")} 
   label="Facility Email" 
   value={this.state.facility.email}></TextField>
</Grid>
<Grid item xs={12}>
<Button 
 disabled={this.state.emailHelper.length !== 0}
type="submit" 
 onClick={()=> this.editFacility()}
variant="contained"
 color="secondary" 
 className={classes.button}>
   Save Changes</Button>
</Grid>
</Grid>
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
    success: state.appReducer.success
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getFacility: () => dispatch(getFacility()),
      editFacility: (facility, id) => dispatch(editFacility(facility, id)),
      clearSuccess: () => dispatch({type: "CLEAR_SUCCESS"})
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(FacilityAdmin)
);
