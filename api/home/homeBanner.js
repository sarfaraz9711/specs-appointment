import APIServices from '../../services'
import { Bannermainloaded } from '../../store/wishlist/action'
export async function homeBannerApi(dispatch, flag) {
    let result
    if(flag==1){
        result = await APIServices.getAll('list/banner-list?bannerFor=redchief')
    }else{
        result = JSON.parse(localStorage.getItem("bannerList"))
    }
    if(result && result.data && result.data.data){
       localStorage.setItem("bannerList", JSON.stringify(result))
       let firstElement = result.data.data.shift();
       result.data.data.push(firstElement);
        dispatch(Bannermainloaded(result.data.data))    
    }
} 


export async function furoHomeBannerApi(flag) {
    let result
    if(flag==1){
        result = await APIServices.getAll('list/banner-list?bannerFor=furo')
    }else{
        result = JSON.parse(localStorage.getItem("bannerListFuro"))
    }
    if(result && result.data && result.data.data){
       localStorage.setItem("bannerListFuro", JSON.stringify(result))
       let firstElement = result.data.data.shift();
       result.data.data.push(firstElement);
        return result.data.data
    }
} 