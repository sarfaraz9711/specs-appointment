import { getBrands } from "../../store/product/action"
import APIServices from '../../services'
export async function ManufacturerApi(dispatch,setBrands,categorySlug) {
    
    // return await fetch(apiUrl+'/manufacturers/manufacturerlist?limit=0&offset=0&keyword=&categorySlug='+categorySlug,{
    //     method: 'GET',
    // })
    // .then(json => {
    
    //     dispatch(getBrands(json.data))
    //     setBrands(json.data)
    // })
    let result =  {"data":{"status":1,"message":"Successfully got all the manufacturer List","data":[{"manufacturerId":1,"name":"Redchief","image":"Img_1669979499066.png","imagePath":"manufacturer/","sortOrder":1,"isActive":1}]},"status":200,"statusText":"OK"}
    // if(!localStorage.getItem("manufacturerlist")){
    // result= await APIServices.getAll('manufacturers/manufacturerlist?limit=0&offset=0&keyword=&categorySlug='+categorySlug)
    // localStorage.setItem("manufacturerlist",JSON.stringify(result))
    // }else{
    // result = JSON.parse(localStorage.getItem("manufacturerlist"))
    // }
    if(result&&result.data&&result.data.data){
              dispatch(getBrands(result.data.data))
        setBrands(result.data.data)
    }


}
