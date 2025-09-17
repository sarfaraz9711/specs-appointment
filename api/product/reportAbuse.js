import { modalSuccess, modalWarning } from "../intercept"
import {apiUrl} from '../url'
import APIServices from '../../services'
export async function abuseReportApi(remark,answerId,reasonId,setShowModal,setRemark,setReasonId) {
    // fetch(apiUrl+'/store-question-answer/add-report-abuse', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "remark":remark,
    //         "answerId":answerId,
    //         "reasonId":reasonId  
    //     })
    // })
    // .then(json => {
    //     if (json) {
    //         if (json.status===1) {
                
    //             setShowModal(false)
    //             modalSuccess('success',json.message)
    //             setRemark("")
    //             setReasonId("")
    //         }
    //         else{
    //             modalWarning('error',json.message)
    //         }
    //     }
    // })

    const data =  JSON.stringify({
                remark:remark,
                answerId:answerId,
                reasonId:reasonId  
            })

    const result =  await APIServices.create('store-question-answer/add-report-abuse',data)

    if(result && result.data){
        if (result.data.status===1) {                
                        setShowModal(false)
                        modalSuccess('success',result.data.message)
                        setRemark("")
                        setReasonId("")
                    }
                    else{
                        modalWarning('error',result.data.message)
                    }
    }
}