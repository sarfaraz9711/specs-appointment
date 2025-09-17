import APIServices from '../../services'

export async function trackOrderApi(orderProductId, setOrderTrack, setTrackLoading) {

    // fetch(apiUrl + '/orders/track-order-product?orderProductId='+orderProductId, {
    //     method: 'GET',
    // })
    //     .then(json => {
    //         if(json.data){
    //             setOrderTrack(json.data)
    //             setTrackLoading(false)
    //         }
    //     })


    const result = await APIServices.getAll('orders/track-order-product?orderProductId=' + orderProductId)
    if (result && result.data && result.data.data) {
        setOrderTrack(result.data.data)

        setTrackLoading(false)
    }

}

export async function trackOrderStatusApi(orderId) {
    console.log("ORDERID", orderId)

    const data = {
        orderId: orderId
    };

    const result = await APIServices.create('order-tracking/secure/get-tracking', data)
    console.log("track order result", result)

    if (result && result.data && result.data.status == '200') {
        return result.data.data
    } else {
        return []
    }


}


export async function getReplacementProductOption(productId){

    const result = await APIServices.get(`product/get-replacement-product-option/${productId}`)
    return result.data

}