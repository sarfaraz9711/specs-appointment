import { modalSuccess } from "../intercept";
import APIServices from '../../services'
import Axios from "axios";


export async function UserNumberLogin(profie,Router,res){

    

    // const http = Axios.create({
    //     // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    //     baseURL: googlePath,
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   });
    const data = JSON.stringify({
        // headers: {
        //     "Content-type": "application/json",
        //   },
        //   body:JSON.stringify({
        //    )
        
        emailId:profie?.email,
        oauthData:{
            email:profie?.email,
            id:res?.googleId,
            idToken:res?.accessToken,
            firstName:profie?.firstName,
            username:profie?.username,
            provider:googleId,
            token:res?.accessToken,
            mobileNumber:profie?.mobileNumber

      }
         

         
    })
   
    
    const result =await http.get("",data);
    if(result&&result.data&&result.data.status === 1){
        
        localStorage.getItem("spurtToken", result.data.data.token);
                        localStorage.getItem("spurtUser",JSON.stringify(result.data.data.user));
                        modalSuccess('success',result.data.message)
                        Router.push('/account/getotpnumbermloyal');
    

    }else{
     
    }

};