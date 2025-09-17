import { getCompareList, compareLoading, getCompareListcompare } from "../../store/compare/action";
import { modalWarning, modalSuccess } from "../intercept";
import APIServices from '../../services'

export async function productCompareApi(idArray,data,setCompareData,dispatch,setCompareStatus,setloadings,compareTrues) {        const result= await APIServices.getAll( 'product-store/product-compare?data='+data+'&productId='+idArray)

        if(result.data){
            setloadings(true)
            if(data===0){
                if(result&&result.data&&result.data.status===1 && result.data.message !== "please choose same category product"){
                    localStorage.setItem("compareId",JSON.stringify(idArray))
                    dispatch(getCompareList(1))
                            setCompareStatus(1)  
                }

            }

        
            
            if(result&&result.data&&result.data.message==="please choose same category product"){
                modalWarning('error',result.data.message);

            }
            else{

                if(data===0 && result.data.status){
                    // modalWarning('warning',json.message);
                    // modalSuccess('success',json.message)
                }
            }
            if(result&&result.data&&result.data.status){
                if(compareTrues==true){
                result.data.message!=="please choose same category product" && modalSuccess('success',result.data.message)
                
                }
                if(data===1){
                  
                    // dispatch(getCompareListcompare(result.data.data))
                    setCompareData(result.data.data)
                    dispatch(compareLoading(false))
                }  
            } 
    }
}