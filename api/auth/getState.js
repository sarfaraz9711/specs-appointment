import { stateList } from "../../store/setting/action"
import APIServices from '../../services'
import axios from "axios";

export async function getStateListApi(setStateDataList) {
    const result =  await APIServices.get('store_state_city_master/get-store-states')  
    
                if(result && result.data)
                setStateDataList(result.data.data)
    }

