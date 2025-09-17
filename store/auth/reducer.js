
import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    storeData: [],
    pincodeData: [],
    userData:{}
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: true },
            };
            case actionTypes.SET_CHECKOUT_LOGIN:
                console.log("action.payload",action.payload)
                return {
                    ...state,
                    ...{ isLoggedIn: action.payload },
                };

            case actionTypes.SET_SHOP_BY_STORE:
            return {
                ...state,
                ...{ storeData:  action.payload },
            };

            
            case actionTypes.SET_USER_DATA:
                console.log("action.payload",action.payload)
            return {
                ...state,
                ...{ userData:  action.payload },
            };
    
            case actionTypes.SET_STORE_BY_PINCODE:
                return {
                    ...state,
                    ...{pincodeData: action.payload},
                };
            
            case actionTypes.LOGIN_REQUEST:
                return {
                    ...state,
                    ...{ isLoggedIn: true },
                };
        case actionTypes.LOGOUT:
            return {
                ...state,
                ...{ isLoggedIn: false },
            };
        default:
            return state;
    }
}

export default reducer;
