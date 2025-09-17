// import {notification } from 'antd';
import { addItemToWishlist } from "../../store/wishlist/action";
import { modalWarning, modalSuccess } from "../intercept";
import APIServices from '../../services'
export async function AddWishlist(productId,dispatch) {
    // fetch(apiUrl+'/customer/add-product-to-wishlist', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "productId": productId,
    //         "productOptionValueId": "",
            
    //     })
    // })
    //     .then(json => {
    //         if (!json.data) {
    //             modalWarning('error',json.message)
    //         }
    //         else{
    //             modalSuccess('success',json.message)
    //             dispatch(addItemToWishlist(1))
    //         }
    //     })
    //  console.log(productId,'proid')
    const data = JSON.stringify({
                productId: productId,
            productOptionValueId: "",
                
            })
    const result =  await APIServices.create('customer/add-product-to-wishlist',data)
    
    if(result&&result.data && result.data.status===1){
        modalSuccess('success',result.data.message)
        dispatch(addItemToWishlist(1))
    }else{
        modalWarning('error',result.data.message)
    }

}