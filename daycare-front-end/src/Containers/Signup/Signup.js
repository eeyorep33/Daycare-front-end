import React, { useState, useEffect  } from 'react';

import Button from '@material-ui/core/Button';
import useStyles from './signupStyles'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import SnackBar from '@material-ui/core/Snackbar'





const Signup = props =>{ 
  const classes = useStyles();
  const [facilityEmail, setFacilityEmail] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [facilityEmailHelper, setFacilityEmailHelper] = useState("");
  const [facilityNameHelper, setFacilityNameHelper] = useState("");
  const [adminNameHelper, setAdminNameHelper] = useState("");
  const [adminEmailHelper, setAdminEmailHelper] = useState("");
  const [userNameHelper, setUserNameHelper] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [alert, setAlert] = useState({open:false, message: '', backgroundColor: ''})

  useEffect(() => {
    if(props.error !== null) {
      setAlert({...alert, open:true, message: props.error, backgroundColor: "orange"})
      props.clearError()
     
    }
    })
  
  const onChange = event => {    
    let valid;
    switch (event.target.id) {
      case 'userName': 
      setUserName(event.target.value)    
  valid = event.target.value.length >= 5 ; 
     if(!valid) {
  setUserNameHelper(" User name must be at least 5 characters")
     } else {
       setUserNameHelper("")
     }
     break;
     case "password": 
     setPassword(event.target.value)
     valid = event.target.value.length >= 7 ;     
     if(!valid) {
  setPasswordHelper("Password must be at least 7 characters")
     } else {
       setPasswordHelper("")
     }
     break;

     case "facilityName": 
     setFacilityName(event.target.value)
     valid = event.target.value.length >= 3;   
     if(!valid) {
  setFacilityNameHelper("Please enter a valid Facility Name")
     } else {
       setFacilityNameHelper("")
     }
     break;

     case "facilityEmail": 
     setFacilityEmail(event.target.value)
     valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)    
     if(!valid) {
  setFacilityEmailHelper("Please enter a valid Email")
     } else {
       setFacilityEmailHelper("")
     }
     break;

     case "adminName": 
     setAdminName(event.target.value)
     valid = event.target.value.length >= 2 ;     
     if(!valid) {
  setAdminNameHelper("Please enter a valid Name")
     } else {
       setAdminNameHelper("")
     }
     break;

     case "adminEmail": 
     setAdminEmail(event.target.value)
     valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)    
     if(!valid) {
  setAdminEmailHelper("Please enter a valid Email")
     } else {
       setAdminEmailHelper("")
     }
     break;
     default:
     break;
    }
  
  }
  
  
     return (
      
      <React.Fragment>
      <div className={classes.handsContainer}>
        <div className={classes.hands}/>
        </div>
        <SnackBar
      styles={{display: "flex", justifyContent: "center"}}
      open={alert.open} 
      anchorOrigin={{vertical: "top", horizontal: "center"}}
       message={alert.message}
        ContentProps={{style: {
        backgroundColor: alert.backgroundColor
      }}
    }
    onClose={() => setAlert({...alert, open: false})}
    autoHideDuration={4000}
      >

      </SnackBar>
        <Grid container 
className={classes.gridContainer}> 
<Grid container item
 direction="column" 
className={classes.formContainer} 
spacing={3} xs={9}>
<Grid item xs={12} 
className={classes.textContainer}>
 <TextField 
 variant="outlined" 
 className={classes.root}
 fullWidth
 onChange={onChange}
 id="facilityName"
 value={facilityName}
 error={facilityNameHelper.length !== 0}
 helperText= {facilityNameHelper}
 label="Facility Name" >
 </TextField>
 
</Grid>
<Grid item xs={12} 
className={classes.textContainer}>
 <TextField 
 variant="outlined" 
 className={classes.root}
 fullWidth
 onChange={onChange}
 id="facilityEmail"
 error={facilityEmailHelper.length !== 0}
 helperText= {facilityEmailHelper}
 value={facilityEmail}
 label="Facility Email" >
 </TextField>
 
</Grid>
<Grid item xs={12} className={classes.textContainer}>
  <TextField  className={classes.root}
   variant="outlined" 
   fullWidth   
     id="adminName"
     error={adminNameHelper.length !== 0}
     helperText= {adminNameHelper}
     value={adminName}
   onChange={onChange}
   label="Administrator Name" 
   
   ></TextField>
</Grid>
<Grid item xs={12} 
className={classes.textContainer}>
 <TextField 
 variant="outlined" 
 fullWidth
 onChange={onChange}
 className={classes.root}
 id="adminEmail"
 error={adminEmailHelper.length !== 0}
 helperText= {adminEmailHelper}
 value={adminEmail}
 label="Administator Email" >
 </TextField>
 
</Grid>
<Grid item xs={12} 
className={classes.textContainer}>
 <TextField 
 variant="outlined" 
 className={classes.root}
 fullWidth
 onChange={onChange}
 error={userNameHelper.length !== 0}
 helperText= {userNameHelper}
 id="userName"
 value={userName}
 label="User Name" >
 </TextField>
 
</Grid>
<Grid item xs={12} 
className={classes.textContainer}>
 <TextField 
 variant="outlined" 
 className={classes.root}
 fullWidth
 onChange={onChange}
 error={passwordHelper.length !== 0}
 helperText= {passwordHelper}
 id="password"
 value={password}
 label="Password" >
 </TextField>
 
</Grid>
<Grid item xs={12}>
<Button 
disabled={userName.length < 5 || password.length < 7 || adminName.length < 2 
||  adminEmailHelper.length > 0 || facilityEmailHelper.length > 0 || facilityNameHelper.length > 0}
type="submit" 
onClick={(e)=> {props.onSignup(e, {userName: userName, password: password, adminName: adminName, adminEmail: adminEmail,
facilityName: facilityName, facilityEmail: facilityEmail})}}
variant="contained"
 color="secondary" 
 className={classes.login}>
   Sign Up</Button>
</Grid>
</Grid>
</Grid>
        </React.Fragment>

  
    );
  }


export default Signup;
