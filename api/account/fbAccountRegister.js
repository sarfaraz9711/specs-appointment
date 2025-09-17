
import { modalError, modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
import  Router  from "next/router";

export async function fbAccountRegister(rawData) {

    const data = JSON.stringify({
        name: rawData.name,
        email: rawData.email,
        fb_userID: rawData.userID
    });

    // console.log("data", data);
    
    
    try{
      let result = await APIServices.create('customer/verify-create-user-fb',data);
      console.log("_credentials",result);
      if(result && result.data.status == 1){
        localStorage.setItem("spurtToken", result?.data?.data?.token);
        // localStorage.setItem("spurtUser",JSON.stringify(response.data.user));
        // modalSuccess('success', result?.data?.message)
        // Router.push('/');
        console.log("result?.data?.data?.storeRedirectUrl",result?.data?.data?.storeRedirectUrl);
        Router.push(result?.data?.data?.storeRedirectUrl);
      }else{
        // setLoginError("Invalid Credentials")
        modalWarning('error', "Invalid Credentials")
      }
    }catch(e){
      console.log("e");
    }
    




    // const result =await APIServices.create('enquiry/create-enquiry',data)
    // if(result&&result.data&&result.data.status===200){
    //             Router.push('/')
    //             modalSuccess('success',result.data.message)
                
    //         }
    //         else{
    //             modalWarning('error',result.data.message);
    //         }
}

