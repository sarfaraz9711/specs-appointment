export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    SET_SHOP_BY_STORE: 'SET_SHOP_BY_STORE',
    SET_STORE_BY_PINCODE: 'SET_STORE_BY_PINCODE',
    SET_CHECKOUT_LOGIN: 'SET_CHECKOUT_LOGIN',
    SET_USER_DATA: 'SET_USER_DATA',
};

export function login() {
    return { type: actionTypes.LOGIN_REQUEST};
}
export function userData(payload) {
    return { type: actionTypes.SET_USER_DATA, payload:payload};
}
export function checkOutLogin(payload) {
    console.log("payload",payload)
    return { type: actionTypes.SET_CHECKOUT_LOGIN,
        payload:payload
    };
}

export function loginSuccess() {
    return { type: actionTypes.LOGIN_SUCCESS };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function myShopStore(payload) {
    console.log(payload, "shwbduscb")
    return { type: actionTypes.SET_SHOP_BY_STORE ,
        payload:payload,
    };
}

export function storePin(payload) {
    return { type: actionTypes.SET_STORE_BY_PINCODE,
        payload:payload,
        
    };
}
