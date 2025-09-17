import APIServices from '../../services'

export async function getOfferData(setTabInfo) {
   

    const result = await APIServices.getAll(`offer/front-page-offer-section?showOn=allOffer`)
    if(result && result.data && result.data.data){
        setTabInfo(result.data.data);
       // dispatch(getProductCategories(result.data.data)); 
    }
}

export async function getSingupOfferData(setSignupOfferData) {
   

    const result = await APIServices.getAll(`promotions/get_signup_promotion_setting`)
    if(result && result.data && result.data.data){
        setSignupOfferData(result.data.data);
       // dispatch(getProductCategories(result.data.data)); 
    }
}
