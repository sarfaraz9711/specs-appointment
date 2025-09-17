import APIServices from '../../services'
import { myShopStore } from '../../store/auth/action'

export async function shopByLocationApi(id,dispatch) {
        const result = await APIServices.getAll('maps/secure/get-locations/ALL')
        console.log("storedata",result)
        if(result && result.data && result.data.data){
      
            dispatch(myShopStore(result.data.data))    
        }
    }