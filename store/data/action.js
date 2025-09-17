export const actionTypes = {
   
    GET_STORE: 'GET_STORE',
};

export function myStore(data) {
    return { type: actionTypes.GET_STORE ,
        payload:data,
    };
}
