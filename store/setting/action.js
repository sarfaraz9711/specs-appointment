import { func } from "prop-types";

export const actionTypes = {
    CHANGE_CURRENCY: 'CHANGE_CURRENCY',
    CHANGE_CURRENCY_SUCCESS: 'CHANGE_CURRENCY_SUCCESS',
    EDIT_ADDRESS_DETAIL:'EDIT_ADDRESS_DETAIL',
    FOOTER_PAGE_LIST:'FOOTER_PAGE_LIST',
    FOOTER_ADDRESS:'FOOTER_ADDRESS',
    SERVICE_LIST:'SERVICE_LIST',
    SERVICE_LIST_INFO:'SERVICE_LIST_INFO',
    MAINTENANCE_DETAIL:'MAINTENANCE_DETAIL',
    SETTINGS_FLAG:'SETTINGS_FLAG',
    STATE_LIST: 'STATE_LIST',
    CITY_LIST: 'CITY_LIST',
    DISTRICT_LIST: 'DISTRICT_LIST',
    PINCODE_LIST: 'PINCODE_LIST',
    LOCATION_LIST: 'LOCATION_LIST',
};

export function changeCurrency(currency) {
    return { type: actionTypes.CHANGE_CURRENCY,payload:currency };
}

export function changeCurrencySuccess(currency) {
    return { type: actionTypes.CHANGE_CURRENCY_SUCCESS, currency };
}

export function editDetail(payload){
    return {type:actionTypes. EDIT_ADDRESS_DETAIL,payload:payload}
}

export function serviceDetail(payload){
    return {type:actionTypes.SERVICE_LIST,payload:payload}
}

export function serviceListInfoDet(payload){
    return {type:actionTypes.SERVICE_LIST_INFO,payload:payload}
}

export function stateList(payload){
    return {type:actionTypes.STATE_LIST,payload:payload}
}

export function cityList(payload){
    return {type:actionTypes.CITY_LIST, payload:payload}
}

export function districtList(payload){
    return {type:actionTypes.DISTRICT_LIST, payload:payload}
}

export function pincodeList(payload){
    return {type: actionTypes.PINCODE_LIST, payload:payload}
}

export function areaList(payload){
    return {type: actionTypes.LOCATION_LIST, payload: payload}
}

export function footerPage(payload){
    return {type:actionTypes.FOOTER_PAGE_LIST ,payload:payload}
}

export function footerAddress(payload){
    return {type:actionTypes.FOOTER_ADDRESS,payload:payload}
}

export function maintenanceState(payload){
    return {type:actionTypes.MAINTENANCE_DETAIL,payload:payload}
}

export function settingsFlag(payload){
    return {type:actionTypes.SETTINGS_FLAG,payload:payload}
}

// export function addressEditData(payload){
//     return {type:actionTypes.ADDRESS_EDIT_DATA,payload:payload}
// }