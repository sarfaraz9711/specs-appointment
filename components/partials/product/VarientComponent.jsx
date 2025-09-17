import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from '../../../i18n';
import { getProductsById, getQuantymin, getsliderimageclicks, getvarientdatamethlist, getvarientproducthidefun } from '../../../store/product/action';
import {setCartVarient} from '../../../store/cart/action'
//import { shopByStoreApi } from '../../../api/auth/shopbypincode';
import SizePopup from '../../shared/modal/Sizepop';





function SpurtVarientComponent() {
  const product = useSelector((s) => s.product.singleProduct);
  const myDatttttaaaaa = useSelector((s) => s.auth.mydattttt);
  const myStoreData = useSelector((s)=> s.auth.storeData);
  const [showPop,setShowPop]=useState(false)


 const dispatch =useDispatch()
    const { t } = useTranslation("common");
    // const [product,setProduct]=useState({})

// useEffect(()=>{
//     if(productId){
//         varientApi(productId,setProduct,dispatch)
//     }
    
// },[productId])



  useEffect(()=>{
    
  },[myStoreData])
  useEffect(() => {
   // shopByStoreApi("haxabavxvaav",dispatch);
   console.log("product.productVarient[0]",product.productVarient[0], product.productVarient[1])
product.productvarientList.forEach((element, i) => {
if(product.productVarient[0] && product.productVarient[0].varientsValue[i]){
  product.productVarient[0].varientsValue[i].isAvailable=element.quantity==0?false:true
  product.productVarient[0].varientsValue[i].isChecked=false
}
});
if(product.productVarient[1] && product.productVarient[1].varientsValue[0]){
product.productVarient[1].varientsValue[0].isChecked=true
product.productVarient[1].varientsValue[0].isAvailable=true
}
    if (
      product &&
      product.productVarientOption &&
      product.productVarientOption.length !== 0
    ) {
      initialNewVarient(product);
    }
    dispatch(getsliderimageclicks(product && product.productImage))
    console.log("product.productVarient",product.productVarient[0])
      if(product.productVarient.length > 0){
        let inLoop=true
        product.productVarient[0].varientsValue.forEach((element, i) => {
          if(element.isAvailable && inLoop){
            varientChange(element, null, product)
            product.productVarient[0].varientsValue[i].isChecked=true
            inLoop=false
          }
        });
      }
  }, [product]);

  const availableOptionsInitial = (varientId, product) => {
    const initialValueOptions = product.productVarientOption;
    const optionLength =
      initialValueOptions &&
      initialValueOptions.filter(
        (value) => value.varientsValueId === varientId.id
      );

    if (optionLength && optionLength.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const initialNewVarient = (product) => {
   
    product.processImage=product.productImage
   
    let productVarientSelectedOption =
      product.productVarientOption[0].productVarientOptionId;
    let productMainVarient = product.productvarientList.filter(
      (value) => value.id === productVarientSelectedOption
    )[0];

    if (productMainVarient) {
     
      let productMain = [];
      productMain.push({
        variantId: product.productVarientOption[0].varientsValueId,
        valueName: product.productVarientOption[0].valueName,
      });
      
      // setVariantNameArray(productMain);
      // setProductVarientDetail(productMainVarient);
      product.maxQuantityAllowedCart=productMainVarient.maxQuantityAllowedCart
      product.minQuantityAllowedCart=productMainVarient.minQuantityAllowedCart
      product.price = productMainVarient.price;
      product.variantId = productMainVarient.id;
      product.variantName = productMainVarient.varientName;
      product.skuName=productMainVarient.skuName
     
      // setSkuNumber(productMainVarient.skuName)
     
      // setVarName(productMainVarient.varientName);
      // setVarId(productMainVarient.id);
    }
  };


  const varientChange = (varient, sortOrder, product) => {
    // dispatch(getsliderimageclicks([]))
 console.log("varient",product)
   const cartItems =JSON.parse(localStorage.getItem("cartItem"))
   const productIdExistsInCart = cartItems && cartItems.filter((item) => new String(item.variantName).toUpperCase().startsWith(new String(varient.valueName).toUpperCase()));
   dispatch(setCartVarient(product))
  //  if(productIdExistsInCart.length>0){
  //  }
    let selectedOption = product.selectedVariant;
    
    selectedOption[varient.varientsId] = varient.id;
    let varientKey = Object.keys(selectedOption);

    let varId = [];
    if (varientKey && varientKey.length > 0) {
      varientKey &&
        varientKey.forEach((element) => {
          if (selectedOption[element]) {

            varId.push(selectedOption[element]);
          }
        });
        varId = varId.sort((a,b)=>a-b)
    }

    let varientList = product.productvarientList;

    let productOptionValue;
    if (
      varId &&
      varId.length !== 0 &&
      varientList &&
      varientList.length !== 0
    ) {
      
      varientList.forEach((vl) => {
        // varId.forEach((vi) => {
        

        let sortmenthod = vl.productVarientOption.sort((a, b) => a - b);
        if (JSON.stringify(varId) === JSON.stringify(sortmenthod)) {
        
          productOptionValue = vl;
        }
        // })
        
      });
    }
    const res = {};

    if (productOptionValue !== undefined && productOptionValue.quantity!=0) {
      dispatch(getvarientproducthidefun(false))
      
      // setSkuNumber(productOptionValue.skuName);
      
     
      productOptionValue.optionImage.forEach((obj) => {
      res["name"] = obj.image;
      res["containerName"] = obj.containerName;
    })
       
      // setVarName(productOptionValue.varientName);
      // setVarId(productOptionValue.id);
      // setvarientdefultid(productOptionValue.optionImage);
      // const [imagedataload,setalldataload]=useState([])
              let imagevarientdata=productOptionValue.optionImage.concat(product.productOriginalImage)
       
      dispatch(getsliderimageclicks(imagevarientdata))
 
      if (productOptionValue.minQuantityAllowedCart == null) {
        dispatch(getQuantymin(1))
        // setQuantity(1);
      } else {
        dispatch(getQuantymin(productOptionValue.minQuantityAllowedCart))
        // setQuantity(productOptionValue.minQuantityAllowedCart);
      }
 
      product.skuName = productOptionValue.skuName;
      product.variantId = productOptionValue.id;
      product.variantName = productOptionValue.varientName;
      product.processImage=imagevarientdata
      product.price = productOptionValue.price;
      //   quantity = productOptionValue.minQuantityAllowedCart
      product.productTirePrices = productOptionValue.productTirePrices;
      product.stockStatus = productOptionValue.stockStatus;
      // dispatch(getProductsById(product))
      dispatch(getvarientdatamethlist(product))
      if (product.hasStock !== 0) {
        product.minQuantityAllowedCart =
          productOptionValue.minQuantityAllowedCart;
        product.maxQuantityAllowedCart =
          productOptionValue.maxQuantityAllowedCart;
      } else {
        // setQuantity(1);
        dispatch(getQuantymin(1))
        
      }
    } else {
 
      dispatch(getvarientproducthidefun(true))
      
      // setSkuNumber(" ");
    }

  };

//  let store = createStore(product)
//  window.store = store;
//  window.store.dispatch({type: "MY_ACTION"});

const data = (product.keywords).split("~")
    const [chart] = data;

    const chartval = (data.filter(item => (item).toUpperCase() == "FOOTWEAR"))[0];
    const chartVal1 = (data.filter(item => (item).toUpperCase() == "GARMENTS"))[0];

  return (
   <>
{/* <h1>hellow</h1> */}

{product.productVarient && product.productvarientList.length !== 0 && (
        <div className="custom-product-options">
          <p>{t("products.AvailableOptions")}</p>
          {product &&
            product.productVarient.map((variant, pindex) => (
              <div
                className="custom-product-options-container"
                key={variant?.id}
              >
                <p>{variant?.name} </p>
                {variant &&
                  variant.varientsValue.map((varientName, index) => (
                    <div 
                      className="custom-product-options-subcontainer-radio"
                      
                      key={varientName.id}
                    >
                            
                             <label className={!varientName.isAvailable?'varient-disable':''}>
                      <input disabled={!varientName.isAvailable}
                        type="radio"
                        defaultChecked={varientName.isChecked}
                        name={"varientName.valueName" + pindex}
                        id={"varientValue" + variant.id}
                        // id={ variant.varientsId}
                       
                        onClick={(e) =>
                          varientChange(varientName, variant.sortOrder,product)
                        }
                      />
                    
                      {/* <label htmlFor={variant.varientsId}> */}
                        {varientName.valueName}
                      </label>
                    </div>
                  ))}
              </div>
            ))} 
            <div>
            <SizePopup showPop={showPop} setShowPop={setShowPop}/>
            { chartval || chartVal1  ?
                <div className='mt-4' style={{color:"#1976d2"}}>
                      <a onClick={e=>setShowPop(!showPop)}>
                      <img src="/static/img/size-chart.svg"/>  Size Chart
                </a>
                    </div>:<></>
                    } 
                </div>
            </div>
      )}

   </>
  )
}


export default SpurtVarientComponent