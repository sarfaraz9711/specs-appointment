
import APIServices from '../../services'

export async function searchListApi(keyword,setSearchList,offset){
  
        const result= await APIServices.getAll("product-store/search-product-by-keyword?keyword="+keyword+'&limit=10'+'&offset='+offset)
    if(result&&result.data&&result.data.status===1){
    
        setSearchList(result.data.data)
      
    }

    
    
   

}