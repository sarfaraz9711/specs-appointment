import APIServices from '../../services'


export async function customerOrderDetailApi(orderId,setOrderDetailInfo,setOrderLoading) {

    const result=await APIServices.getAll('order/customer/order-detail?orderId='+orderId)
    if(result&&result.data&&result.data.data){
        setOrderDetailInfo(result.data.data)
            setOrderLoading(false)

    }
    
}

export async function getPaymentPluginId(pluginId) {
    console.log("ORDERID", pluginId)
    const result = await APIServices.get(`common-list/get-payment-name/${pluginId}`);
    console.log("show data of payment", result)
    return result.data.data;
}