import { actionTypes } from './action';

export const initialState = {
    currency: {
        symbol: '₹',
        text: 'INR',
        
    },
    editDetail:{},
    footerDet:{},
    footerPage:[],
    servicelist:[],
    seviceInfo:[],
    stateList:[],
    cityList: [],
    districtList: [],
    pincodeList: [],
    locList: [],
    maintenance:0,
    settingsFlag:{}
    
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENCY:
            return {
                ...state,
                ...{ currency: action.payload },
            };

            case actionTypes.STATE_LIST:
            return {
                ...state,
                ...{ stateList: action.payload },
            };

            case actionTypes.CITY_LIST:
                return {
                    ...state,
                    ...{ cityList: action.payload },
                };

                case actionTypes.DISTRICT_LIST:
                    return {
                        ...state,
                        ...{ districtList: action.payload },
                    };
                

                case actionTypes.PINCODE_LIST:
                    return {
                        ...state,
                        ...{ pincodeList: action.payload },
                    };

            case actionTypes.EDIT_ADDRESS_DETAIL:
                return {
                    ...state,
                    ...{ editDetail: action.payload},
                };
            case actionTypes.FOOTER_PAGE_LIST:
                return {
                    ...state,
                    ...{ footerDet: action.payload},
                };
            case actionTypes.FOOTER_ADDRESS:
                return {
                        ...state,
                    ...{ footerPage: action.payload},
                };
            case actionTypes.SERVICE_LIST:
                return {
                        ...state,
                    ...{ servicelist: action.payload},
                };
            case actionTypes.SERVICE_LIST_INFO:
                return {
                        ...state,
                    ...{ seviceInfo: action.payload},
                    }; 
            case actionTypes.MAINTENANCE_DETAIL:
                return {
                        ...state,
                    ...{ maintenance: action.payload},
                    };  
            case actionTypes.SETTINGS_FLAG:
                return {
                        ...state,
                    ...{ settingsFlag: action.payload},
                    };       
        default:
            return state;
    }
}

export default reducer;
