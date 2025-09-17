import { actionTypes } from './action';

export const initCart = {
    compareItems: [],
    compareTotal: 0,
    compareCount:0,
    compareLoading:true,
    comparecompare:[],
    comparecompareloadings:[]
};

function reducer(state = initCart, action) {
    switch (action.type) {
        case actionTypes.GET_COMPARE_LIST_SUCCESS:
            return {
                ...state,
                ...{ cart: action.data },
            };
        case actionTypes.UPDATE_COMPARE_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    compareItems: action.payload.compareItems,
                    compareTotal: action.payload.compareTotal,
                },
            };
        case actionTypes.GET_COMPARE_LIST_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
            case actionTypes.GET_COMPARE_LIST:
                return {
                    ...state,
                    ...{ compareCount: action.payload },
                };
        case actionTypes.COMPARE_LOADING:
            return {
                ...state,
                ...{ compareLoading: action.payload },
        };
        case actionTypes.GET_COMPARE_LIST_COMPARE:
            return {
                ...state,
                ...{ comparecompare: action.payload,
                    comparecompareloadings: action.payload
                 },
        };
        case actionTypes.COMPARE_LOADING_WAITINGS:
            return {
                ...state,
                ...{
                    comparecompareloadings: action.payload
                 },
        };
        default:
            return state;
    }
}

export default reducer;
