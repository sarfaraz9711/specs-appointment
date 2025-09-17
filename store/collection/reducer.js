import { actionTypes } from './action';

export const initialState = {
    collections: [],
    categories: [],
    collection: [],
    widgets: [],
    collectiondata: [],
    freeproduct:[],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COLLECTIONS_SUCCESS:
            return {
                ...state,
                ...{ collections: action.payload },
            };
        case actionTypes.GET_COLLECTION_SUCCESS:
            return {
                ...state,
                ...{ collection: action.payload },
            };
        case actionTypes.GET_COLLECTIONS:
            return {
                ...state,
                ...{ collections: action.payload },
            };
        case actionTypes.GET_COLLECTION:
            return {
                ...state,
                ...{ collection: action.payload },
            };
        case actionTypes.GET_COLLECTION_DATA:
            return {
                ...state,
                ...{ collectiondata: action.payload },
            };

        case actionTypes.GET_FREE_PRODUCT:
            return {
                ...state,
                ...{ freeproduct: action.payload },
            };
        case actionTypes.GET_WIDGETS:
            return {
                ...state,
                ...{ widgets: action.payload }
            }
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        default:
            return state;
    }
}

export default reducer;
