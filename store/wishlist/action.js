export const actionTypes = {
    GET_WISHLIST_LIST: 'GET_WISHLIST_LIST',
    GET_WISHLIST_LIST_SUCCESS: 'GET_WISHLIST_LIST_SUCCESS',
    GET_WISHLIST_LIST_ERROR: 'GET_WISHLIST_LIST_ERROR',

    ADD_ITEM_WISHLISH: 'ADD_ITEM_WISHLISH',
    REMOVE_ITEM_WISHLISH: 'REMOVE_ITEM_WISHLISH',

    UPDATE_WISHLISH_LIST: 'UPDATE_WISHLISH_LIST',
    UPDATE_WISHLISH_LIST_SUCCESS: 'UPDATE_WISHLISH_LIST_SUCCESS',
    UPDATE_WISHLISH_LIST_ERROR: 'UPDATE_WISHLISH_LIST_ERROR',

    CLEAR_WISHLISH_LIST: 'CLEAR_WISHLISH_LIST',
    WISHLIST_LOADING:'WISHLIST_LOADING',
    LANGUAGE_LOADING:'LANGUAGE_LOADING',
    LANGUAGE_LOADING_ONE_TIME:'LANGUAGE_LOADING_ONE_TIME',
    BANNER_MAIND_ONE_TIME:'BANNER_MAIND_ONE_TIME'
};

export function getWishlistList(data) {
    return { type: actionTypes.GET_WISHLIST_LIST , payload:data };
}

export function getWishlistListSuccess(data) {
    return {
        type: actionTypes.GET_WISHLIST_LIST_SUCCESS,
        data,
    };
}

export function addItemToWishlist(product) {
    return { type: actionTypes.ADD_ITEM_WISHLISH, payload:product };
}

export function removeWishlistItem(product) {
    return { type: actionTypes.REMOVE_ITEM_WISHLISH, product };
}

export function clearWishlist() {
    return { type: actionTypes.CLEAR_CART };
}

export function updateWishlistListSuccess(payload) {
    return {
        type: actionTypes.UPDATE_WISHLISH_LIST_SUCCESS,
        payload,
    };
}
export function wishListLoading(payload) {
    return {
        type: actionTypes.WISHLIST_LOADING,
        payload:payload,
    };
} 

export function LanguageListLoading(payload) {
    return {
        type: actionTypes.LANGUAGE_LOADING,
        payload:payload,
    };
} 

export function LanguageOneTimeLoading(payload) {
    return {
        type: actionTypes.LANGUAGE_LOADING_ONE_TIME,
        payload:payload,
    };
} 

export function Bannermainloaded(payload) {
    return {
        type: actionTypes.BANNER_MAIND_ONE_TIME,
        payload:payload,
    };
} 


