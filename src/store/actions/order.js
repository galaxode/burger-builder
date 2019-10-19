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
        dispatch(purchaseBurgerInit());
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

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios.get('/orders.json')
        .then(response => {
          console.log(response);
          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push(
              {
                ...response.data[key],
                id: key
              });
          }
          console.log(fetchedOrders);
          dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
          dispatch(fetchOrdersFail(error));
        });
    }
};