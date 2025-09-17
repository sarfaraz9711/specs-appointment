import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import  Router  from "next/router";

export async function subscribeApi(email) {

    const data = JSON.stringify({
        email: email,
    })

    console.log(data, "datatatta");
    const result =await APIServices.create('customer/notify-customer',data)
    if(result&&result.data&&result.data.status===1){
               // Router.push('/corporate-gifting')
                modalSuccess('success',result.data.message)
                
            }
            else{
                modalWarning('error',result.data.message);
            }
}