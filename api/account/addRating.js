import  Router  from "next/router";
import { modalSuccess } from "../intercept";
import APIServices from '../../services'
export async function UserAddRating(productId,orderProductId,review,rateValue,filePath,imageContainer) {
   console.log(filePath, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
    const data = JSON.stringify({
        productId: productId,
            orderProductId: orderProductId,
            reviews: review,
            rating: rateValue,
            reviewImages: filePath,
            imageContainer
    })
  console.log(data)
    const result =await APIServices.create('orders/add-rating',data)
    
    if (result && result.data && result.data.status === 1) {
  

                
                modalSuccess('success',"Review submitted successfully")
                Router.push("/account/customer-orders")
    }else{
        
    }

}