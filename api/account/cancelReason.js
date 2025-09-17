import APIServices from '../../services'
export async function cancelReasonApi(setCancelReason) {

    // fetch(apiUrl + '/orders/order-cancel-reason-list?limit=&offset=&count=', {
    //     method: 'GET',
    // })
    //     .then(json => {
    //         setCancelReason(json.data)
    //     })

    const result = await APIServices.getAll('orders/order-cancel-reason-list?limit=0&offset=0&count=0')

        
        if(result && result.data && result.data.data){
            
            setCancelReason(result.data.data)
        }

}