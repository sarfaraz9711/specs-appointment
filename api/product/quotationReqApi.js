import { modalSuccess, modalWarning } from "../../api/intercept"

import APIServices from '../../services'
export async function quotationReq(productId, quantityVal, unit, orderVal, need, comments, setShowModal, setQuantityVal, setQuantError, setUnit, setUnitError, setOrderVal, setOrderValError, setNeed, setNeedError, setComments, setCommentsError, setSubmit, closeModal) {
    // fetch(apiUrl+'/quotation/quotation-request', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "productId": productId,
    //         "quantity": quantityVal,
    //         "quantityUnit": unit,
    //         "orderValue": orderVal,
    //         "purpose":need,
    //         "comments":comments  
    //     })
    // })
    //     .then(json => {
    //         if (json) {
    //             if (json.status===1) {
    //                 setSubmit(0)
    //                 setShowModal(false)
    //                 modalSuccess('success',json.message) 
    //                 closeModal()
    //             }
    //             else{
    //                 closeModal()
    //             }
    //         }
    //     })


    const data = JSON.stringify({
        productId: productId,
        quantity: quantityVal,
        quantityUnit: unit,
        orderValue: orderVal,
        purpose: need,
        comments: comments
    })
   
    const result = await APIServices.create('quotation/quotation-request', data)
   
    if (result && result.data.status == 1) {
        setSubmit(0)
        setShowModal(false)
        modalSuccess('success', result.data.message)
        closeModal()
    } else {
        closeModal()
    }


}

export async function quotationListApi(setQuotationData,setQuotationLoader) {

    const result= await APIServices.getAll('quotation/quotation-request-list?limit=0&offset=0&count=0')
    if(result&&result.data&&result.data.status===1){
                setQuotationData(result.data.data)
            setQuotationLoader(false)

    }
}