import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import People from '@material-ui/icons/People'
import Archive from '@material-ui/icons/Archive'
import School from '@material-ui/icons/School'


import './SideMenu.css'

const styles = {
  list: {
    width: 300,
   
   },
  links: {
    textDecoration: "none",   
    color:  "#FF8C00",
    '&:hover': {
      color: "#00FFFF"
    },
    '&:focus': {
      color: "#00FFFF"
    }
    },
 
  menuHeader: {
    paddingLeft: "100px",
    color: "#FF8C00"
  },
  icons: {
    color: "#00FFFF"
  } 
  
};
class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
  handleClick(item) {
    this.setState(prevState => ({ [item]: !prevState[item] }));
  }
  // if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
  handler(children) {   
    const { classes } = this.props;
    const { state } = this;    
    return children.map(subOption => {
      let icon = <People/>
      if(subOption.icon === 'Archive') {
        icon = <Archive/>
      }
      else if(subOption.icon === 'School') {
        icon = <School />
      }
      if (!subOption.children) {
        return (
          <div key={subOption.name} >
            <ListItem button key={subOption.name} >
        {icon}
              <Link to={subOption.url} className= {classes.links} onClick={this.props.drawerClickHandler}>
                <ListItemText inset primary={subOption.name} />
              </Link>
            </ListItem>
          </div>
        );
      }
      return (
        <div key={subOption.name}>
          <ListItem button onClick={() => this.handleClick(subOption.name)}>
            {icon}
            <ListItemText className= {classes.links} inset primary={subOption.name} />
            {state[subOption.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={state[subOption.name]} timeout="auto" unmountOnExit>
            {this.handler(subOption.children)}
          </Collapse>
        </div>
      );
    });
  }

  isStateOpen = () => {
    console.log("passed drawer state" + this.props.show)
  }
  render() {
   
    const { classes} = this.props;
    return (
      <div className={classes.list}>
        <Drawer
         variant="persistent"
          anchor="left"
          open ={this.props.show}
         
          classes={{ paper: classes.list}}
        >
          <div>
            <List>
              <ListItem key="menuHeading" divider disableGutters>
               
                <ListItemText 
                  className={classes.menuHeader}
                  inset
                  primary="Menu"
                />
              </ListItem>
              {this.handler(this.props.menuItems.data)}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default withStyles(styles)(MenuBar);