import APIServices from '../../services'
import { modalSuccess,modalWarning } from '../intercept'


export async function notifyOfferApi(checkedvalue) {
    if (localStorage.getItem("spurtUser")) {
        const data = {
            "customerId": JSON.parse(localStorage.getItem("spurtUser")).id,
            "email": JSON.parse(localStorage.getItem("spurtUser")).email,
            "status":checkedvalue,
            "mobileNo": JSON.parse(localStorage.getItem("spurtUser")).mobileNumber,
        }
        const result =await APIServices.create(`customer/notify-customer`,data)
        if (result && result.data && result.data.status === 200) {
        console.log(result,"notify offer")
    } else {
        modalWarning('error', "User is already registered");
    }
    }
}
  
    export async function getUsernotify() {
  const data = JSON.parse(localStorage.getItem("spurtUser")).id


        const result = await APIServices.get(`customer/notify-customer-list-by-customerid?customerId=${data}`)
        console.log(result, "notify user data")
        return result?.data;

    }
    
    export async function updateNotifyUser(Id, checkedvalue) {
        if (localStorage.getItem("spurtUser")) {
            const data = {
                "Id":Id,
                "email": JSON.parse(localStorage.getItem("spurtUser")).email,
                "status":checkedvalue,
                "mobileNo": JSON.parse(localStorage.getItem("spurtUser")).mobileNumber,
            }
        const result =await APIServices.create(`customer/notify-customer-update`,data)
        console.log(result,"notify offer")}
    }

export async function getActiveOffers(setActivCartValuePercentOffers, setActivCartValueFreeProdsOffers, setActivFreeProdPromoOffers){
    const result = await APIServices.get(`offers/all-active-offers`);
    if(result.status == 200){
        setActivCartValuePercentOffers(result.data.cartValueBased.percentageBased
            );
        setActivCartValueFreeProdsOffers(result.data.cartValueBased.freeItemsBased
            );
        setActivFreeProdPromoOffers(result.data.freeProductPromotions
            )
    }
    console.log(result, "Nero Result offers")
}
    
