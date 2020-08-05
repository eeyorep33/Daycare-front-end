import React from 'react';
import './Auth.css'



const auth = props => <section className= {props.formType} >{props.children}</section>;

export default auth;