import {modalSuccess, modalWarning} from "../intercept";
import APIServices from '../../services'

export async function userPhone(number,Router) {

    const data = JSON.stringify({
            phoneNumber:number
   })
   const result =await APIServices.create('/account/genrate',data)
   if (result&&result.data) {
                if (result&&result.data&&result.data.status) {
                    Router.push('/account/genrate');
                    modalSuccess('success',result.data.message)
                }
                else{
                    modalWarning("error",result.data.data.data.message[0])
                }
            }
}