import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id,
        orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurger());
        axios.post('orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    };
};

export const checkoutInit = () => {
    return {
        type: actionTypes.CHECKOUT_INIT
    };
};