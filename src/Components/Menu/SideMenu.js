import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import People from '@material-ui/icons/People';
import Archive from '@material-ui/icons/Archive';
import School from '@material-ui/icons/School';
import Home from '@material-ui/icons/Home';
import styles from './SideMenuStyles'

import { Typography } from '@material-ui/core';


class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
  handleClick(item) {
    this.setState((prevState) => ({ [item]: !prevState[item] }));
  }

  // if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
  handler(children) {
    const { classes } = this.props;
    const { state } = this;
    return children.map((subOption) => {
      let icon = <People color="secondary" />;
      if (subOption.icon === 'Archive') {
        icon = <Archive color="secondary" />;
      } else if (subOption.icon === 'School') {
        icon = <School color="secondary" />;
      } else if (subOption.icon === 'Home') {
        icon = <Home color="secondary" />;
      }
      if (!subOption.children) {
        return (
          <div key={subOption.name}>
            <ListItem
              button
              key={subOption.name}
              component={Link}
              to={subOption.url}
              className={classes.links}
              onClick={this.props.drawerClickHandler}
            >
              {subOption.level === 1 ? icon : ''}

              <ListItemText
                inset
                primary={
                  <Typography className={classes.text} variant="h4">
                    {subOption.name}
                  </Typography>
                }
              />
            </ListItem>
          </div>
        );
      }
      return (
        <div key={subOption.name}>
          <ListItem button onClick={() => this.handleClick(subOption.name)}>
            {subOption.level === 1 ? icon : ''}
            <ListItemText
              className={classes.links}
              inset={true}
              primary={
                <Typography className={classes.text} variant="h4">
                  {subOption.name}
                </Typography>
              }
            />
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
    console.log('passed drawer state' + this.props.show);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          //  variant="persistent"
          anchor="left"
          open={this.props.show}
          onClose={this.props.drawerClickHandler}
          classes={{ paper: classes.list }}
        >
          <div>
            <List disablePadding>
              <ListItem
                style={{ backgroundColor: '#00FFFF' }}
                key="menuHeading"
                divider
                disableGutters
              >
                <ListItemText
                  className={classes.menuHeader}
                  // inset
                  // primary={<Typography className={classes.text}variant = "h4">Menu</Typography>}
                >
                  Menu
                </ListItemText>
              </ListItem>
              {this.props.menuItems && this.handler(this.props.menuItems)}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default withStyles(styles)(MenuBar);
