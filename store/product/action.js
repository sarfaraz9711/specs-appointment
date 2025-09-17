export const actionTypes = {
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_ERROR: 'GET_PRODUCTS_ERROR',
    GET_ORDERBY:'GET_ORDERBY',
    GET_PRODUCTS_BY_CATEGORY: 'GET_PRODUCTS_BY_CATEGORY',
    GET_PRODUCTS_BY_PRICE_RANGE: 'GET_PRODUCTS_BY_PRICE_RANGE',
    GET_PRODUCTS_BY_BRAND: 'GET_PRODUCTS_BY_BRAND',
    GET_PRODUCTS_BY_KEYWORD: 'GET_PRODUCTS_BY_KEYWORD',
    GET_PRODUCTS_BY_KEYWORD_SUCCESS: 'GET_PRODUCTS_BY_KEYWORD_SUCCESS',

    GET_PRODUCT_BY_ID: 'GET_PRODUCT_BY_ID',
    GET_PRODUCT_BY_ID_SUCCESS: 'GET_PRODUCT_BY_ID_SUCCESS',
    GET_PRODUCT_LOADING:'GET_PRODUCT_LOADING',
    GET_TOTAL_OF_PRODUCTS: 'GET_TOTAL_OF_PRODUCTS',
    GET_TOTAL_OF_PRODUCTS_SUCCESS: 'GET_TOTAL_OF_PRODUCTS_SUCCESS',

    // GET_PRODUCT_PRICE:'GET_PRODUCT_PRICE',
    GET_BRANDS: 'GET_BRANDS',
    GET_BRANDS_SUCCESS: 'GET_BRANDS_SUCCESS',

    GET_PRODUCT_CATEGORIES: 'GET_PRODUCT_CATEGORIES',
    GET_PRODUCT_CATEGORIES_SUCCESS: 'GET_PRODUCT_CATEGORIES_SUCCESS',
    GET_PRODUCT_RATING_COUNT: ' GET_PRODUCT_RATING_COUNT',
    GET_PRODUCT_DETAIL_REVIEWS:'GET_PRODUCT_DETAIL_REVIEWS',
    GET_PRODUCT_HOME_REVIEWS:'GET_PRODUCT_HOME_REVIEWS',
    GET_PRODUCT_OPTION_REVIEWS:'GET_PRODUCT_OPTION_REVIEWS',
    GET_PRODUCT_TRIGGERS:'GET_PRODUCT_TRIGGERS',
    GET_PRODUCT_BY_ID_VARIENT_APIS:'GET_PRODUCT_BY_ID_VARIENT_APIS',
    GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN:'GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN',
    GET_PRODUCT_SLIDER_IMAGE_CLICK:'GET_PRODUCT_SLIDER_IMAGE_CLICK',
    GET_SKU_APIS:'GET_SKU_APIS',
    GET_QUT_APIS:'GET_QUT_APIS',
    GET_CATE_CARY_CRUMB:'GET_CATE_CARY_CRUMB'
   
};

export function getProducts(payload) {
    return { type: actionTypes.GET_PRODUCTS, payload:payload };
}

export function getTotalProducts(payload) {
    return { type: actionTypes.GET_TOTAL_OF_PRODUCTS, payload:payload };
}

export function getOrderBy(payload) {
    return { type: actionTypes.GET_ORDERBY, payload:payload };
}

// export function getProductsByPrice(payload){
//     return {type:actionTypes.GET_PRODUCT_PRICE,payload:payload}
// }

export function getBrands(payload) {
    return { type: actionTypes.GET_BRANDS,payload:payload };
}

export function getBrandsSuccess(payload) {
    return { type: actionTypes.GET_BRANDS_SUCCESS, payload };
}

export function getProductCategories(payload) {
    return { type: actionTypes.GET_PRODUCT_CATEGORIES,payload:payload };
}

export function getProductCategoriesSuccess(payload) {
    return { type: actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS, payload };
}

export function getTotalProductsSuccess(payload) {
    return {
        type: actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS,
        payload,
    };
}

export function getProductsSuccess(data) {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        data,
    };
}
export function getProductByKeywordsSuccess(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS,
        payload,
    };
}

export function getSingleProductsSuccess(data) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID_SUCCESS,
        data,
    };
}

export function getProductsError(error) {
    return {
        type: actionTypes.GET_PRODUCTS_ERROR,
        error,
    };
}

export function getProductsByCategory(category) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_CATEGORY,
        category,
    };
}

export function getProductsByBrand(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_BRAND,
        payload,
    };
}

export function getProductsByKeyword(keyword) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_KEYWORD,
        keyword,
    };
}

export function getProductsById(payload) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID,
        payload:payload,
    };
}

export function getProductsByPrice(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_PRICE_RANGE,
        payload:payload,
    };
}

export function getProductByLoading(payload){
    return{
        type:actionTypes.GET_PRODUCT_LOADING,
        payload:payload,
    }
}
export function getProductRatingCount(payload){
    return{
        type:actionTypes.GET_PRODUCT_RATING_COUNT,
        payload:payload
    }
}
export function getProductDetailReviws(payload){
    return{
        type:actionTypes.GET_PRODUCT_DETAIL_REVIEWS,
        payload:payload
    }
}

export function getHomeRevies(payload){
    return{
        type:actionTypes.GET_PRODUCT_HOME_REVIEWS,
        payload:payload
    }
}

export function getOptionRevies(payload){
    return{
        type:actionTypes.GET_PRODUCT_OPTION_REVIEWS,
        payload:payload
    }
}


export function getTriggges(payload){
    return{
        type:actionTypes.GET_PRODUCT_TRIGGERS
        ,
        payload:payload
    }
}

export function getvarientProductsnewapis(payload) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID_VARIENT_APIS,
        payload:payload,
    };
}

export function getvarientproducthidefun(payload) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN,
        payload:payload,
    };
}

export function getsliderimageclicks(payload) {
    return {
        type: actionTypes.GET_PRODUCT_SLIDER_IMAGE_CLICK,
        payload:payload,
    };
}

export function getvarientdatamethlist(payload) {
    return {
        type: actionTypes.GET_SKU_APIS,
        payload:payload,
    };
}

export function getQuantymin(payload) {
    return {
        type: actionTypes.GET_QUT_APIS,
        payload:payload,
    };
}


export function getCategoruCrumb(payload) {
    return {
        type: actionTypes.GET_CATE_CARY_CRUMB,
        payload:payload,
    };
}





