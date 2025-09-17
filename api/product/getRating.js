
import APIServices from '../../services'
import { getProductDetailReviws } from '../../store/product/action'
export async function productRatingApi(productId,setRatingInfo,dispatch) {
   
    // fetch(apiUrl + '/product-store/Get-Product-rating?productId='+productId, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     setRatingInfo(json.data)          
    // })

    const result = await APIServices.getAll('product-store/Get-Product-rating?productId='+productId)
    if(result && result.data && result.data.data){
        setRatingInfo(result.data.data)    
        dispatch(getProductDetailReviws(result.data.data))    
    }
}
