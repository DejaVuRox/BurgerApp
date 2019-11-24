import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner' 
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { checkValidity } from '../../shared/utility'

export class Auth extends Component {
         state = {
           controls: {
             email: {
               elementType: "input",
               elementConfig: {
                 type: "email",
                 placeholder: "Email"
               },
               value: "",
               validation: {
                 required: true,
                 isEmail: true
               },
               valid: false,
               touched: false
             },
             password: {
               elementType: "input",
               elementConfig: {
                 type: "password",
                 placeholder: "password"
               },
               value: "",
               validation: {
                 required: true,
                 isEmail: true,
                 minLength: 6
               },
               valid: false,
               touched: false
             }
           },
           isSignUp: true
         };

         componentDidMount() {
          if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
          }
         }

         inputChangeHandler = (event, controlName) => {
           const updateControls = {
             ...this.state.controls,
             [controlName]: {
               ...this.state.controls[controlName],
               value: event.target.value,
               valid: checkValidity(
                 event.target.value,
                 this.state.controls[controlName].validation
               ),
               touched: true
             }
           };
           this.setState({
             controls: updateControls
           });
         };

         submitHandler = (event) => {
             event.preventDefault();
             this.props.onAuth(
               this.state.controls.email.value,
               this.state.controls.password.value,
               this.state.controls.isSignUp
             );
         }

        switchAuthModeHandler = () => {
            this.setState(prevState => {
                return {isSignUp: !prevState.isSignUp}
            })
        }

         render() {
           const formElementArray = [];
           for (let key in this.state.controls) {
             formElementArray.push({
               id: key,
               config: this.state.controls[key]
             });
           }

           let form = formElementArray.map(formElement => (
             <Input
               touched={formElement.config.touched}
               changed={event => this.inputChangeHandler(event, formElement.id)}
               key={formElement.id}
               elementType={formElement.config.elementType}
               elementConfig={formElement.config.elementConfig}
               value={formElement.config.value}
               invalid={!formElement.config.valid}
               shouldValidate={formElement.config.validation}
             />
           ));

           if (this.props.loading) {
             form = <Spinner/>
           }

           let errorMessage = null
           if (this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>);
           }
           
           let authRedirect = null
           if (this.props.isAuthenticated) {
             authRedirect = <Redirect to={this.props.authRedirectPath}/>
           }
           return (
             <div className={classes.Auth}>
               {authRedirect}
               {errorMessage}
               <form onSubmit={this.submitHandler}>
                 {form}
                 <Button btnType="Success">SUBMIT</Button>
               </form>
               <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                 SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
               </Button>
             </div>
           );
         }
       }

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    auth: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
    return {
       onAuth: (email,password, isSighUp) => dispatch(actions.auth(email,password, isSighUp)),
       onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')) 
    }
}       

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
