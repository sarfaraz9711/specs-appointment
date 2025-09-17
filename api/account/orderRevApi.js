import APIServices from '../../services'

export async function orderRevDetailApi(orderProductId,setOrderDetailInfo,setRevLoader) {
  
    // fetch(apiUrl + '/orders/order-detail?orderProductId='+orderProductId, {
    //     method: 'GET',
    // })
    // .then(json => {
    //     if(json.data){
    //         setOrderDetailInfo(json.data)
    //         setRevLoader(false)
    //     }
    // })
   
    const result= await APIServices.getAll('orders/order-detail?orderProductId='+orderProductId)

    if(result&&result.data&&result.data.data){
        setOrderDetailInfo(result.data.data)
                setRevLoader(false)

    }

}