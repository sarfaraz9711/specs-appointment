import APIServices from '../../services'
export async function getPaymentApi() {

    // fetch(apiUrl + '/list/get-payment-setting?keyword=payment', {
    //     method: 'GET',
    // })
    // .then(json => {       
    //     if(json.data){
    //         setPaymentOption(json.data)
    //     }             
    // })

    const result= await APIServices.getAll('list/get-payment-setting?keyword=payment')
    if(result&&result.data&&result.data.data ){
        return result.data.data
        
    }
}