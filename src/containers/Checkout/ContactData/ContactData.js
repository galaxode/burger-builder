import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementName: 'name',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementName: 'street address',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementName: 'zip code',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      state: {
        elementType: 'input',
        elementName: 'state',
        elementConfig: {
          type: 'text',
          placeholder: 'State'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementName: 'email address',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementName: 'delivery method',
        elementConfig: {
          options: [
            {value: 'fastest', display: 'Fastest'},
            {value: 'cheapest', display: 'Cheapest'}
          ]
        },
        // We need a starting value here otherwise if default is used
        // the value will be blank (it only updates value when onChange is fired)
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    // You wouldn't normally send price from here, you
    // would re-calculate price from server so you know it's correct
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order);

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
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    const inputFormArray = [];

    for (let key in this.state.orderForm) {
      inputFormArray.push(
        {
          id: key,
          config: this.state.orderForm[key]
        }
      )
    };


    let form = (
      <form onSubmit={this.orderHandler}>
        {inputFormArray.map(input => {
          return <Input
            key={input.id}
            name={input.config.elementName}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            invalid={!input.config.valid}
            touched={input.config.touched}
            shouldValidate={input.config.validation}
            changed={(event) => this.inputChangedHandler(event, input.id)} />
        })}
        <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h1>Enter your contact data</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
