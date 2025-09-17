import { changeCurrency, footerPage, maintenanceState } from "../../store/setting/action"
import APIServices from '../../services'
import Router from "next/router";
async function getProfileApi(dispatch) {
    
        // await fetch(apiUrl+'/settings/get-settings', {
        //     method: 'GET',
        // })
        // .then(json => {
        //     if(json.data){
        //         dispatch(footerPage(json.data[0]))
        //         dispatch(changeCurrency({symbol:json.data[0].symbolLeft,text:json.data[0].currencyCode}))
        //         dispatch(maintenanceState(json.data[0].maintenanceMode))
        //     }
         
        // })    
        let result
        if(!sessionStorage.getItem("getSeeting") || localStorage.getItem("checkSessionDate")!=(new Date().getDate())){
        result = await APIServices.getAll('settings/get-settings')
        sessionStorage.setItem("getSeeting",JSON.stringify(result))
         }else{
            result=JSON.parse(sessionStorage.getItem("getSeeting"))
        }
        if(result && result.data && result.data.data){
            dispatch(footerPage(result.data.data[0]))
                    dispatch(changeCurrency({symbol:result.data.data[0]?.symbolLeft,text:result.data.data[0].currencyCode}))
                    dispatch(maintenanceState(result.data.data[0].maintenanceMode))
                    if(result.data.data[0].maintenanceMode === 1 && !sessionStorage.getItem("maintenance")){
                        Router.push('/maintenance')
                    }       
        }
}
export default getProfileApi