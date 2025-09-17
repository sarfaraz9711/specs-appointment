import {applyMiddleware} from "redux"
import { modalWarning, modalSuccess } from "../intercept"
import APIServices from '../../services'
export async function ApplyCouponApi(couponInput,mail,couponProduct,setDiscountedPrice,setCouponApplied,setAppliedName,totalData,setcoupdata) {
    
    // fetch(apiUrl+'/customer-coupon/apply-coupon', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "couponCode": couponInput,
    //         "emailId":mail,
    //         "productDetail": couponProduct,
    //     })
    // })
    // .then(json => {
       
    //     setcoupdata(json.couponData)
    //         if (json.data) {
    //             setCouponApplied(true)
    //             modalSuccess('success',json.message)
                
                
    //                 if(json.data.appliedProducts.length!==0) {

    //                 let initialSum=0;
    //                 let sumValue=0
    //                 json.data.appliedProducts.forEach(coupon => {
    //                     sumValue=coupon.discountAmount + initialSum;
    //                     initialSum=sumValue      
    //                 });
    //                 setDiscountedPrice(Number(sumValue).toFixed(2))
    //                 setAppliedName(totalData-sumValue)

    //                 }
                 
    //             }
    //             else{
    //                 modalWarning('error',json.message)
    //             }
    //     })


    const data = JSON.stringify({
     
                    couponCode: couponInput,
                    emailId:mail,
                    productDetail: couponProduct,
    })
console.log(data)
const result =await APIServices.create('customer-coupon/apply-coupon',data)
console.log("resultresultresult",result)
if(result.data){

    setcoupdata(result.data.couponData)
    if (result.data.data) {
        setCouponApplied(true)
        modalSuccess('success',result.data.message)
        
        
            if(result.data.data.appliedProducts.length!==0) {

            // let initialSum=0;
            let sumValue=result.data.data.grandDiscountAmount
            // result.data.data.appliedProducts.forEach(coupon => {
            //     sumValue=coupon.discountAmount + initialSum;
            //     initialSum=sumValue      
            // });
            setDiscountedPrice(parseFloat(Number(sumValue).toFixed(2)))
            setAppliedName(totalData-sumValue)

            }
         
        }
        else{
            modalWarning('error',result.data.message)
        }

}
    
      


}