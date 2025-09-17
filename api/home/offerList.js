import axios from "axios"
import { getOffers } from "../../store/collection/action"
import APIServices from '../../services'
export async function offerApi(promotionProductYid, setData) {
  


     const result = await APIServices.getAll('product/product-detail/'+promotionProductYid)
    // http://192.168.100.59:8000/api/product/product-detail/574
    // sessionStorage.setItem("offerresult", JSON.stringify(result.data));

    
    if (result?.data?.data) {
        setData(result.data.data);
        
    }
    
}

export async function productApi(productId, setData) {
    const result = await APIServices.getAll('product/product-detail/'+productId)
    
    if (result?.data?.data) {
        setData(result.data.data);
        
    }
}