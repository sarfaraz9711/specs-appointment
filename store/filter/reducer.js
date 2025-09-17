
import { actionTypes } from './action';

export const initState = {
    productVariants: [],
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_PRODUCT_VARIANTS:
            console.log(action, "Menu ACtions")
            return {
                ...state,
                 productVariants: action.payload 
            }
        default:
            return state;
    }
}

export default reducer;
