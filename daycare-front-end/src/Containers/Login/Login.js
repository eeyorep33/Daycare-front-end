import React, {Component} from 'react';
import Input from '../../Components/Form/Input';
import Auth from './Auth';
import { required, length } from '../../util/validators';
import hands from '../../images/hands.jpg';
import './Login.css'
import Button from '../../Components/Button/Button'




class Login extends Component {
    state = {
        loginForm: {
          userName: {
            value: '',
            valid: false,
            validators: [required]         
                    },
          password: {
            value: '',
            valid: false,
            validators: [required, length({ min: 5 })]          
          },
          formIsValid: false
        }
      };
    

      

      inputChangeHandler = (input, value) => {
        this.setState(prevState => {
          let isValid = true;          
          for (const validator of prevState.loginForm[input].validators) {
            isValid = isValid && validator(value);
          }
          const updatedForm = {
            ...prevState.loginForm,
            [input]: {
              ...prevState.loginForm[input],
              valid: isValid,
              value: value
            }
          };
          let formIsValid = true;
          for (const inputName in updatedForm) {
            formIsValid = formIsValid && updatedForm[inputName].valid;
          }
          return {
            loginForm: updatedForm,
            formIsValid: formIsValid
          };
        });
      };
    
 
    
      render() {
        
        return (
          <Auth formType ={"auth-form"}>
             <img className="hands" src={hands} alt="hands"/>
                 
            <form
              onSubmit={e =>
                this.props.onLogin(e, {                   
                  userName: this.state.loginForm.userName.value,
                  password: this.state.loginForm.password.value
                })
              }
            >
              <Input
                id="userName"
                label="User Name"
                type="text"
                control="input"
                onChange={this.inputChangeHandler}               
                value={this.state.loginForm['userName'].value}
                valid={this.state.loginForm['userName'].valid}
              
              />
              <Input
                id="password"
                label="Password"
                type="password"
                control="input"
                onChange={this.inputChangeHandler}            
                value={this.state.loginForm['password'].value}
                valid={this.state.loginForm['password'].valid}
             
              />
            <Button design="raised" type="submit" loading={this.props.loading}>Login</Button>
            </form>            
            <p className="signup_link">Don't have an Account? Click <a href="/signup">here</a> to enroll your facility.</p>
           
          </Auth>
        );
      }
}

export default Login;