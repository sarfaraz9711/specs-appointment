import { footerAddress } from "../../store/setting/action"
import APIServices from '../../services'
async function getPageApi(dispatch) {
    
//     await fetch(apiUrl + '/pages/pagelist?limit=0&offset=0&keyword=', {
//         method: 'GET',
//     })
//     .then(json => {
//         dispatch(footerAddress(json.data))
//     })
// }

const result = await APIServices.getAll('pages/pagelist?limit=0&offset=0&keyword=')

if(result && result.data && result.data.data){
    dispatch(footerAddress(result.data.data))
}
}
export default getPageApi