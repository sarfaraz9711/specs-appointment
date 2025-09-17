import APIServices from '../../services'

export async function getLookbookTabInfo(tabName, setTabInfo) {
   

    const result = await APIServices.getAll(`offer/front-page-offer-section?showOn=${tabName}`)
    console.log(result, "Nero Result Data")
    if(result && result.data && result.data.data){
        setTabInfo(result.data.data[0]);
       // dispatch(getProductCategories(result.data.data)); 
    }
}

export async function frontPageOfferAll(val){
    const result = await APIServices.getAll(`offer/front-page-offer-section-all?listType=${val}`)
    if(result && result.data && result.data.data){
        return result.data.data
    }
}

export async function getSettingsFlag(){
    const getSetting = await APIServices.getAll('settings/get-settings-flag')
    if(getSetting && getSetting.data && getSetting.data.data){
        return getSetting.data.data
    }
}