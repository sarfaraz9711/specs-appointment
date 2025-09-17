export const actionTypes = {
    GET_COMPARE_LIST: 'GET_COMPARE_LIST',
    GET_COMPARE_LIST_SUCCESS: 'GET_COMPARE_LIST_SUCCESS',
    GET_COMPARE_LIST_ERROR: 'GET_COMPARE_LIST_ERROR',
    ADD_ITEM_COMPARE: 'ADD_ITEM_COMPARE',
    REMOVE_ITEM_COMPARE: 'REMOVE_ITEM_COMPARE',
    UPDATE_COMPARE_LIST: 'UPDATE_COMPARE_LIST',
    UPDATE_COMPARE_LIST_SUCCESS: 'UPDATE_COMPARE_LIST_SUCCESS',
    UPDATE_COMPARE_LIST_ERROR: 'UPDATE_COMPARE_LIST_ERROR',
    COMPARE_LOADING:'COMPARE_LOADING',
    CLEAR_COMPARE_LIST: 'CLEAR_COMPARE_LIST',
    GET_COMPARE_LIST_COMPARE:'GET_COMPARE_LIST_COMPARE',
    COMPARE_LOADING_WAITINGS:'COMPARE_LOADING_WAITINGS'
};

export function getCompareList(payload) {
    return { type: actionTypes.GET_COMPARE_LIST,payload:payload };
}

export function getCompareListcompare(payload) {
    return { type: actionTypes.GET_COMPARE_LIST_COMPARE,payload:payload };
}

export function getCompareListSuccess(data) {
    return {
        type: actionTypes.GET_COMPARE_LIST_SUCCESS,
        data,
    };
}

export function addItemToCompare(product) {
    return { type: actionTypes.ADD_ITEM_COMPARE, product };
}

export function removeCompareItem(product) {
    return { type: actionTypes.REMOVE_ITEM_COMPARE, product };
}

export function clearCompare() {
    return { type: actionTypes.CLEAR_CART };
}

export function updateCompareListSuccess(payload) {
    return {
        type: actionTypes.UPDATE_COMPARE_LIST_SUCCESS,
        payload,
    }; 
}

export function compareLoading(payload) {
    return {
        type: actionTypes.COMPARE_LOADING,
        payload:payload,
    }; 
}


export function comparescompareLoading(payload) {
    return {
        type: actionTypes.COMPARE_LOADING_WAITINGS,
        payload:payload,
    }; 
}
