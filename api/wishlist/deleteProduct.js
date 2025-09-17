import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
export async function delWishApi(productId, setDelStatus) {

    // fetch(apiUrl + '/customer/wishlist-product-delete/' + productId, {
    //     method: 'DELETE',
    // })
    //      .then(json => {
    //         if (json.status === 1) {
    //             modalSuccess('success',json.message)
    //             setTimeout(()=>{
    //                 setDelStatus(1)    
    //             },1000)

    //         } else {
    //             modalWarning('error',json.message);
    //         }
    //      })

    const result = await APIServices.delete('customer/wishlist-product-delete', productId)

    if (result) {
        if (result && result.data && result.data.status === 1) {
            modalSuccess('success', result.data.message)
            setTimeout(() => {
                setDelStatus(1)
            }, 1000)
        } else {
            modalWarning('error', result.data.message);
        }
    }
}