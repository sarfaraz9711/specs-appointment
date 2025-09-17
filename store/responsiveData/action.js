export const actionTypes = {
   
    SET_MENU_EXPAND: 'SET_MENU_EXPAND',
};

export function setResponseData(data) {
    return { type: actionTypes.SET_MENU_EXPAND ,
        payload:data,
    };
}
