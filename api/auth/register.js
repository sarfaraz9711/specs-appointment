import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import {registerUser} from '../../api/loyalityPoints';
import { OtpGenrate } from '../../api/account/otp-hndler/loginOtp'
import * as ga from '../../utilities/common-helpers';

export async function UserRegister(name, lastName, email, password, confirmPassword, number, Router) {
    // fetch(apiUrl+'/customer/register', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "name": name,
    //         "emailId": email,
    //         "password": password,
    //         "confirmPassword": confirmPassword,
    //         "phoneNumber":number
    //     })
    // })
    //     .then(json => {
    //         if (json) {
    //             if (json.status) {
    //                 Router.push('/account/login');
    //                 modalSuccess('success',json.message)
    //             }
    //             else{
    //                 modalWarning("error",json.data.message[0])
    //             }
    //         }
    //     })
    
    

    const data = JSON.stringify({
        name: name,
        lastName:lastName,
        emailId: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: number
    })

    const result = await APIServices.create('customer/register', data)
    return result.data
}


export async function sendOtpToUser(mobileNo, captchaToken, browserIdentifier) {
    const result =await APIServices.get(`otp/send-otp-new?mobileNo=${mobileNo}&captchaToken=${captchaToken}&browserIdentifier=${browserIdentifier}`);
    let data = {
        event: "sign_up",
        method: "Google"
      }


    ga.pushToDataLayer(data);
    return result.data
}
export async function otpVerificationApi(mobileNo, otp) {
    const result =await APIServices.get(`otp/validate-otp-only?mobileNo=${mobileNo}&otp=${otp}`)
    return result.data

}
export async function checkRegistredUser(mobileNo, email) {
    const result =await APIServices.get(`customer/check-registred-user?mobileNo=${mobileNo}&email=${email}`)
    return result.data

}

