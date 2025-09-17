
import { actionTypes } from './action';

export const initState = {
    menuExpand: false
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SET_MENU_EXPAND:
            return {
                ...state,
                ...{ menuExpand: action.payload },
            };
        default:
            return state;
    }
}

export default reducer;
