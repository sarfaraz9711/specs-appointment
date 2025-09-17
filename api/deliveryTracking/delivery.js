import APIServices from '../../services';
import { modalSuccess,modalError } from "../intercept";


export async function getCODAvailableOnPincode(pinCode,setMethod,selection, getType){
    





    if(pinCode == ""){
        modalError('error',"Please select delivery address.");
        setMethod("");
        return false;
    }else{
        setMethod(selection)
    }
    const getCODAvailable = async (del,ecom)=>{


        if(del.isCODAvailable || ecom.isCODAvailable){
            return "1";
        }else if(!del.isCODAvailable && !ecom.isCODAvailable){
            //modalError('error',"COD not available on this pincode.");
            return "2";
        }



        // if(Object.keys(del).length == 0 && Object.keys(ecom).length == 0){
        //     modalError('error',"COD not available on this pincode.");
        //     return "2";
        // }else if((Object.keys(del).length > 0) && (Object.keys(ecom).length > 0)){
        //     if(del.isCODAvailable || ecom.isCODAvailable){
        //         return "1";
        //     }else if(!del.isCODAvailable && !ecom.isCODAvailable){
        //         modalError('error',"COD not available on this pincode.");
        //         return "2";
        //     }
        // }else if((Object.keys(del).length > 0)){
        //     if(del.isCODAvailable){
        //         return "1";
        //     }else if(!del.isCODAvailable){
        //         modalError('error',"COD not available on this pincode.");
        //         return "2";
        //     }
        // }else if((Object.keys(ecom).length > 0)){
        //     if(ecom.isCODAvailable){
        //         return "1";
        //     }else if(!ecom.isCODAvailable){
        //         modalError('error',"COD not available on this pincode.");
        //         return "2";
        //     }
        // }
    }
 
    const getDelhiveryData  = async (pincode)=>{
        try{
            const result = await APIServices.get('order-tracking/secure/get-delhivery-availability/'+pincode);
            return (result.data.status == 200) ? result.data.data: {};
            //modalSuccess('error',);
        }catch(e){
            return {}
        }
    }

    const getEcomData  = async (pincode)=>{
        try{
            const result = await APIServices.get('order-tracking/secure/get-ecom-availability/'+pincode);
            console.log("error1",result);
            return (result.data.status == 200) ? result.data.data: {};
            
            //modalSuccess('error',);
        }catch(e){
            //console.log("error2");
            return {}
        }
    }
    
    if(getType == 'delhivery'){
        let del = await getDelhiveryData(pinCode);
        //console.log("del-ecom",del,{});
        let _b = await getCODAvailable(del,{});
        console.log("_b",_b);
        return _b;
    }else if(getType == 'ecom'){
        let ecom = await getEcomData(pinCode);
        //console.log("del-ecom",{},ecom);
        let _b = await getCODAvailable({},ecom);
        console.log("_b",_b);
        return _b;
    }
}




export async function getDeliveryAvailableOnPincode(pinCode,setMethod,selection,getType){
    
    if(pinCode == ""){
        modalError('error',"Please select delivery address.");
        setMethod("");
        return false;
    }else{
        setMethod(selection)
    }




    const getDeliveryAvailable = async (del,ecom)=>{

        if(del.isDeliveryAvailable || ecom.isDeliveryAvailable){
            return "1";
        }else if(!del.isDeliveryAvailable && !ecom.isDeliveryAvailable){
            //modalError('error',"Delivery not available on this pincode.");
            return "2";
        }


        // if(Object.keys(del).length == 0 && Object.keys(ecom).length == 0){
        //     modalError('error',"Delivery not available on this pincode.");
        //     return "2";
        // }else if((Object.keys(del).length > 0) && (Object.keys(ecom).length > 0)){
        //     if(del.isDeliveryAvailable || ecom.isDeliveryAvailable){
        //         return "1";
        //     }else if(!del.isDeliveryAvailable && !ecom.isDeliveryAvailable){
        //         modalError('error',"Delivery not available on this pincode.");
        //         return "2";
        //     }
        // }else if((Object.keys(del).length > 0)){
        //     if(del.isDeliveryAvailable){
        //         return "1";
        //     }else if(!del.isDeliveryAvailable){
        //         modalError('error',"Delivery not available on this pincode.");
        //         return "2";
        //     }
        // }else if((Object.keys(ecom).length > 0)){
        //     if(ecom.isDeliveryAvailable){
        //         return "1";
        //     }else if(!ecom.isDeliveryAvailable){
        //         modalError('error',"Delivery not available on this pincode.");
        //         return "2";
        //     }
        // }
    }
 
    const getDelhiveryData  = async (pincode)=>{
        try{
            const result = await APIServices.get('order-tracking/secure/get-delhivery-availability/'+pincode);
            return (result.data.status == 200) ? result.data.data: {};
            //modalSuccess('error',);
        }catch(e){
            return {}
        }
    }

    const getEcomData  = async (pincode)=>{
        try{
            const result = await APIServices.get('order-tracking/secure/get-ecom-availability/'+pincode);
            //console.log("error1",result);
            return (result.data.status == 200) ? result.data.data: {};
            
            //modalSuccess('error',);
        }catch(e){
            //console.log("error2");
            return {}
        }
    }



    if(getType == 'delhivery'){
        let del = await getDelhiveryData(pinCode);
        console.log("del-ecom",del,{});
        let _b = await getDeliveryAvailable(del,{});
        return _b;
    }else if(getType == 'ecom'){
        let ecom = await getEcomData(pinCode);
        console.log("del-ecom",{},ecom);
        let _b = await getDeliveryAvailable({},ecom);
        return _b;
    }
    // let del = await getDelhiveryData(pinCode);
    // let ecom = await getEcomData(pinCode);

    // let _b = await getDeliveryAvailable(del,ecom);
    // return _b;
}