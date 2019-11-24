import * as actionType from "../actions/actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionType.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post("/order.json?auth=" + token, orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch(error => { dispatch( purchaseBurgerFail(error) ) });
  };
};

export const purchaseInit = () => {
  return {
    type:actionType.PURCHASE_INIT
  }
}

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionType.FETCH_ORDER_SUCCESS,
    orders: orders
  }
}

export const fetchOrderFail = (error) => {
  return {
    type: actionType.FETCH_ORDER_FAIL,
    error: error
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionType.FETCH_ORDER_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
      dispatch(fetchOrderStart())
      const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
      axios.get('/order.json' + queryParams)
        .then(res => {
            //turning the object to array
            const fetchedOrders = []
            for (let key in res.data){
                fetchedOrders.push({...res.data[key], id:key})
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(err => {
            dispatch(fetchOrderFail(err))
        })
  }
}