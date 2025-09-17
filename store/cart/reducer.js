import { actionTypes } from './action';

export const initCart = {
    cartItems: [],
    amount: 0,
    cartTotal: 0,
    addproduct:0,
    removeproduct:"",
    increment:"",
    decrement:"",
    varientItem:[]
};

function reducer(state = initCart, action) {
    switch (action.type) {
        case actionTypes.GET_CART_SUCCESS:
            return {
                ...state,
            };
            case actionTypes.SET_CART_VARIENT:
                return {
                    ...state,
                    ...{varientItem: action.payload}
                };
        case actionTypes.UPDATE_CART_SUCCESS:
            return {
                ...state,
                ...{ cartItems: action.payload.cartItems },
                ...{ amount: action.payload.amount },
                ...{ cartTotal: action.payload.cartTotal },
            };
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                ...{ cartItems: action.payload.cartItems },
                ...{ amount: action.payload.amount },
                ...{ cartTotal: action.payload.cartTotal },
            };
        case actionTypes.GET_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.UPDATE_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.GET_CART:
            return {
                ...state,
                ...{ cartItems: action.payload },
            };
        case actionTypes.ADD_ITEM:
            return {
                    ...state,
                    ...{ addproduct: state.addproduct + 1 },
                };
        case actionTypes.REMOVE_ITEM:
            return {
                    ...state,
                    ...{ removeproduct: action.payload },
                }; 
        case actionTypes.INCREASE_QTY:
            return {
                ...state,
                ...{ increment: action.payload },
            };
        case actionTypes.DECREASE_QTY:
            return {
                ...state,
                ...{ decrement: action.payload },
            };                        
        default:
            return state;
    }
}

export default reducer;
