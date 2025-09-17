import { getCategoruCrumb, getProducts} from '../../store/product/action';
import APIServices from '../../services'

export async function productListApi(dispatch,setProductData,offset,setLoader,orderBy,price,search,categoryInitial,manuId,limit,priceToInitial,setSelectedCategoryId,setCrumbArray,itemSlug,variants, sizeValueFilter, colorsValueFilter, filteredCatIds,finalFilteredQueryparams, paramsForRating, productDiscountVal, discountOfferId, setTotalProductCount) {
 
         
            // if(itemSlug){
                
            //     fetch(apiUrl + '/list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug, {
            //         method: 'GET',
            //     })
            //     .then(json => {
            //         setCrumbArray(json.categoryLevel)
                    
            //         if(json.data){
                   
                
            //        if(json.categoryLevel.length>0){
            //         let lastIndex=json.categoryLevel.length-1;
            //         // let catId= arr.pop().categoryId;
                   
            //         setSelectedCategoryId(lastIndex)
            //        }
                   
                   
                  
            //         dispatch(getProducts(json.data));
            //         setProductData(json.data)
            //         setTimeout(()=>{
            //            setLoader(false)
            //         },1000)
            //     }
            // })

            // }else if(variants){
            //     fetch(apiUrl + '/list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug+'&variant='+variants, {
            //         method: 'GET',
            //     })
            //     .then(json => {
            //         setCrumbArray(json.categoryLevel)
                    
            //         if(json.data){
                   
                
            //        if(json.categoryLevel.length>0){
            //         let lastIndex=json.categoryLevel.length-1;
            //         // let catId= arr.pop().categoryId;
                   
            //         setSelectedCategoryId(lastIndex)
            //        }
                   
                   
                  
            //         dispatch(getProducts(json.data));
            //         setProductData(json.data)
            //         setTimeout(()=>{
            //            setLoader(false)
            //         },1000)
            //     }
            // })

            // }
      
            // else{
                
            //     fetch(apiUrl + '/list/custom-product-list?limit=18&offset='+offset+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId, {
            //         method: 'GET',
            //     })
            //     .then(json => {
            //         setCrumbArray(json.categoryLevel)
            //         console.log(json.categoryLevel,"234rwesdfbbbbbbbbb")
            //         if(json.data){
                   
                
            //        if(json.categoryLevel.length>0){
            //         let lastIndex=json.categoryLevel.length-1;
            //         // let catId= arr.pop().categoryId;
                   
            //         setSelectedCategoryId(lastIndex)
            //        }
                   
                   
                  
            //         dispatch(getProducts(json.data));
            //         setProductData(json.data)
            //         setTimeout(()=>{
            //            setLoader(false)
            //         },1000)
            //     }
            // })

            // }
            if(sizeValueFilter == undefined){
                sizeValueFilter = '';   
            }
            if(colorsValueFilter == undefined){
                colorsValueFilter = '';
            }
            if(filteredCatIds == undefined){
                filteredCatIds = '';
            }
            if(finalFilteredQueryparams == undefined){
                finalFilteredQueryparams = '';
            }
            if(paramsForRating == undefined){
                paramsForRating = '';
            }
            if(productDiscountVal == undefined){
                productDiscountVal = '';
            }
            if(discountOfferId== undefined){
                discountOfferId=''
            }
            
            console.log(filteredCatIds, "Nero filtered cats in Prod")
            sessionStorage.setItem("productList1",'list/custom-product-list?limit=4&offset=')
            if(!sessionStorage.getItem("parentCategorySlug")){
                sessionStorage.setItem("parentCategorySlug",window.location.pathname.substring(1))
            }
            
            if(itemSlug){
                sessionStorage.setItem("productList2",'&productDiscountPercent='+productDiscountVal+'&discountOfferId='+discountOfferId+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug+'&sizeValueFilter='+sizeValueFilter+'&colorsValueFilter='+colorsValueFilter+'&catIds='+filteredCatIds+"&"+paramsForRating+"&"+finalFilteredQueryparams)
                const result = await APIServices.getAll('list/custom-product-list?limit=16&offset='+offset+'&productDiscountPercent='+productDiscountVal+'&discountOfferId='+discountOfferId+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug+'&sizeValueFilter='+sizeValueFilter+'&colorsValueFilter='+colorsValueFilter+'&catIds='+filteredCatIds+"&"+paramsForRating+"&"+finalFilteredQueryparams)
                    if(result&&result.data){

                        setCrumbArray(result.data.categoryLevel)
                        dispatch(getCategoruCrumb(result.data.categoryLevel)) 
                    
                    if(result&&result.data&&result.data.data){
                   
                
                   if(result.data.categoryLevel.length>0){
                    let lastIndex=result.data.categoryLevel.length-1;
                    // let catId= arr.pop().categoryId;
                   
                    setSelectedCategoryId(lastIndex)
                   }
                   
                   
                  
                    dispatch(getProducts(result.data.data));
                    setProductData(result.data.data)
                         setTimeout(()=>{
                       setLoader(false)
                       },1000)
                }

                    }
                
            }else if(variants){
                sessionStorage.setItem("productList2",'&productDiscountPercent='+productDiscountVal+'&discountOfferId='+discountOfferId+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug+'&variant='+variants+'&sizeValueFilter='+sizeValueFilter+'&colorsValueFilter='+colorsValueFilter+'&catIds='+filteredCatIds+"&"+paramsForRating+"&"+finalFilteredQueryparams)
                const result = await APIServices.getAll('list/custom-product-list?limit=16&offset='+offset+'&productDiscountPercent='+productDiscountVal+'&discountOfferId='+discountOfferId+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&attribute='+itemSlug+'&variant='+variants+'&sizeValueFilter='+sizeValueFilter+'&colorsValueFilter='+colorsValueFilter+'&catIds='+filteredCatIds+"&"+paramsForRating+"&"+finalFilteredQueryparams)
               

                if(result&&result.data){

                    setCrumbArray(result.data.categoryLevel)
                    dispatch(getCategoruCrumb(result.data.categoryLevel))
                
                if(result&&result.data&&result.data.data){
               
            
               if(result.data.categoryLevel.length>0){
                let lastIndex=result.data.categoryLevel.length-1;
                // let catId= arr.pop().categoryId;
               
                setSelectedCategoryId(lastIndex)
               }
               
               
              
                dispatch(getProducts(result.data.data));
                setProductData(result.data.data)
                     setTimeout(()=>{
                   setLoader(false)
                   },1000)
            }

                }



            }else{
                sessionStorage.setItem("productList2",'&productDiscountPercent='+productDiscountVal+'&discountOfferId='+discountOfferId+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&sizeValueFilter='+sizeValueFilter+'&colorsValueFilter='+colorsValueFilter+'&catIds='+filteredCatIds+"&"+paramsForRating+"&"+finalFilteredQueryparams)
                const result = await APIServices.getAll('list/custom-product-list?limit=16&offset='+offset+'&productDiscountPercent='+productDiscountVal+'&discountOfferId='+discountOfferId+'&priceFrom='+price+'&priceTo='+priceToInitial+'&price='+orderBy+'&keyword='+search+'&count=&categoryslug='+categoryInitial+'&manufacturerId='+manuId+'&sizeValueFilter='+sizeValueFilter+'&colorsValueFilter='+colorsValueFilter+'&catIds='+filteredCatIds+"&"+paramsForRating+"&"+finalFilteredQueryparams)



                if(result&&result.data){

                    setCrumbArray(result.data.categoryLevel)
                    dispatch(getCategoruCrumb(result.data.categoryLevel))
                
                if(result&&result.data&&result.data.data){
               
            
               if(result.data.categoryLevel.length>0){
                let lastIndex=result.data.categoryLevel.length-1;
                // let catId= arr.pop().categoryId;
               
                setSelectedCategoryId(lastIndex)
               }
               
               
              
                dispatch(getProducts(result.data.data));
                setProductData(result.data.data)
                     setTimeout(()=>{
                   setLoader(false)
                   },1000)
            }

                }

            }
   
      await getProductListCount(setTotalProductCount);  
}

export async function productListScroll(getDataRequest){
    const result = await APIServices.getAll(getDataRequest)
    return result.data.data
}

export async function getProductDiscount(){
    const result = await APIServices.getAll('list/get-discount-list');
    console.log("result.data",result.data);
    if(result && result.data && result.data.status == 200){
        return result.data.data;
    }else{
        return []
    }
}

export async function getProductListCount(setTotalProductCount){
    const apiUrlPart = sessionStorage.getItem("productList2")
    const result = await APIServices.getAll(`list/get-product-count-list?limit=0${apiUrlPart}`);
    console.log("result.data.data.productCount",result.data.data.productCount)
    if(result && result.data && (result.status == 200 || result.status == 1)){
        setTotalProductCount(result.data.data.productCount);
    }else{
        setTotalProductCount(0);
    }
}
export async function getCategoryImage(categoryId){
    const result = await APIServices.getAll(`category-image/get-list-by-category-id-type?categoryId=${categoryId}&type=Category Image`);
    return result.data
}