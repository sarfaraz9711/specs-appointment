export const actionTypes = {
    GET_PRODUCT_VARIANTS: 'GET_PRODUCT_VARIANTS'
};


export function getProductVariantsBasedOnParentCat (payload) {
    return {
        type: actionTypes.GET_PRODUCT_VARIANTS,
        payload:payload,
    };
}
