import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.5,
  meat: 2.0,
  bacon: 2.0
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { ... };
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, igAmount) => {
        return sum + igAmount;
      }, 0);

    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount + 1;

    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients , totalPrice: updatedPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = oldCount - 1;

      const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

      this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
      this.updatePurchaseState(updatedIngredients);
    }

  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  cancelPurchaseHandler = () => {
    this.setState({purchasing: false});
  }

  continuePurchaseHandler = () => {
    alert('You continue! Turn to page 99.');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
