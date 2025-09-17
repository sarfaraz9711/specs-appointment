import {  getProductVariantsBasedOnParentCat } from "../../store/filter/action";
import APIServices from '../../services'

export async function getProductVariants(dispatch, categoryName) {

    const result = await APIServices.get(`varients/varients-detail-by-category?category=${categoryName}`)
    console.log(result, "Nero Result")
    if(result && result.data && result.data.data){
        //dispatch(getProductCategories(result.data.data)); 
        sessionStorage.setItem("filterData",JSON.stringify({productVariants:result.data.data}))
        dispatch(getProductVariantsBasedOnParentCat(result.data.data))
    }
}