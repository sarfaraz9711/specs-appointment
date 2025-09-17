import { actionTypes } from "./action";

export const initState = {
  wishlistItems: [],
  wishlistTotal: 0,
  addwishlist: 0,
  wishLoad: true,
  langagechange: "",
  mainloadedone:[],
  banners:[]
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_WISHLIST_LIST:
      return {
        ...state,
        ...{ wishlistItems: action.payload },
      };
    case actionTypes.UPDATE_WISHLISH_LIST_SUCCESS:
      return {
        ...state,
        ...{
          wishlistItems: action.payload.wishlistItems,
          wishlistTotal: action.payload.wishlistTotal,
        },
      };
    case actionTypes.GET_WISHLIST_LIST_ERROR:
      return {
        ...state,
        ...{ error: action.error },
      };
    case actionTypes.ADD_ITEM_WISHLISH:
      return {
        ...state,
        ...{ addwishlist: action.payload },
      };

    case actionTypes.WISHLIST_LOADING:
      return {
        ...state,
        ...{ wishLoad: action.payload },
      };
    case actionTypes.LANGUAGE_LOADING:
      return {
        ...state,
        ...{ langagechange: action.payload },
      };

    case actionTypes.LANGUAGE_LOADING_ONE_TIME:
      return {
        ...state,
        ...{ mainloadedone: action.payload },
      };

      case actionTypes.BANNER_MAIND_ONE_TIME:
        return {
          ...state,
          ...{ banners: action.payload },
        };

    default:
      return state;
  }
}

export default reducer;
