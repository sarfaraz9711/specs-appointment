import Axios from "axios";

export const actionTypes = {
    GET_CART: 'GET_CART',
    GET_CART_SUCCESS: 'GET_CART_SUCCESS',
    GET_CART_ERROR: 'GET_CART_ERROR',

    GET_CART_TOTAL_QUANTITY: 'GET_CART_TOTAL_QUANTITY',
    GET_CART_TOTAL_QUANTITY_SUCCESS: 'GET_CART_TOTAL_QUANTITY_SUCCESS',

    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',

    CLEAR_CART: 'CLEAR_CART',
    CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
    CLEAR_CART_ERROR: 'CLEAR_CART_ERROR',

    INCREASE_QTY: 'INCREASE_QTY',
    INCREASE_QTY_SUCCESS: 'INCREASE_QTY_SUCCESS',
    INCREASE_QTY_ERROR: 'INCREASE_QTY_ERROR',

    DECREASE_QTY: 'DECREASE_QTY',
    UPDATE_CART: 'UPDATE_CART',

    UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',
    UPDATE_CART_ERROR: 'UPDATE_CART_ERROR',
    SET_CART_VARIENT:'SET_CART_VARIENT'
};

// export function getCart() {
//     return { type: actionTypes.GET_CART };
// }

export function setCartVarient(varientItem) {
    return {
        type: actionTypes.SET_CART_VARIENT,payload:varientItem
    };
}
export function getCartSuccess() {
    return {
        type: actionTypes.GET_CART_SUCCESS,
    };
}

export function getCartError(error) {
    return {
        type: actionTypes.GET_CART_ERROR,
        error,
    };
}

export function addItem(product) {
    return { type: actionTypes.ADD_ITEM, payload:product };
}

export function removeItem(product) {
    return { type: actionTypes.REMOVE_ITEM,payload:product };
}

export function increaseItemQty(product) {
    return { type: actionTypes.INCREASE_QTY, payload:product };
}

export function decreaseItemQty(product) {
    return { type: actionTypes.DECREASE_QTY,payload:product };
}

export function updateCartSuccess(payload) {
    return {
        type: actionTypes.UPDATE_CART_SUCCESS,
        payload,
    };
}

export function updateCartError(payload) {
    return {
        type: actionTypes.UPDATE_CART_ERROR,
        payload,
    };
}

export function getCart(payload) {
    return {
        type: actionTypes.GET_CART,
        payload:payload,
    };
}

