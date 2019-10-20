import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions';

class Auth extends Component {
    state = {
        isSignUp: true,
        controls: {
            email: {
                elementType: 'input',
                elementName: 'email',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Email Address'
                },
                value: '',
                validation: {
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementName: 'password',
                elementConfig: {
                  type: 'password',
                  placeholder: 'Password'
                },
                value: '',
                validation: {
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
          }

        return isValid;
    }   

    inputChangedHandler = (event, inputId) => {
        const updatedControls = {
            ...this.state.controls,
            [inputId]: {
                ...this.state.controls[inputId],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputId].validation),
                touched: true,

            }
        };

        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({isSignUp: !prevState.isSignUp}));
    }

    render() {
        const inputFormArray = [];
        for (let key in this.state.controls) {
            inputFormArray.push(
                {
                    id: key,
                    config: this.state.controls[key]
                }
            )
        };

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {inputFormArray.map(input => (
                        <Input
                            key={input.id}
                            name={input.config.elementName}
                            elementType={input.config.elementType}
                            elementConfig={input.config.elementConfig}
                            value={input.config.value}
                            invalid={!input.config.valid}
                            touched={input.config.touched}
                            shouldValidate={input.config.validation}
                            changed={(event) => this.inputChangedHandler(event, input.id)} 
                        />  
                    ))}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" onClick={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect(null, mapDispatchToProps)(Auth);