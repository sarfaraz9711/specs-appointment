import {modalWarning} from "../intercept"
import APIServices from '../../services'
export async function pinCodeApi(productId,pin,setPinInfo,setCheckStatus) {

    // fetch(apiUrl + '/vendor-store/check-pincode-availability?productId='+productId+'&pincode='+pin, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if (json.status === 1) {
    //         setCheckStatus("success")
    //         setPinInfo(json.message)
    //     }
    //     else {
    //         setCheckStatus("error")
    //         setPinInfo(json.message)
    //         modalWarning("error",json.message)
    //         }
    //     })

    const result = await APIServices.getAll('vendor-store/check-pincode-availability?productId='+productId+'&pincode='+pin)

    if(result && result.data && result.data.status ==1){
        setCheckStatus("success")
                setPinInfo( result.data.message)
    }else{
        setCheckStatus("error")
            setPinInfo( result.data.message)
            modalWarning("error", result.data.message)
    }
}