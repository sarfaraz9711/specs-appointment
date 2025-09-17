import Router from "next/router";
import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import { encrptData} from '../../utilities/common-helpers'

export async function ingenicoCheckout(fname, lname, address, num, numAlter, city, postCode, email, productDetail, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountedPrice, couponInput, name, address1, setButtonLoader, coupandata, buttonLoader, cpassword, setbuttondisable, availedProductPromoInfo, availedCartBasedPromoInfo, availedCouponBasedPromoInfo, totalCartValue, getFacilityCode,getLoyaltyPointInfo,getProductDiscountSum,getTotalTax,getTotalItemsPrice,shippingCharges,creditNoteForOrder,prepaidOff, additionalDetails) {


    const _d = JSON.stringify({
        shippingLastName: "",
        shippingCity: city,
        shippingPostCode: postCode,
        shippingCompany: fname,
        shippingFirstName: fname,
        shippingZone: zoneName,
        gstNo: "",
        phoneNumber: num != null ? num: "",
        phoneNumberAlter: numAlter != null ? numAlter: "",
        shippingAddressFormat: "",
        shippingAddress_1: address,
        shippingAddress_2: address1,
        emailId: email,
        shippingCountryId: 99,
        productDetails: productDetail,
        paymentMethod: method,
        paymentAddress_1: address11,
        paymentAddress_2: address111,
        paymentCity: city1,
        paymentCompany: fname1,
        paymentCountryId: 99,
        paymentFirstName: fname1,
        paymentLastName: "",
        paymentPostCode: postCode1,
        paymentZone: zoneName1,
        couponCode: couponInput,
        couponData: coupandata,
        couponDiscountAmount: discountedPrice,
        password: cpassword,
        availedProductPromoInfo,
        availedCartBasedPromoInfo,
        availedCouponBasedPromoInfo,
        totalCartValue ,
        facilityCode:getFacilityCode,
        getLoyaltyPointInfo,
        productsTotalDiscount:getProductDiscountSum,
        totalTax:getTotalTax,
        totalItemsPrice:getTotalItemsPrice,
        shippingCharges,
        prepaidOrder:prepaidOff,
        cnCode: creditNoteForOrder,
        additionalDetails
      });

      const encData = encrptData(_d)
      let json = {body:encData}
        const result =await APIServices.create('orders/customer-checkout', json);
        if(result.data){
            return result.data;
        }else{
            return {}
        }
      

    //setButtonLoader(false)
    //setbuttondisable(false)
}

export async function saveIngenicoRequestPayload(requestPayload, orderPrefixId){
    const encData = encrptData(JSON.stringify(requestPayload))
    const result =await APIServices.create(`orders/save-ingenico-request-payload?order_prefix_id=${orderPrefixId}`, {data:encData});
    
        if(result.data){
            return result.data;
        }else{
            return {}
        }
}