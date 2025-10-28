import { addItemToWishlist, getWishlistList, wishListLoading } from "../../store/wishlist/action";
// import {RegisterIntercept} from '../intercept'
import APIServices from '../../services'

export async function wishListApi(setWishListApi, dispatch, setInitialLoad) {

    // fetch(apiUrl + '/customer/wishlist-product-list', {
    // method: 'GET',})
    // .then(json => {
    //     setInitialLoad(false)
    //     if(json.data){
    //         setWishListApi(json.data)
    //         dispatch(getWishlistList(json.data))
    //         setTimeout(()=>{
    //             dispatch(wishListLoading(false))
    //         },2000)
    //     }} 
    //     )

    const result = await APIServices.getAll('customer/wishlist-product-list')
   
    setInitialLoad(false)
    if(!sessionStorage.getItem("activeList")  || localStorage.getItem("checkSessionDate")!=(new Date().getDate())){
    let activeOffersData = await APIServices.get('offers/active-list');
    
    if (activeOffersData && activeOffersData.data && activeOffersData.data) {
        const offerData = JSON.stringify(activeOffersData.data);
        localStorage.setItem("activeOffers", offerData);
        sessionStorage.setItem("activeList","YES")
    }
}

    if (result && result.data && result.data.data) {
        setWishListApi(result.data.data)
        dispatch(getWishlistList(result.data.data))
        // dispatch(addItemToWishlist(result.data.data))
        setTimeout(() => {
            dispatch(wishListLoading(false))
        }, 2000)

    }   
}

