
import { actionTypes } from './action';

export const initState = {
    getData: [],
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_STORE:
            return {
                ...state,
                ...{ getData: action.payload },
            };
        default:
            return state;
    }
}

export default reducer;
