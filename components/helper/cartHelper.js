// import { toast } from "react-toastify";
import toast from "../../api/toast/";
import { priceHelpFunc } from "./priceHelper";

export function cartAdd(payload, quantity, availValue, parentCategoryName) {
  
    let product = payload;
    if (product.flag !== "") {
        product.price = priceHelpFunc(product.pricerefer, product.taxType, product.taxValue, "")
    }
    if (product.flag === "") {
        product.price = priceHelpFunc(product.price, product.taxType, product.taxValue, "")
    }

    const localCart = JSON.parse(localStorage.getItem('cartItem'))
    // .cart;
    
    let currentCart = localCart;
    if(currentCart===null){
        currentCart=[]
    }
    let existItem = currentCart&&currentCart.find(
        (item) => item.productId === product.productId  && item.skuName === product.skuName
    );
    
    let existItemsArray = currentCart&&currentCart.filter(
        (item) => item.skuName === product.skuName
    );

    
    if (existItem) {
      
        if(product.optionName.length!==0){
            
            let existObject=existItemsArray&&existItemsArray.find(
                (item) => JSON.parse(item.optionName)?.optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString()

            );
            if(existObject!==undefined){
                existItem=existObject
            }

        }
        


       
        // existItem.quantity += product.quantity;
       
        
        let productOptName=JSON.parse(product.optionName)
        let existOptName=JSON.parse(existItem.optionName)

       


        if (JSON.stringify(productOptName.optionValueArray)!==JSON.stringify(existOptName?.optionValueArray) ) {
          
            
            product.quantity = quantity;
            currentCart.push(product);

 
        }
        else {
            if (product.hasTirePrice === 1) {
                const totalQuantity=existItem.quantity+quantity
                
                if(product.maxQuantityAllowedCart!==null&&totalQuantity<=product.maxQuantityAllowedCart){
                    existItem.quantity += quantity;

                


                if(product.productTirePrices.length!==0){
                    product.productTirePrices.sort(function (a, b) {
                        return a.quantity - b.quantity
                    })
                    
                    var min = product. productTirePrices[0]
                    var min2=product.productTirePrices[1]
                    var min3=product.productTirePrices[2]
                    var min4=product.productTirePrices[3]
 
                    for(let i=1;i<=product.productTirePrices.length;i++){

                        if(i===1){
                            if(totalQuantity<min.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(product.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(product.price,product.taxType,product.taxValue,product.availValue)
                            }
                            if(totalQuantity>=min.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)
                            }

                        }

                        if(i===2){
                            if(totalQuantity>=min&&totalQuantity<min2.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)

                            }

                            if(totalQuantity>=min2.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue)
                              

                            }
                        }

                        if(i===3){
                            if(totalQuantity>=min&&totalQuantity<min2.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)

                            }

                            if(totalQuantity>=min2.quantity&&totalQuantity<min3.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue)

                            }
                            if(totalQuantity>=min3.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue)

                            }
                        }

                        if(i===4){
                            if(totalQuantity>=min&&totalQuantity<min2.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)

                            }

                            if(totalQuantity>=min2.quantity&&totalQuantity<min3.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue)

                            }
                            if(totalQuantity>=min3.quantity&&totalQuantity<min4.quantity){
                                existItem.price=product.flag===""?priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue)

                            }
                            if(totalQuantity>=min4){
                                existItem   .price=product.flag===""?priceHelpFunc(min4.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min4.price,product.taxType,product.taxValue,product.availValue)

                            }

                        }

                    }

                   
                }
                }
                else{
                    if(product.maxQuantityAllowedCart===null){
                        existItem.quantity += quantity;

                


                        if(product.productTirePrices.length!==0){
                            product.productTirePrices.sort(function (a, b) {
                                return a.quantity - b.quantity
                            })
                            
                            var min = product. productTirePrices[0]
                            var min2=product.productTirePrices[1]
                            var min3=product.productTirePrices[2]
                            var min4=product.productTirePrices[3]
         
                            for(let i=1;i<=product.productTirePrices.length;i++){
        
                                if(i===1){
                                    if(totalQuantity<min.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(product.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(product.price,product.taxType,product.taxValue,product.availValue)
                                    }
                                    if(totalQuantity>=min.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)
                                    }
        
                                }
        
                                if(i===2){
                                    if(totalQuantity>=min&&totalQuantity<min2.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
        
                                    if(totalQuantity>=min2.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue)
                                        
        
                                    }
                                }
        
                                if(i===3){
                                    if(totalQuantity>=min&&totalQuantity<min2.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
        
                                    if(totalQuantity>=min2.quantity&&totalQuantity<min3.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
                                    if(totalQuantity>=min3.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
                                }
        
                                if(i===4){
                                    if(totalQuantity>=min&&totalQuantity<min2.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
        
                                    if(totalQuantity>=min2.quantity&&totalQuantity<min3.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min2.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
                                    if(totalQuantity>=min3.quantity&&totalQuantity<min4.quantity){
                                        existItem.price=product.flag===""?priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min3.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
                                    if(totalQuantity>=min4){
                                        existItem   .price=product.flag===""?priceHelpFunc(min4.price,product.taxType,product.taxValue,product.availValue):priceHelpFunc(min4.price,product.taxType,product.taxValue,product.availValue)
        
                                    }
        
                                }
        
                            }
        
                           
                        }

                    }
                }


            }
            else {
                
                product.quantity = quantity
                existItem.quantity += product.quantity;
            }
        }


    } else {
        
        product.quantity = quantity;
        currentCart.push(product);


    }
   

  parentCategoryName
  currentCart.map(item=>{
    Object.assign(item, {categoryName:parentCategoryName})
  })
    return localStorage.setItem("cartItem", JSON.stringify(currentCart))
}

export function cartRemove(payload){
    const  product  = payload;
    let localCart = JSON.parse(localStorage.getItem('cartItem'))


if(product && product.optionName && product.optionName.length!==0){
    let existItemsArray = localCart&&localCart.filter(
        (item) => item.skuName === product.skuName
    );

    let existObject=existItemsArray&&existItemsArray.find(
        (item) => JSON.parse(item.optionName)?.optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString()
    );
   
    // if(existObject!==undefined){
    //     existItem=existObject
    // }
    let index=localCart.indexOf(existObject)
    // if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.

        localCart.splice(index, 1);
    //    
    //   
    // // }
    // 


}
else{
    let index = localCart.findIndex(
        (item) => item.skuName === product.skuName
    );

    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
        localCart.splice(index, 1);
    }
   

}


    return localStorage.setItem("cartItem",JSON.stringify(localCart))
}

export function incrementQuantity(payload){

    const modalWarningLimit = (type) => {
        toast({ type: type, message: "You have reached maximum quantity limit" });
      };
    
    const product = payload;
    
        let localCart = JSON.parse(localStorage.getItem('cartItem'))
        
        let selectedItem = localCart.find(
            (item) => {

                return item.variantId === product.variantId
            }
        );
        if(product&&product.productOption&&product.productOption.length!==0){
            

            let existItemsArray = localCart&&localCart.filter(
                (item) => item.skuName === product.skuName
            );
        
            let existObject=existItemsArray&&existItemsArray.find(
                (item) => JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString()
            );
          
            if(existObject.hasTirePrice===1){
                if(existObject.maxQuantityAllowedCart!==null){
                    if(existObject.maxQuantityAllowedCart>=existObject.quantity+1){
                        quantityIncrement(existObject,existObject.productTirePrices,existObject.quantity)
                    }
                }
                else{

                }
            }
            else{
                existObject.quantity++;
            }
        }
        else{
            if (selectedItem) {
                if(selectedItem.hasTirePrice===1){
                    // if(selectedItem.maxQuantityAllowedCart!==null){
                    //     if(selectedItem.maxQuantityAllowedCart>=selectedItem.quantity+1){
                            quantityIncrement(selectedItem,selectedItem.productTirePrices,selectedItem.quantity)
    
                    //     }
    
                    // }
                    // else{
    
                    // }
    
    
                }
                else{
                    // selectedItem.quantity++;
                    if(selectedItem.maxQuantityAllowedCart!==null){
    const checkVarient = selectedItem.productvarientList.filter(item=>item.id==selectedItem.variantId)
    console.log("checkVarient",checkVarient[0]);
    console.log(selectedItem.quantity+1)
    if ((checkVarient[0].maxQuantityAllowedCart>=(selectedItem.quantity + 1)) && (checkVarient[0].quantity>=(selectedItem.quantity + 1))) {
                            selectedItem.quantity++;
                        }else{
                             modalWarningLimit("error");
                            
                            // const modalWarningLimit = (type) => {
                                // toast({ type: type, message: "You have reached maximum quantity limit" });
                            //   };
                            
                        }
    
                    }
                    else{
                        // if(selectedItem.quantity-1>=1){
                            selectedItem.quantity++;
    
                        // }
                        
                    }
                }
                // localCart.cartTotal++;
                // localCart.amount = calculateAmount(localCart.cartItems);
            }

        }
        
        return localStorage.setItem("cartItem",JSON.stringify(localCart))
}

export function decrementQuantity(payload){
   
    const  product  = payload;
    const localCart =JSON.parse(localStorage.getItem('cartItem'));
    let selectedItem = localCart.find(
        (item) => item.variantId === product.variantId
    );
   
    if(product&&product.productOption&&product.productOption.length!==0){
        let existItemsArray = localCart&&localCart.filter(
            (item) => item.skuName === product.skuName
        );
    
        let existObject=existItemsArray&&existItemsArray.find(
            (item) => JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString()
        );
       
        // if(existObject!==undefined){
        //     existItem=existObject
        // }
        // let index=localCart.indexOf(existObject)
        // if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
    
            // localCart.splice(index, 1);
        //  
        //    
        // // }
        //
        if(existObject.hasTirePrice===1){
           
            if(existObject.minQuantityAllowedCart!==null){
               

                if(existObject.quantity-1>=existObject.minQuantityAllowedCart){
                   

                    quantityDecrement(existObject,existObject.productTirePrices,existObject.quantity)
                }

            }
            else{
                if(existObject.quantity-1>=2){
                    existObject.quantity--;

                }
                
            }
        }else{
           
            if(existObject.minQuantityAllowedCart!==null){
               

                if(existObject.quantity-1>=selectedItem.minQuantityAllowedCart){
                   

                    existObject.quantity--;
                }

            }
            else{
                if(existObject.quantity-1>=1){
                    
                    existObject.quantity--;

                }
                
            }

        }
    
    
    }
    else{
        if (selectedItem) {
            
    
            
                if(selectedItem.hasTirePrice===1){
                   
                        if(selectedItem.quantity-1>=selectedItem.minQuantityAllowedCart){
                            quantityDecrement(selectedItem,selectedItem.productTirePrices,selectedItem.quantity)
    
                        }
                        
                   
                }else{
                    if(selectedItem.minQuantityAllowedCart!==null){
                      
    
                        if(selectedItem.quantity-1>=selectedItem.minQuantityAllowedCart){
                          
    
                            selectedItem.quantity--;
                        }
    
                    }
                    else{
                        if(selectedItem.quantity-1>=1){
                           
                            selectedItem.quantity--;
    
                        }
                        
                    }
    
                }
                
        }

    }

    
    return localStorage.setItem("cartItem",JSON.stringify(localCart))

}

export function quantityIncrement(selectedItem,productTirePrices,quantity){
    productTirePrices.sort(function (a, b) {
        return a.quantity - b.quantity
    })
    
    var min =  productTirePrices[0]
    var min2=productTirePrices[1]
    var min3=productTirePrices[2]
    var min4=productTirePrices[3]
   
    selectedItem.quantity++

  if(productTirePrices.length===4){
    if(quantity+1>=min.quantity&&quantity+1<min2.quantity){
       
            selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
        

    }

    if(quantity+1>=min2.quantity&&quantity+1<min3.quantity){
       
        selectedItem.price=priceHelpFunc(min2.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

    }

    if(quantity+1>=min3.quantity&&quantity+1<min4.quantity){
       
        selectedItem.price=priceHelpFunc(min3.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)


    }

    if(quantity+1>=min4.quantity){
       
        selectedItem.price=priceHelpFunc(min4.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
    }

  }
  if(productTirePrices.length===3){
    if(quantity+1>=min.quantity&&quantity+1<min2.quantity){
       
        selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)


    }

    if(quantity+1>=min2.quantity&&quantity+1<min3.quantity){
       
        selectedItem.price=priceHelpFunc(min2.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

        
    }

    if(quantity+1>=min3.quantity){
        // selectedItem.price=min3.price
        selectedItem.price=priceHelpFunc(min3.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)


    }

  }
  if(productTirePrices.length===2){
    if(quantity+1>=min.quantity&&quantity+1<min2.quantity){
        
        selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)


    }

    if(quantity+1>=min2.quantity){
        
        selectedItem.price=priceHelpFunc(min2.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

    }
  }
  if(productTirePrices.length===1){
    if(quantity+1>=min.quantity){
       
        selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)


    }


  }


}

export function quantityDecrement(selectedItem,productTirePrices,quantity){
    productTirePrices.sort(function (a, b) {
        return a.quantity - b.quantity
    })
    
    var min =  productTirePrices[0]
    var min2=productTirePrices[1]
    var min3=productTirePrices[2]
    var min4=productTirePrices[3]
  
    selectedItem.quantity--
      

    if(selectedItem&&selectedItem.productTirePrices.length===4){
        if(selectedItem.quantity>=selectedItem.quantity&&selectedItem.quantity<min2.quantity){
            
            selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

        }

        if(selectedItem.quantity>=min2.quantity&&selectedItem.quantity<min3.quantity){
            
            selectedItem.price=priceHelpFunc(min2.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
        }

        if(selectedItem.quantity>=min3.quantity&&selectedItem.quantity<min4.quantity){
            selectedItem.price=priceHelpFunc(min3.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

        }

        if(selectedItem.quantity>=min4.quantity){
            selectedItem.price=priceHelpFunc(min4.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
        }

      }
      if(selectedItem&&selectedItem.productTirePrices.length===3){
        if(selectedItem.quantity>=min.quantity&&selectedItem.quantity<min2.quantity){
           
            selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

        }

        if(selectedItem.quantity>=min2.quantity&&selectedItem.quantity<min3.quantity){
           
            selectedItem.price=priceHelpFunc(min2.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
        }

        if(selectedItem.quantity+1>=min3.quantity){
            selectedItem.price=priceHelpFunc(min3.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

        }

      }
      if(selectedItem&&selectedItem.productTirePrices.length===2){
        if(selectedItem.quantity>=min.quantity&&selectedItem.quantity<min2.quantity){
          
            selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)

        }

        if(selectedItem.quantity>=min2.quantity){
           
            selectedItem.price=priceHelpFunc(min2.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
      
        }
        if(selectedItem.quantity<min.quantity){
            selectedItem.price=priceHelpFunc(selectedItem.initialPrice,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
     

            

        }
      }
      if(selectedItem&&selectedItem.productTirePrices.length===1){

        if(selectedItem.quantity>=min.quantity){
            
            selectedItem.price=priceHelpFunc(min.price,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
        }
        else {
           
            selectedItem.price=priceHelpFunc(selectedItem.initialPrice,selectedItem.taxType,selectedItem.taxValue,selectedItem.availValue)
        }


      }

}