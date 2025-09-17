import { getTotalProducts } from "../../store/product/action";
import APIServices from '../../services'


export async function productCountApi(dispatch,setCount,price,orderBy,search,categoryInitial,manuId,limit,priceToInitial,priceFromInitial) {
    // console.log(dispatch,"ba4prest")
    // fetch(apiUrl + '/list/product-count?limit='+limit+'&offset=0&manufacturerId='+manuId+'&categoryslug='+categoryInitial+'&priceFrom='+ priceFromInitial+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=true', {
    //     method: 'GET',
    // })
    //     .then(json => {
    //         console.log(json,"ba4prest")
            
    //         dispatch(getTotalProducts(json.data.productCount));
    //         setCount(json.data.productCount)
    //         // setMaxPrice(json.data.maximumProductPrice)
    //     })

    const result =  await APIServices.getAll('list/product-count?limit='+limit+'&offset=0&manufacturerId='+manuId+'&categoryslug='+categoryInitial+'&priceFrom='+ priceFromInitial+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=true')
    if(result && result.data && result.data.data){
        dispatch(getTotalProducts(result.data.data.productCount));
                setCount(result.data.data.productCount)
                // setMaxPrice(json.data.maximumProductPrice)
    }
}