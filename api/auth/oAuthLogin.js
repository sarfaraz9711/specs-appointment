import { modalSuccess } from "../intercept";
import APIServices from '../../services'
// import axios from "axios";
import Axios from "axios";
import axios from "axios";

export async function UserOauthLogin(profie,Router,res,googleId,googlePath){

    

    const http = Axios.create({
        // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        baseURL: googlePath,
        headers: {
          "Content-type": "application/json",
        },
      });
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
            image:profie?.imageUrl,
            name:profie?.name,
            provider:googleId,
            token:res?.accessToken

      }
         

         
    })
   
    
    const result =await http.post("",data);
    if(result&&result.data&&result.data.status === 1){
        console.log("Nerossssssssssssssssssssssssssssssssssshjsjsjsjsjssjs", result)
        if(result.data.data.activeUser){
                      localStorage.setItem("spurtToken", result.data.data.token);
                       localStorage.setItem("spurtUser",JSON.stringify(result.data.data.user));
                       modalSuccess('success',result.data.message);
                       Router.push('/');
        }else{
          localStorage.setItem("spurtUser",JSON.stringify(result.data.data.user));
                        Router.push('/account/genratemloyal');
        }

    }else{
     
    }

};