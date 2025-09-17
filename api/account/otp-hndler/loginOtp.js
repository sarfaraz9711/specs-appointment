import { modalSuccess,modalError } from "../../intercept";
import APIServices from '../../../services'
import  Router  from "next/router";

export async function  OtpGenrate(mobileNo, captchaToken, browserIdentifier){
    
    // const result =await APIServices.create('otp/secure/generate-otp-login',{"mobileNo":mobileNO,"usesType":usesType, "regType": regType, "userEmail": userEmail});
    //Router.push('/account/myorders');
    //setOtpKey("Lorem Ipsum is only dummy content");
    const result =await APIServices.get(`otp/send-otp?mobileNo=${mobileNo}&captchaToken=${captchaToken}&browserIdentifier=${browserIdentifier}`);

    if(result.data.status == "200"){
        modalSuccess('success',result.data.message);
        return result.data;
    }else{
            modalError('error',result.data.message);
        
        return result.data;
    }
}

export async function MobileGenrate(mobile, id){
    const result = await APIServices.get(`customer/customer-mobile-update?mobile=${mobile}&id=${id}` )
    return result;
}


export async function  ValidateOtp(mobileNo,otp){
    const result =await APIServices.get(`otp/validate-otp?mobileNo=${mobileNo}&otp=${otp}`)
    //Router.push('/account/myorders');
    
    if(result.data.status =="200" || result.data.status =="201" || result.data.status =="202" || result.data.status =="1"){
       //if(usesType != "VERIFY_REGISTRATION"){
        // modalSuccess('success',result.data.message);
       //}
    }else{
        modalError('error',result.data.message);
    }
    return result.data;
}
export async function  ValidateOtpNew(mobileNo,otp){
    const result =await APIServices.get(`otp/validate-otp-new?mobileNo=${mobileNo}&otp=${otp}`)
    //Router.push('/account/myorders');
    
    if(result.data.status =="200" || result.data.status =="201" || result.data.status =="202" || result.data.status =="1"){
       //if(usesType != "VERIFY_REGISTRATION"){
        // modalSuccess('success',result.data.message);
       //}
    }else{
        modalError('error',result.data.message);
    }
    return result.data;
}