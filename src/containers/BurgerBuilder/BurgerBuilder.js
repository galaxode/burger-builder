import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { ... };
  // }
  state = {
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    this.props.getIngredients();
  }

  getIsPurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, igAmount) => {
        return sum + igAmount;
      }, 0);

    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = oldCount + 1;

  //   const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

  //   this.setState({ ingredients: updatedIngredients , totalPrice: updatedPrice });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount > 0) {
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = oldCount - 1;

  //     const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

  //     this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
  //     this.updatePurchaseState(updatedIngredients);
  //   }

  // }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  cancelPurchaseHandler = () => {
    this.setState({purchasing: false});
  }

  continuePurchaseHandler = () => {
    this.props.initCheckout();
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let burger = this.props.error ?
      <p style={{textAlign: 'center'}}>Ingredients cannot be loaded from server.</p>
      :
      <Spinner />;
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.getIsPurchasable(this.props.ings)}
            purchaseHandler={this.purchaseHandler} />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
            ingredients={this.props.ings}
            price={this.props.price}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler} />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }

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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
    getIngredients: () => dispatch(actions.initIngredients()),
    initCheckout: () => dispatch(actions.checkoutInit())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
