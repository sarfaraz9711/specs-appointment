import APIServices from '../../services'
export async function RelatedProductApi(productId,setRelatedProduct) {



    const result = await APIServices.getAll('list/related-product-list-ids?productId='+productId)

    if(result&&result.data&&result.data.data){
        const pids = result.data.data;
        const products =await APIServices.getAll(`list/custom-product-list?productIds=${pids}`)
        
        if(products.data.status==1){
            setRelatedProduct(products.data.data)
        }
    }


}