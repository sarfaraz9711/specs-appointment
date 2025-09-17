
import APIServices from '../../services'
export async function abuseListApi(setAbuseReason) {

    // fetch(apiUrl + '/store-question-answer/abuse-reason-list', {
    //     method: 'GET',
    // })
    // .then(json => {
    //     setAbuseReason(json.data)            
    // })

    const result = await APIServices.getAll('store-question-answer/abuse-reason-list')
    if(result && result.data && result.data.data){
        setAbuseReason(result.data.data)  
    }
}