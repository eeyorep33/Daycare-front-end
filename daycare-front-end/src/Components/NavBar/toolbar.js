import React from 'react';
import AppBar from '@material-ui/core/AppBar/';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles'
import orangeHand from '../../images/orange_hand.png'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em"
},
logo: {
    height: "6em"
},
root: {
    flexGrow: 1,
  },
  pixel: {
imageRendering: "pixelated"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: "1em"
 
  },
  title: {
    flexGrow: 1,
  },
  button: {
     fontSize: "2rem",    
     fontWeight: 800,
     [theme.breakpoints.down("sm")]: {
        minWidth: 50,
        fontSize: "1.5rem"
       
      }
  },
  avatar: {
      marginLeft: ".5em",
      marginRight: ".5em",
    width: "5rem",
    height: "5rem"
  }
}))

const Header = props => {
    const classes = useStyles();
    let image =orangeHand
    try {
       let user =  JSON.parse(localStorage.getItem("user"))
       if(user) {
         let  userImage = user.image
           image = "http://localhost:8080/" + userImage
       }
    } catch(err) {
console.log(err)
    }
   

    
    
     let toolbar = ( <React.Fragment>
        <AppBar>
            <ToolBar disableGutters>
               <img src = {orangeHand} style={{height: 56, width: 56}} alt = "Hand tree"/>

            </ToolBar>
        </AppBar>
        <div className = {classes.toolbarMargin}/>
        </React.Fragment>)
    if(props.isAuth) {
        toolbar = ( <React.Fragment>
            <AppBar>
                <ToolBar disableGutters>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.open}>
            <MenuIcon style={{fontSize: 30}}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
             <img src = {orangeHand} style={{height: 50, width: 50}} alt = "Hand tree"/>
          </Typography>                  
                 <Button onClick = {props.logout} className={classes.button} color="secondary">Logout</Button>  
                 <Link to={'/user/profile'}>  <Avatar className={classes.avatar} alt="hand" src={image}></Avatar></Link>
               
                </ToolBar>
            </AppBar>
            <div className = {classes.toolbarMargin}/>
            </React.Fragment>)
    }
    return (
        <React.Fragment>

{toolbar}
        </React.Fragment>
    )   
}

export default Header;