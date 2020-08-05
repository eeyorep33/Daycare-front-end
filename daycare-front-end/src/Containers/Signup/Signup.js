import React, { Component } from 'react';

import Input from '../../Components/Form/Input';
import Button from '../../Components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from '../Login/Auth';
import hands from '../../images/hands.jpg';

class Signup extends Component {
  state = {
    signupForm: {
     facilityEmail: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email]
      },
     
      facilityName: {
        value: '',
        valid: false,
        touched: false,
        validators: [required]
      },
     adminName:  {
      value: '',
      valid: false,
      touched: false,
      validators: [required]
     },
     userName:  {
      value: '',
      valid: false,
      touched: false,
      validators: [required]
     },
     adminEmail: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, email]
    },
    adminPassword: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })]
    },
      formIsValid: false
    }
  };

  inputChangeHandler = (input, value) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true
          }
        }
      };
    });
  };

  render() {
    return (
      <Auth formType= {"sign-form"}>
         <img className="hands" src={hands} alt="hands" />
        <form onSubmit={e => this.props.onSignup(e, this.state)}>
        <Input
            id="facilityName"
            label="Facility Name"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'facilityName')}
            value={this.state.signupForm['facilityName'].value}
            valid={this.state.signupForm['facilityName'].valid}
            touched={this.state.signupForm['facilityName'].touched}
          />   
         
         
          <Input
            id="facilityEmail"
            label="Facility E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'facilityEmail')}
            value={this.state.signupForm['facilityEmail'].value}
            valid={this.state.signupForm['facilityEmail'].valid}
            touched={this.state.signupForm['facilityEmail'].touched}
          />
         <hr></hr>
          <Input
            id="adminName"
            label="Administrator Name"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'adminName')}
            value={this.state.signupForm['adminName'].value}
            valid={this.state.signupForm['adminName'].valid}
            touched={this.state.signupForm['adminName'].touched}
          />
           <Input
            id="adminEmail"
            label="Administrator E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'adminEmail')}
            value={this.state.signupForm['adminEmail'].value}
            valid={this.state.signupForm['adminEmail'].valid}
            touched={this.state.signupForm['adminEmail'].touched}
          />
           <Input
            id="userName"
            label="User Name"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'userName')}
            value={this.state.signupForm['userName'].value}
            valid={this.state.signupForm['userName'].valid}
            touched={this.state.signupForm['userName'].touched}
          />
           <Input
            id="adminPassword"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'adminPassword')}
            value={this.state.signupForm['adminPassword'].value}
            valid={this.state.signupForm['adminPassword'].valid}
            touched={this.state.signupForm['adminPassword'].touched}
          />
          <Button design="raised" type="submit" loading={this.props.loading}>
            Signup
          </Button>
        </form>
      </Auth>
    );
  }
}

export default Signup;
