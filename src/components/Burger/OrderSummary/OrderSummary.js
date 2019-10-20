import React, { Fragment, Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps.ingredients) !== JSON.stringify(this.props.ingredients);
  }

  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(ingKey => {
      return (
        <li key={ingKey}>
          <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
        </li>
      )
    });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' onClick={this.props.cancel}>Cancel</Button>
        <Button btnType='Success' onClick={this.props.continue}>Continue</Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
