import APIServices from '../../services'
import { LanguageOneTimeLoading } from '../../store/wishlist/action'


export async function LanguageSwitcherAPi(dispatch) {

    // fetch(apiUrl + '/orders/order-detail?orderProductId='+orderProductId, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if(json.data){
    //         setOrderDetailInfo(json.data)
    //         setOrderLoading(false)
    //     }    
    // })
    const result=await APIServices.getAll('list/language-list?limit=0&offset=0&keyword=&count=0')
    if(result&&result.data&&result.data.data){
      dispatch(LanguageOneTimeLoading(result.data.data))
     
        // setcountflagcout(result.data.data)
     

    }
}