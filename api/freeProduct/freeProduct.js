import APIServices from '../../services'
import { decrptData } from '../../utilities/common-helpers';
import { modalError, modalWarning } from '../intercept';
export async function freeProductapi(params) {
    const result = await APIServices.getAll('promotions/cart-value-based/list/get-promotion-by-value?cartValue='+params.cartValue)

    if (result.status == 200 && result.data) {

        return result.data.data;
    }
    else {
        return [];
    }

}

export async function getProductsByIdsApi(params) {
    const result = await APIServices.getAll('product/get-products-by-ids?ids='+params.productids)

    if (result.status == 200 && result.data) {

        return result.data.data;
    }
    else {
        return [];
    }

}

export async function verifyCouponData(data) {
    const result = await APIServices.create('promotions/coupon-based/verify-coupan',data)
console.log(result)
    if (result?.status == 200 && result?.data) {

        return result.data;
    }
    else {
        modalError('error',"Coupon code not valid.");
        return {status: 500};
       
    }

}

export async function verifyCouponDataCN(cnCode, totalCartValue) {
    const result = await APIServices.get(`credit-note/validate?creditNote=${cnCode}&cnAmount=${totalCartValue}`)
console.log(result)
    if (result?.status == 200 && result?.data) {

        return result.data;
    }
    else {
        modalError('error',"Credit Note is not valid.");
        return {status: 500};
       
    }

}
export async function getProductByDiscount(params) {
    const result = await APIServices.getAll(`product/get-discount-products/${params}`)

    if (result.status == 200 && result.data) {

        return result.data.data;
    }
    else {
        return [];
    }

}
