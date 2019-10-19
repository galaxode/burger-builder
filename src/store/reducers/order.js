import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CHECKOUT_INIT: {
            return {
                ...state,
                purchased: false
            }
        }
        case actionTypes.PURCHASE_BURGER_INIT: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                orders: [...state.orders, newOrder],
                purchased: true
            }
        }
        case actionTypes.PURCHASE_BURGER_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        case actionTypes.FETCH_ORDERS_INIT: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        }
        case actionTypes.FETCH_ORDERS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        default:
            return state;
    }
}

export default reducer;