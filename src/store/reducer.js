import * as actionTypes from './actions';

const initialState = {
    ingredients: {tomato: 0, salad: 0, bacon: 0, cheese: 0, meat: 0},
    totalPrice: 4,
};

const INGREDIENT_PRICES = {
    salad: 0.2,
    cheese: 0.5,
    meat: 2.0,
    bacon: 2.0,
    tomato: 0.5
  };

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        }
        default:
            return state;
    }
};

export default reducer;