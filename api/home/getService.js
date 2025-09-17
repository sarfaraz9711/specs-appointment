import { serviceDetail } from "../../store/setting/action"
import APIServices from '../../services'
export async function getServiceApi(dispatch) {
    
        // await fetch(apiUrl+'/store-service/category-list?limit=0&offset=0&keyword=&count=0', {
        //     method: 'GET',
        // })
        // .then(json => {
        //     if(json.data){
        //         dispatch(serviceDetail(json.data))
        //     } 
        // })    

        const result = await APIServices.getAll('store-service/category-list?limit=0&offset=0&keyword=&count=0')

        if(result && result.data && result.data.data){
            if(result.data.data){
                        dispatch(serviceDetail(result.data.data))
                    } 
        }
}
