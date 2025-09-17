import {modalSuccess} from "../intercept"
import APIServices from '../../services'

export async function removeFromCartApi(id,price,optionIdArrayValue,skuName,variantId,variantName, setItemRemoveProduct) {

//     fetch(apiUrl+'/customer-cart/add-cart', {
//             method: 'POST',
//             body: JSON.stringify({
//                     "productId": id,
//                     "productPrice":price,
//                     "quantity":0 ,
//                     "productOptionValueId" :optionIdArrayValue,
//                     "type":"new",
//                     "optionValueName": "",
//                     "productVarientOptionId":variantId,
//                     "varientName":variantName,
//                     "skuName":skuName,
//             })
//     })
//     .then(json=>{
//         if(json.status===1){
//                 modalSuccess('success',json.message)
//         }
//     })


const data = JSON.stringify({
                    productId: id,
                    productPrice:price,
                    quantity:0 ,
                    productOptionValueId :optionIdArrayValue,
                    type:"new",
                    optionValueName: "",
                    productVarientOptionId:variantId,
                    varientName:variantName,
                    skuName:skuName,
    })
    const result =await APIServices.create('customer-cart/add-cart',data)
    if(result&&result.data&&result.data.status===1){
        setItemRemoveProduct(id);
        // modalSuccess('success',result.data.message)
    }
   
    

}