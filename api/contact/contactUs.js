import  Router  from "next/router";
import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'

export async function contactApi(name,mail,phone,message) {

    // fetch(apiUrl+'/list/contact-us', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //                 "name": name,
    //                 "email":mail,
    //                 "phoneNumber":phone,
    //                 "message":message
    //         })
    // })
    // .then(json=>{
    //     if(json.status===1){
    //         Router.push('/')
    //         modalSuccess('success',json.message)
    //     }
    //     else{
    //         modalWarning('error',json.message);
    //     }
    // })

    const data = JSON.stringify({
                    name: name,
                    email:mail,
                    phoneNumber:phone,
                    message:message
})
const result =await APIServices.create('list/contact-us',data)
if(result&&result.data&&result.data.status===1){
            Router.push('/')
            modalSuccess('success',result.data.message)
        }
        else{
            modalWarning('error',result.data.message);
        }




}