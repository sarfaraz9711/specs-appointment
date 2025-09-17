import APIServices from '../../services'


export async function orderExportApi(id,prefixid, setLoaderActive) {

    // fetch(apiUrl + '/orders/order-export-pdf?orderProductId='+id, {
    //     method: 'GET',
    // })
    // .then(json => {
        // if(json){        
        //     var a = document.createElement("a"); //Create <a>
        //     a.href = json.data //Image Base64 Goes here
        //     a.download = "Invoice"; //File name Here
        //     a.click()
        //     setLoadImg(false)
        //     }
    // })
    const d = new Date();
     let time = d.getTime();
    const result =await APIServices.getAll(`order/order-export-pdf?orderId=${id}&orderPrefixId=${prefixid}`)
    if(result&&result.data){
        var a = document.createElement("a"); //Create <a>
            a.href = result.data.data //Image Base64 Goes here
            a.download = "Invoice_"+prefixid+"_"+time; //File name Here
            a.click()
            
            setLoaderActive(false)
            }else{
                setLoaderActive(false)
            }
    

}

export async function migOrderInvoiceApi(orderPrefixId) {
    const result =await APIServices.getAll(`unicommerce/get-uc-invoice?saleOrder=${orderPrefixId}`)
    return result
}
