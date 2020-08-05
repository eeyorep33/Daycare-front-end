import React from 'react';

import './NavBar.css'
import NavBarButton from './NavBarButton'


const toolbar = props => {
    if(!props.isAuth) {
        return ( <header className="toolbar"> 
        <nav className="toolbar__navigation">         
                           
        </nav>
    </header>
    )  
    }
    return ( <header className="toolbar"> 
    <nav className="toolbar__navigation">
        <div><NavBarButton click ={props.drawerClickHandler} /></div>
        <div className="toolbar__logo"><a href="/">The logo</a></div>
        <div className= "spacer"></div>
        <div className="toolbar_navigation-items">
            <ul>
            <li><a href="/">Log Out</a></li> 
            <li><a  href="/">Profile</a></li> 
            </ul>
        </div>
    </nav>
</header>
)
}
   

export default toolbar;