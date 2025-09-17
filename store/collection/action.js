export const actionTypes = {
    GET_COLLECTIONS: 'GET_COLLECTIONS',
    GET_COLLECTIONS_SUCCESS: 'GET_COLLECTIONS_SUCCESS',

    GET_COLLECTION: 'GET_COLLECTION',
    GET_COLLECTION_DATA: 'GET_COLLECTION_DATA',
    GET_FREE_PRODUCT:'GET_FREE_PRODUCT',

    GET_COLLECTION_SUCCESS: 'GET_COLLECTION_SUCCESS',

    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
    GET_WIDGETS: 'GET_WIDGETS'
};

export function getCollections(payload) {
    return { type: actionTypes.GET_COLLECTION, payload:payload };
}
export function getOffers(payload) {
    return { type: actionTypes.GET_COLLECTION_DATA, payload:payload };
}
export function getFreeProduct(payload) {
    return { type: actionTypes.GET_COLLECTION_DATA, payload:payload };
}

export function getWidgets(payload) {
    return { type: actionTypes.GET_WIDGETS, payload:payload}

}

export function getCollectionsSuccess(payload) {
    return {
        type: actionTypes.GET_COLLECTIONS_SUCCESS,
        payload,
    };
}

export function getCategories(payload) {
    return { type: actionTypes.GET_CATEGORIES, payload };
}

export function getCategoriesSuccess(payload) {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload,
    };
}

export function getCollection(payload) {
    return { type: actionTypes.GET_COLLECTIONS, payload:payload };
}

export function getCollectionSuccess(payload) {
    return {
        type: actionTypes.GET_COLLECTIONS_SUCCESS,
        payload,
    };
}
