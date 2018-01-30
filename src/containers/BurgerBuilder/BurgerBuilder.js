import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.5,
  meat: 2.0,
  bacon: 2.0,
  tomato: 0.5
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { ... };
  // }
  state = {
    ingredients: null, //{tomato: 0,salad: 0,bacon: 0,cheese: 0,meat: 0}
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .then(error => {
        this.setState({error: true});
      });
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
    this.setState({loading: true});
    //alert('You continue! Turn to page 99.');
    // You wouldn't normally send price from here, you
    // would re-calculate price from server so you know it's correct
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Andrew Bookro',
        address: {
          street: 'Test Street',
          zipCode: 12345,
          state: 'NY'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let burger = this.state.error ?
      <p style={{textAlign: 'center'}}>Ingredients cannot be loaded from server.</p>
      :
      <Spinner />;
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
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

      orderSummary = (
        <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler} />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          cancel={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
