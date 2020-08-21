import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar'
import useStyles from './LoginInStyles'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'


const Login = props => {
const classes = useStyles();
const  [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [passwordHelper, setPasswordHelper] = useState('');
const [userNameHelper, setUserNameHelper] = useState('')
const [alert, setAlert] = useState({open:false, message: '', backgroundColor: ''})



useEffect(() => {
if(props.error !== null) {
  setAlert({...alert, open:true, message: props.error, backgroundColor: "orange"})
  props.clearError()
 
}
})

const onChange = event => { 
  console.log(event.target.id)
  let valid;
  switch (event.target.id) {
    case 'userName': 
    setUserName(event.target.value)    
valid = event.target.id.length >= 4 ;
console.log(valid)
   if(!valid) {
setUserNameHelper("Please enter a valid User name")
   } else {
     setUserNameHelper("")
   }
   break;
   case "password": 
   setPassword(event.target.value)
   valid = password.length >= 6 ;
   console.log(password.length)
   if(!valid) {
setPasswordHelper("Please enter a valid Password")
   } else {
     setPasswordHelper("")
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
  className={classes.root} 
  variant="outlined" 
  fullWidth 
  error={userNameHelper.length !== 0}
  id="userName"
  helperText= {userNameHelper}
  onChange={onChange} 
  label="User Name" 
  value={userName}>    
  </TextField>
 
</Grid>
<Grid item xs={12} className={classes.textContainer}>
  <TextField  className={classes.root}
   variant="outlined" 
   fullWidth 
   type="password"
   error={passwordHelper.length !== 0}
   id="password"
   helperText= {passwordHelper}
   onChange={onChange}
   label="Password" 
   value={password}></TextField>
</Grid>
<Grid item xs={12}>
<Button 
disabled={userName.length <= 4 || password.length <= 6}
type="submit" 
onClick={(e)=> {props.onLogin(e, {userName: userName, password: password})}}
variant="contained"
 color="secondary" 
 className={classes.login}>
   Login</Button>
</Grid>
</Grid>
</Grid>
<div  className={classes.signUpLink}>
<p>Don't have an Account? Click <a href="/signup">here</a> to enroll your facility.</p>
</div>
</React.Fragment>
)

}

export default Login;


