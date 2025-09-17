
import axios from 'axios'
import APIServices from '../../services'
import { storePin } from '../../store/auth/action'

export async function storePincodeApi(id,dispatch) {
        const result = await APIServices.getAll('maps/secure/get-locations/ALL')
        // const result = await axios.get('https://raw.githubusercontent.com/Anjuvelocis/dummydatawork/main/PinCodeData')
        if(result && result.data.data && result.data.data){
   console.log("pincodedata", result.data.data)
            dispatch(storePin(result.data.data)) 
        }
    }