import APIServices from '../../services'


export async function orderListApi(limit,offset,setOrderData,searchVal,count,setOrderLoader,setCount,status) {
 
    // fetch(apiUrl + '/orders/order-list?limit='+limit+'&offset='+offset+'&keyword='+searchVal+'&count=0'+"&status="+status, {
    //     method: 'GET',
    // })
    // .then(json => {
    //         if(json.status===1&&json.message!=="Successfully get Count. "){
    //             setOrderData(json.data)
    //             setOrderLoader(false)
    //         }      
    //         if(json.message==="Successfully get Count. "){
    //             setCount(json.data)
    //         }
    // })
    const result =await APIServices.getAll('orders/order-list?limit='+limit+'&offset='+offset+'&keyword='+searchVal+'&count=0'+"&status="+status)

    if(result&&result.data&&result.data.status===1&&result.data.message !=="Successfully get Count. ") {
        setOrderData(result.data.data)
        setOrderLoader(false)
    }
    if(result&&result.data&&result.data.message==="Successfully get Count. "){
        setCount(result.data.data)

    }

}