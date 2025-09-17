import { modalSuccess } from "../intercept"
import APIServices from '../../services'
export async function CancelRequestApi(orderProductId,desc,selectValue,setDesc,setSelectError,setDescError,setSubmit,setSelectValue,Router) {
    // fetch(apiUrl+'/orders/order-cancel-request', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "orderProductId": orderProductId,
    //         "description": desc,
    //         "reasonId": selectValue,    
    //     })
    // })
    //     .then(json => {
    //         if (json) {
    //             if (json.status === 1) {
    //                 Router.push("/account/myorders")
    //                 modalSuccess('success', json.message)
    //                 setDesc("")
    //                 setSelectError("")
    //                 setSelectValue("")
    //                 setDescError("")
    //                 setSubmit(0)
    //             }
    //         }
    //     })
    const data = JSON.stringify({
        
            orderProductId: orderProductId,
            description: desc,
            reasonId: selectValue,    
    })
    const result =await APIServices.create('orders/order-cancel-request',data)
    
    if (result && result.data && result.data.status === 1) {
  
        Router.push("/account/customer-orders")
                        modalSuccess('success', result.data.message)
                        setDesc("")
                        setSelectError("")
                        setSelectValue("")
                        setDescError("")
                        setSubmit(0)
    }
}