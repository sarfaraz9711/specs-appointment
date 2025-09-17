import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function loyalityApi(customerMobile, Router) {
console.log(customerMobile, "mobilenumber")
   


    const data = JSON.stringify({
        customer_mobile:customerMobile,
              
    })
    const result =await APIServices.createPoints('http://mqst.mloyalpos.com/service.svc/GET_CUSTOMER_TRANS_INFO',data)
    
    if(result&&result.data&&result.data.status===1){
        Router.push("/account/login")
                modalSuccess("success",result.data.message)

    }

}

// export async function resetConfomPassApi(key,setPageTrue) {
   
       
    
//         const result =await APIServices.get('customer/forgot-password-key-check',key)
//         console.log(result.data.message);
//         if(result&&result.data&&result.data.status===1){
//             setPageTrue(true)
//                     // modalSuccess("success",result.data.message)
    
//         }else{
//             modalSuccess("error",result.data.message)
//         }
    
//     }