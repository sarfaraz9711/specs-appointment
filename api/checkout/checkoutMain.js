import Router from "next/router";
import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import { encrptData} from '../../utilities/common-helpers'
const openPaymentiFrame = (mobile, orderToken) => {
  let options = {
    theme: 'default',
    orderToken: orderToken,
    //orderToken: '5650C228BDBD284D2E472CDABBA30816A556B952BB4FEBBBD3AAFDD4339A4E0F',
    channelId: 'WEB',
    paymentMode: 'CREDIT_DEBIT,NETBANKING,UPI,WALLET,EMI,DEBIT_EMI',
    countryCode: 91,
    mobileNumber: mobile,
    emailId: null,
    showSavedCardsFeature: false,
    successHandler: async function (response) {
      console.log(response, "Nero PineLabs Res")
      
      const result =await APIServices.create('payment-pine/secure/modify-payment',{
        "payment_id" : response.payment_id,
        "plural_order_id" : response.plural_order_id,
        "remark" : null
      });

      if(result){
        Router.push('/account/customer-orders', '/account/customer-orders/');
      }
      
    },
    failedHandler: async function (response) {
      console.log(response, "Nero PineLabs failure");

      const result =await APIServices.create('payment-pine/secure/modify-payment',{
        "payment_id" : response.payment_id,
        "plural_order_id" : response.plural_order_id,
        "remark" : response.error_message
      });

      if(result){
        window.location = "/account/customer-orders";
       // Router.push('/account/customer-orders', '/account/customer-orders/');
      }

    }
  };
  const plural = new Plural(options);
  plural.open(options);
}
export async function checkOutApi(fname, lname, address, num, numAlter, city, postCode, email, productDetail, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountedPrice, couponInput, name, address1, setButtonLoader, coupandata, buttonLoader, cpassword, setbuttondisable, availedProductPromoInfo, availedCartBasedPromoInfo, availedCouponBasedPromoInfo, totalCartValue, getFacilityCode, getLoyaltyPointInfo,getProductDiscountSum,getTotalTax,getTotalItemsPrice, shippingCharges, creditNoteForOrder,prepaidOff, additionalDetails) {
  console.log(num, 'accountPassword')
  // fetch(apiUrl+'/orders/customer-checkout', {
  //         method: 'POST',
  //         body: JSON.stringify({
  //                 "shippingFirstName": fname,
  //                 "shippingLastName":lname!= null ? lname : "",
  //                 "shippingCity":city,
  //                 "shippingPostCode":postCode,
  //                 "shippingCompany": fname,
  //                 "shippingZone":zoneName,
  //                 "gstNo": "",
  //                 "phoneNumber":num,
  //                 "shippingAddressFormat":"",
  //                 "shippingAddress_1":address,
  //                 "shippingAddress_2": address1,
  //                 "emailId":email,
  //                 "shippingCountryId":countryId,
  //                 "productDetails":productDetail,
  //                 "paymentMethod":method,
  //                 "paymentAddress_1": address11,
  //                 "paymentAddress_2": address111,
  //                 "paymentCity": city1,
  //                 "paymentCompany": fname1,
  //                 "paymentCountryId": countryId,
  //                 "paymentFirstName": fname1,
  //                 "paymentLastName": "",
  //                 "paymentPostCode": postCode1,
  //                 "paymentZone": zoneName1,
  //                 "couponCode": couponInput,
  //                 "couponData": coupandata,
  //                 "couponDiscountAmount": discountedPrice
  //         })
  // })
  // .then(json=>{


  //     if(json.status===1){

  //         Router.push('/checkout-success/[cid]','/checkout-success/'+json.data.orderPrefixId)
  //         localStorage.setItem("cartItem",JSON.stringify([]))
  //         modalSuccess('success',json.message)
  //         setButtonLoader(false)
  //     }
  //     if(json.status===3){
  //             window.open(json.data, '_self');
  //             localStorage.setItem("cartItem",JSON.stringify([]))
  //     }
  //     if(json.status===0){
  //         modalWarning("error",json.message)
  //     }
  // })



  const data = JSON.stringify({
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
    totalCartValue,
    facilityCode:getFacilityCode,
    getLoyaltyPointInfo,
    productsTotalDiscount:getProductDiscountSum,
    totalTax:getTotalTax,
    totalItemsPrice:getTotalItemsPrice,
    shippingCharges,
    prepaidOrder:prepaidOff,
    cnCode:creditNoteForOrder,
    additionalDetails
  })
  const encData = encrptData(data)
  let json = {body:encData}
  if (method === 7 || method === 8) {
    const result =await APIServices.create('orders/customer-checkout',json);

    if (result && result.data && result.data.status === 200 && method === 7) {
      openPaymentiFrame('9121004028', result.data.tokenisedData.token);
    }else if(method === 8){
      console.log(result.data);
    }
  }
  else {
    const result = await APIServices.create('orders/customer-checkout', json)
    if (result && result.data && result.data.status === 1) {
      
     // const Json = {orderId:result.data.data.orderId, orderPrefixId:result.data.data.orderPrefixId, orderAmount:result.data.data.total}
      const Json = {orderData: result.data.data}
      const queryParam = Buffer.from(JSON.stringify(Json)).toString('base64')
     Router.push({pathname: '/thankyou-page', query:{queryData:queryParam}})
      localStorage.setItem("cartItem", JSON.stringify([]))
     // modalSuccess('success', result.data.message)

    }
    {console.log(result, "gcvhsvchs")};
    if (result && result.data && result.data.status === 3) {
      window.open(result.data.data, '_self');
      localStorage.setItem("cartItem", JSON.stringify([]))
    }
    if (result && result.data && result.data.status === 0) {
      console.log(result.data, 'books342')
      modalWarning("error", result.data.message)
    }
  }

  setButtonLoader(false)
  setbuttondisable(false)

}