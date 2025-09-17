import { modalWarning } from "../intercept";
import APIServices from '../../services'

export async function orderTrackIdApi(orderPrefixId,setOrderInfo){

    // fetch(apiUrl + '/orders/track-order-product?orderProductId='+orderPrefixId, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if(json.status===0){
    //         // modalWarning('warning',json.message);
    //     }
    //     else{
    //         setOrderInfo(json.data)
    //     }            
    // })
    const result= await APIServices.getAll('orders/track-order-product?orderProductId='+orderPrefixId)
    if(result&&result.data&&result.data.status===0){
       
    }
    else{
        setOrderInfo(result.data.data)
    }
    
}