import { cartListApi } from "./cartList";
import APIServices from '../../services'

export async function cartCountApi(dispatch) {

    // fetch(apiUrl + '/customer-cart/customer-cart-list?limit=0&offset=0&count=true', {
    //     method: 'GET',
    // })
    //     .then(json => {
    //         if(json.data){
    //             if(json.data!==0){
    //                 cartListApi(dispatch)
    //             }
    //         }             
    //     })

    const result= await APIServices.getAll('customer-cart/customer-cart-list?limit=0&offset=0&count=true')
        if(result&&result.data&&result.data.data ){
            if(result&&result.data&&result.data.data !==0){
                cartListApi(dispatch)
            }
            
        }

}