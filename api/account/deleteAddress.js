import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
export async function delAddressApi(id, setDelStatus) {

    // fetch(apiUrl + '/CustomerAddress/delete-address/' + id, {
    //     method: 'DELETE',
    // })
    // .then((json) => { 
    //     if(json.status===1){
    //         setDelStatus(1)
    //         modalSuccess('success',json.message)
    //     }
    //     else{
    //         modalWarning('error',json.message);
    //     }
    //     return json
    //  })

    const result = await APIServices.delete('CustomerAddress/delete-address',id)

        
    if(result && result.data && result.data.status===1){
        
        setDelStatus(1)
            modalSuccess('success',result.data.message)
      }else{
        modalWarning('error',result.data.message);
       }
 return result.data //unwanteed
}