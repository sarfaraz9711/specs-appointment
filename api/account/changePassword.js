import { modalSuccess, modalWarning } from "../intercept";
import APIServices from '../../services'
export async function changePasswordApi(oldPass,newPass,setPassButtonLoader,setOldPass,setNewPass,setOldPassError,setNewPassError,setPassSubmit){   

    const data = JSON.stringify({
        oldPassword:oldPass,
                newPassword:newPass,    
    })
    const result =await APIServices.create('customer/change-password',data)
   
    if(result && result.data){
        setPassButtonLoader(false)
    
    if (result && result.data && result.data.status === 1) {
  
        modalSuccess('success',result.data.message)
                setOldPass("")
                setNewPass("")
                setOldPassError("")
                setNewPassError("")
                setPassSubmit(0)
    }else{

        modalWarning('error',result.data.message);
            setOldPass("");
            setNewPass("");
            setOldPassError("");
            setNewPassError("");
            setPassSubmit(0);

    }
    return result.data //unwanted
}
}

export async function changeMigUserPasswordApi(oldPass,newPass,setPassButtonLoader,setOldPass,setNewPass,setOldPassError,setNewPassError,setPassSubmit, id){   

    const data = JSON.stringify({
        oldPassword:oldPass,
                newPassword:newPass,  
                id:id  
    })
    const result =await APIServices.create('customer/mig-user-change-password',data)
   
    if(result && result.data){
        setPassButtonLoader(false)
    
    if (result && result.data && result.data.status === 1) {
  
        modalSuccess('success',result.data.message)
                setOldPass("")
                setNewPass("")
                setOldPassError("")
                setNewPassError("")
                setPassSubmit(0)
    }else{

        modalWarning('error',result.data.message);
            setOldPass("");
            setNewPass("");
            setOldPassError("");
            setNewPassError("");
            setPassSubmit(0);

    }
    return result.data //unwanted
}
}