import { getProductsById, getProductByLoading } from "../../store/product/action";
import { questionsApi } from "./question";
import { ViewAllQuestionApi } from "./viewAllQuestionApi";
import { productRatingCountStarApi } from "./productRatingCountStar";
import APIServices from '../../services';
// import {syncInventoryBySku} from '../../api';
export async function getProductDetApi(productSlug,categorySlug,dispatch,setPriceChartInfo,setQuestionInfo,setBreadCategory,setstarcoutid) {
    
    const result=await APIServices.getAll(`product-store/productdetail/${productSlug}?id=${productSlug}&categorySlug=${categorySlug===undefined?"":categorySlug}`)
   
    if(result&&result.data&&result.data.data){
       console.log("result.data.data+++++++++++++++++++++++++++++",result.data.data)
            dispatch(getProductsById(result.data.data))
            setBreadCategory(result.data.data.Category.length > 1? result.data.data.Category.splice(1): result.data.data.Category)
            dispatch(getProductByLoading(false))
            setstarcoutid(result.data.data.productId)
            setPriceChartInfo(result.data.data.productTirePrices)
            // if(result.data.data && result.data.data.productvarientList && result.data.data.productvarientList.length>0){
            //     const skuList = result.data.data.productvarientList.map(obj => obj.skuName);
            //     const payload={"itemTypeSKUs":skuList}
            //      syncInventoryBySku(payload)
            // }

    }
}

export async function getProductDetailsApi(productSlug, dispatch) {
    
    const result=await APIServices.getAll(`product-store/productdetail/${productSlug}?id=${productSlug}&categorySlug=`)
   
    if(result&&result.data&&result.data.data){
        console.log("result.data.data",result.data.data)
            dispatch(getProductsById(result.data.data))
            dispatch(getProductByLoading(false))

    }
}

export async function getRecentViewProducts(setRecentViewProducts) {
    
    const result=await APIServices.getAll(`product-store/get-customer-recent-view-products`)
   
    if(result&&result.data&&result.data.data){
        const pids = result.data.data;
        const products =await APIServices.getAll(`list/custom-product-list?productIds=${pids}`)
        
        if(products.data.status==1){
            setRecentViewProducts(products.data.data)
        }
    }
}

