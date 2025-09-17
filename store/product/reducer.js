import { actionTypes } from './action';

export const initialState = {
    allProducts: null,
    singleProduct: {},
    error: false,
    totalProducts: 0,
    categories: [],
    brands: [],
    orderBy:"",
    productsLoading: true,
    productLoading: true,
    searchResults: null,
    price:{priceMin: 0,
        priceMax: ""},
        Ratingcounts:[],
        DetailpageReviews:[],
    Homerevies:"",
    option:{},
    triggersss:0,
    varientapisprocut:{},
    hidefunavailable:false,
    sliderdataimage:[],
    skunameerdataimage:[],
    qut:1,
    crumbarrcate:[]

        
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                ...{ allProducts: action.payload },
            };
        case actionTypes.GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        case actionTypes.GET_PRODUCTS_BY_PRICE_RANGE:
            return {
                ...state,
                ...{ price: action.payload },
            };
        case actionTypes.GET_ORDERBY:
            return {
                ...state,
                ...{ orderBy: action.payload },
            };
        case actionTypes.GET_TOTAL_OF_PRODUCTS:
            return {
                ...state,
                ...{ totalProducts: action.payload },
            };
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{ allProducts: action.data, productsLoading: false },
            };
        case actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{ totalProducts: action.payload },
            };
        // case actionTypes.GET_BRANDS_SUCCESS:
        //     return {
        //         ...state,
        //         ...{ brands: action.payload },
        //     };
        case actionTypes.GET_BRANDS:
            return {
                ...state,
                ...{ brands: action.payload },
            };
        case actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        case actionTypes.GET_PRODUCT_BY_ID_SUCCESS:
           
            return {
                ...state,
                ...{ singleProduct: action.data, productLoading: false },
            };
        case actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS:
            return {
                ...state,
                ...{ searchResults: action.payload },
            };

        case actionTypes.GET_PRODUCTS_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.GET_PRODUCT_BY_ID:
            return {
                ...state,
                ...{ singleProduct: action.payload },
                };
        case actionTypes.GET_PRODUCT_LOADING:
            return {
                ...state,
                ...{ productLoading: action.payload },
            };


        case actionTypes.GET_PRODUCT_RATING_COUNT:
            return{
                ...state,
                ...{Ratingcounts:action.payload },
            };    
        case actionTypes.GET_PRODUCT_DETAIL_REVIEWS:
            return{
                ...state,
                ...{DetailpageReviews:action.payload},
            }; 
            
        case actionTypes.GET_PRODUCT_HOME_REVIEWS:
            return{
                ...state,
                ...{Homerevies:action.payload}
            } 
            
            case actionTypes.GET_PRODUCT_OPTION_REVIEWS:
                return{
                    ...state,
                    ...{option:action.payload}
                }    
                case actionTypes.GET_PRODUCT_TRIGGERS:
                    return{
                        ...state,
                        ...{triggersss:action.payload}
                    } 
                    
                    
                    case actionTypes.GET_PRODUCT_BY_ID_VARIENT_APIS:
                        return{
                            ...state,
                            ...{varientapisprocut:action.payload}
                        } 
                        
                        case actionTypes.GET_PRODUCT_BY_ID_VARIENT_HIDE_FUN:
                            return{
                                ...state,
                                ...{hidefunavailable:action.payload}
                            } 
                            
                            case actionTypes.GET_PRODUCT_SLIDER_IMAGE_CLICK:
                                return{
                                    ...state,
                                    ...{sliderdataimage:action.payload}
                                } 

                                 
                            case actionTypes.GET_SKU_APIS:
                                return{
                                    ...state,
                                    ...{skunameerdataimage:action.payload}
                                } 
                                
                                case actionTypes.GET_QUT_APIS:
                                    return{
                                        ...state,
                                        ...{qut:action.payload}
                                    } 

                                    case actionTypes.GET_CATE_CARY_CRUMB:
                                    return{
                                        ...state,
                                        ...{crumbarrcate:action.payload}
                                    } 
            
        

        default:
            return state;
    }
}

export default reducer;


// GET_SKU_APIS