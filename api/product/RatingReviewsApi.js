import APIServices from '../../services'
export async function ProductReviewRatingviewsApi(productSlug,setProduct) {
   
 const result=await APIServices.getAll(`product-store/productdetail/${productSlug}?id=${productSlug}`)
   
    if(result){
            setProduct(result.data.data)
    }
}



export async function productRatingCountStarApi(productId,setStarcoutid) {
 
    const result = await APIServices.getAll('product-store/get-rating-statistics?productId='+productId)

    if(result && result.data && result.data.data){
       
        setStarcoutid(result.data.data)
       

    }
}


export async function productAllReviewRatingViewsApi(setproductratinreviews,productId) {
 
    const result = await APIServices.getAll('product-store/get-product-rating-count?productId='+productId)

    if(result && result.data && result.data.data){
      
        // setStarcoutid(result.data.data)
        setproductratinreviews(result.data.data)

    }
}

