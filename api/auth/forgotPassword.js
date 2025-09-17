import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function forgotApi(email,setForgotSuccess) {
    // fetch(apiUrl +'/customer/forgot-password-link?email='+email, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if (json) {
         
    //         if (json.status === 1) {
    //             modalSuccess('success',json.message)  
    //             setForgotSuccess(true) 
               
    //         } else {
    //             modalWarning('error',json.message);
              
    //         }
    //     }
    // })


    const result= await APIServices.getAll('customer/forgot-password-link?email='+email)
        if(result&&result.data&&result.data.status === 1){
            modalSuccess('success',result.data.message)  
            setForgotSuccess(true) 
            
        }else{
            modalWarning('error',result.data.message);
        }
}