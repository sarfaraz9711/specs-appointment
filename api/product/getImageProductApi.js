import { getProductsById, getProductByLoading } from "../../store/product/action";
import { questionsApi } from "./question";
import { ViewAllQuestionApi } from "./viewAllQuestionApi";
import APIServices from '../../services'
export async function GetImageProductApi(productSlug,setimagepaths) {
    let dummyKeyword=""
    let dummyLoader=false

    // fetch(apiUrl + '/product-store/productdetail/'+productSlug, {
    //     method: 'GET',
    // })
    // .then(json => {
        
    //     setimagepaths(json.data.productImage)
    //     // setLoader(true)
       
       
    // })

    const result = await APIServices.get('product-store/productdetail/',productSlug)

    if(result && result.data && result.data.data){
        setimagepaths(result.data.data.productImage)
    //     // setLoader(true)
    }
}