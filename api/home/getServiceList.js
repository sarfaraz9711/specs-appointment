import { serviceListInfoDet } from "../../store/setting/action"
import APIServices from '../../services'

export async function getServiceListApi(dispatch,categoryId,setServelistLoader) {
    
        // await fetch(apiUrl+'/store-service/service-list?limit=0&offset=0&keyword=&categoryId='+categoryId+'&count=0', {
        //     method: 'GET',
        // })
        // .then(json => {       
        //     dispatch(serviceListInfoDet(json.data))
        //     setServelistLoader(false)  
        // })

        const result =  await APIServices.get('store-service/service-list?limit=0&offset=0&keyword=&categoryId='+categoryId+'&count=0')
        if(result && result.data && result.data.data){
            dispatch(serviceListInfoDet(result.data.data.data))
            setServelistLoader(false)  
        }
    }

