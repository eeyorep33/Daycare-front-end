import React from 'react';
import './NavBarButton.css'

const drawerToggleButton = props => (
<button className="toggle-button" onClick= {props.click}>
    <div className="toggle_button_line"></div>
    <div className="toggle_button_line"></div>
    <div className="toggle_button_line"></div>    
</button>
);

export default drawerToggleButton;