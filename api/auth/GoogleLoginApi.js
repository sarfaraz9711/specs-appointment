import { login } from "../../store/auth/action";
import { cartListApi } from "../cart/cartList";
import getProfileApi from "../home/getInfo";
import APIServices from '../../services'
import { modalSuccess,modalWarning } from "../intercept";
import { UserOauthLogin } from "./oAuthLogin";


export async function GoogleLoginApi(mail, password, gmail,setgoogleId,setgooglePath,googleId,googlePath,profie,Router,res){
    
    // return fetch(apiUrl+'customer/login', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         'emailId':email, 'password': password,"type":loginType
    //     })
    // })
    //     .then((response) => {
    //             if (response.status === 1) {
                   
    //                 localStorage.setItem("spurtToken", response.data.token);
    //                 // localStorage.setItem("spurtUser",JSON.stringify(response.data.user));
    //                 getProfileApi( )
    //                 modalSuccess('success',response.message)
    //                 Router.push('/');
    //                 cartListApi(dispatch)
                    
                  
    //             } else {
    //                 setLoginError(response.message)
    //                 modalWarning('error',response.message)
    //                 setMail("")
    //                 setPassword("")
                   
    //             }
    //     })

    const data = JSON.stringify({
        emailId:mail, 
        password: password,
        type:gmail
    })
    const result =await APIServices.create('customer/login',data)
    console.log(result?.data,'response45');
    if(result&&result.data&&result.data.status === 1){
        if(result.data.data.clientId&&result.data.data.returnPath){
            UserOauthLogin(profie,Router,res,result.data.data.clientId,result.data.data.returnPath)
        }
       
      
    }else{
       
        
    }
    

};