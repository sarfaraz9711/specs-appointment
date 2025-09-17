import { modalWarning, modalSuccess } from "../intercept"
import APIServices from '../../services'


export async function editProfileApi(fname,lname,email,num,Router,newDp,setButtonLoader,setimpuploadsuccess){     
    //     fetch(apiUrl+'/customer/edit-profile',{
    //     method: 'POST',
    //     body: JSON.stringify({
    //         firstName:fname,
    //         lastName:lname,
    //         emailId:email,
    //         image:newDp,
    //         phoneNumber:num,
    //     }) 
    // }) 
    // .then((json)=>{
    //     setButtonLoader(false)
    //     if (json.status === 1) {
    //         modalSuccess('success',json.message)
    //         localStorage.setItem("spurtUser",JSON.stringify(json.data)) 
    //         Router.push('/')
    //     } else {
    //         modalWarning('error',json.message);
    //     }
    //     return json
    // })    
    
   const data=JSON.stringify({
            firstName:fname,
            lastName:lname,
            emailId:email,
            image:newDp,
            phoneNumber:num,

   })

   const result= await APIServices.create('customer/edit-profile',data)
   setButtonLoader(false)
   if(result&&result.data&&result.data.status === 1){
    modalSuccess('success',result.data.message)
            localStorage.setItem("spurtUser",JSON.stringify(result.data.data)) 
            Router.push('/')

   }else{
    modalWarning('error',result.data.message);
   }
   setimpuploadsuccess(false)
   return result.data

}