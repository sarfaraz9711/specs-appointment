import APIServices from '../../services'


export async function orderDetailApi(orderProductId,setOrderDetailInfo,setOrderLoading) {

    const result=await APIServices.getAll('orders/order-detail?orderProductId='+orderProductId)
    if(result&&result.data&&result.data.data){
        setOrderDetailInfo(result.data.data)
            setOrderLoading(false)

    }
}

export async function orderCancelApi(cancelOrderObj, setLoaderActive) {

    const result=await APIServices.create('unicommerce/partial-cancel-sale-order', cancelOrderObj)
    setLoaderActive(false)
return result.data
}

export async function returnOrderApi(returnOrderObj, setLoaderActive){
    const result = await APIServices.create('orders/order-return',returnOrderObj)
    setLoaderActive(false)
    return result.data
}

export async function returnFullOrder(returnOrderObj, setLoaderActive){
    const result = await APIServices.create('orders/return-full-order',returnOrderObj)
    setLoaderActive(false)
    return result.data
}

export async function getOrderHistoryStatus(orderProductId){
    const result = await APIServices.get(`order-status-history/get-data-by-order-product-id/${orderProductId}`)
    return result.data
}