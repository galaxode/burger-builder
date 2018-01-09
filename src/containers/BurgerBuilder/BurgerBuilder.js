import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = oldCount + 1;

    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ ingredients: updatedIngredients , totalPrice: updatedPrice });
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
    }
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
