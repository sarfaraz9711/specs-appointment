import  Router  from "next/router";
import APIServices from '../../services'

export async function backCheckOutApi(fname,lname,address,num,city,postCode,email,productDetail,shippingZone,address2) {
    
    // fetch(apiUrl+'/orders/back-order-checkout', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //                 "shippingFirstName": fname,
    //                 "shippingLastName":lname,
    //                 "shippingCity":city,
    //                 "shippingPostCode":postCode,
    //                 "shippingZone":shippingZone,
    //                 "phoneNumber":num,
    //                 "shippingAddress_1":address,
    //                 "shippingAddress_2":address2,
    //                 "emailId":email,
    //                 "shippingCountryId":12,
    //                 "productDetails":productDetail,
    //                 "paymentMethod":2,
    //                 "shippingCompany": ""
    //         })
    // })
    // .then(json=>{
    //     if(json.status===1){
    //         Router.push('/checkout-success/[cid]','/checkout-success/'+json.data.orderPrefixId)
    //     }
    // })
    const data = JSON.stringify({
                    shippingFirstName: fname,
                    shippingLastName:"",
                    shippingCity:city,
                    shippingPostCode:postCode,
                    shippingZone:shippingZone,
                    phoneNumber:num,
                    shippingAddress_1:address,
                    shippingAddress_2:address2,
                    emailId:email,
                    shippingCountryId:12,
                    productDetails:productDetail,
                    paymentMethod:2,
                    shippingCompany: ""
})
const result =await APIServices.create('orders/back-order-checkout',data)
if(result&&result.data&&result.data.status===1){
            Router.push('/checkout-success/[cid]','/checkout-success/'+result.data.data.orderPrefixId)
        }

}