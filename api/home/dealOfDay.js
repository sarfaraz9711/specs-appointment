import { getCollection } from "../../store/collection/action"
import APIServices from '../../services'
export async function dealOfDayApi(dispatch) {
    //  await fetch(apiUrl+'/product-store/todayDeals-list', {
    //     method: 'GET',      
    // })
    // .then(json => {
    //     dispatch(getCollection(json.data))
    // })
    const result= await APIServices.getAll('product-store/todayDeals-list')
    if(result&&result.data&&result.data.data){
        dispatch(getCollection(result.data.data))
    }
    
}

