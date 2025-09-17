import React from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import {useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from 'react-modal';
import {imageUrl} from '../../../../api/url';
import Link from 'next/link';
import {cartRemove, decrementQuantity, incrementQuantity} from '../../../helper/cartHelper';
import {addItem, decreaseItemQty, increaseItemQty, removeItem} from '../../../../store/cart/action';
import {priceHelpFunc} from '../../../helper/priceHelper';
import {addToCartApi,removeFromCartApi} from '../../../../api';
import Router from 'next/router';
import {useEffect} from 'react';
import {useTranslation} from '../../../../i18n';
import Head from 'next/head'
import { displayWhenclose } from '../../../../store/colorPalette/action';
import { formatCurrency } from '../../../../utilities/product-helper';
function CartPopup({showMiniCart,setShowMiniCart,cartData}){
    const [dummy,setDummy]=useState()
    const dispatch=useDispatch()
    const { t } = useTranslation('common');
    const [auth, setAuth]=useState(false)
    let currency = useSelector((s) => s.setting).currency;
    const customStyles = {

        
        overlay: {
            zIndex: 1099,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            
            // backgroundColor: 'rgb(64, 64, 64,55%)',
            backgroundColor: 'rgb(0, 0, 0,.85)',
           
        
          },
        content : {
            zIndex: 1099,
          top                   : '0%',
          left                  : '65%',
          right                 : '0%',
          bottom                : '0%',
          WebkitOverflowScrolling: 'touch',
        //   transform: 'translate(-5%)',
        //   overflow:"auto",
        //   backgroundColor: 'white',
        border:'none',
        background:'none'
         
        //   marginRight           : '-50%',
        //   transform             : 'translate(-13%, -13%)'
        }
      };


      useEffect(() => {

        if (localStorage.getItem("spurtToken")) {
             setAuth(true);
        }
   }, []);

    const closeModal=()=>{
        dispatch(displayWhenclose("block"))
        setShowMiniCart(false)
    }

    function quantityTotal(){
        let tempValue = 0;
        let currentValue = 0;
        
        cartData && cartData.map((current)=>{
            currentValue = tempValue + current.quantity
            tempValue = currentValue;
        })
        return tempValue;
    }

    function cartTotal(){
        let tempValue = 0;
        let currentValue = 0;
        
        cartData && cartData.map((current)=>{
            
            currentValue = tempValue + (current.quantity * current.price)
            tempValue = currentValue;
           
        })
        
        return tempValue;
    }

    

    const handleRemoveFromCart=(product)=>{
        removeFromCartApi(product.productId,product.price,"",product.skuName,product.variantId,product.variantName)
        cartRemove(product)
        dispatch(removeItem(product))
    }

   
    const handleIncreaseItemQty = (product) => {
     
        incrementQuantity(product)
        dispatch(increaseItemQty(product));
        dispatch(addItem(1))
       
      
        
        if(auth){
            const localCart = JSON.parse(localStorage.getItem('cartItem'))
          
            let currentProduct=localCart.find((current)=>{
                return current.productId === product.productId
            })
            if(product.flag===""){
                
                addToCartApi(product.productId,priceHelpFunc(product.price,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
            }   
            else{
               
                
                addToCartApi(product.productId,priceHelpFunc(product.pricerefer,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
     
            
            
        }
        }
    }




    const handleDecreaseItemQty=(product)=> {
       
        if(product.quantity !== 1){
            decrementQuantity(product)
            dispatch(decreaseItemQty(product));
            dispatch(addItem(1))
            if(auth){
            const localCart = JSON.parse(localStorage.getItem('cartItem'))
            let currentProduct=localCart.find((current)=>{
                return current.productId === product.productId
            })
            if(product.flag===""){
                
                addToCartApi(product.productId,priceHelpFunc(product.price,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
            }   
            else{
                
                addToCartApi(product.productId,priceHelpFunc(product.pricerefer,product.taxType,product.taxValue,""),currentProduct.quantity,"","",setDummy,product.skuName,"",product.variantId,product.variantName)
            }
        }
        } else {
            
          
            removeFromCartApi(product.productId,product.price,"",product.skuName)
            cartRemove(product)
            dispatch(removeItem(product))
            
        }
    }

    const checkoutPageRedirect=()=>{
        //Router.push('/account/checkout');
        document.location.href = "/account/checkout";
        dispatch(displayWhenclose("block"))
    }
    
            return (
               
                <Modal
                isOpen={showMiniCart}
                onRequestClose={e=>closeModal(e)}
                style={customStyles}
                contentLabel="Example Modal"
              >
                  
                  <div className="cartpop-container">
                  <Head>
                <title>Cart</title>
            </Head>
                      <div className="cartpop-header">
                          <div className="cartpop-back-container">
                              <a onClick={e=>{e.preventDefault();closeModal()}}>{"<" + t('cart.Back')}</a>
                          </div>
                          <h3>{t('cart.ShoppingCart')}</h3>
                          <h4> {t('cart.YourItem')} - {quantityTotal()} <Link href="/account/shopping-cart"><a>View Cart</a></Link></h4>
                      </div>
                      {cartData && cartData.length!==0?<div className="cartpop-table-container">
                          <table>
                              
                              {cartData && cartData.map((data, i)=>(
                                <tr key={i}>
                                    <td className="cartpop-table-data cart-data-img">
                                        <img src={data.productImage && data.productImage[0] && data.productImage[0].containerName!=="/" ? imageUrl+"?path="+data.productImage[0].containerName+"&name="+data.productImage[0].image+"&width=500&height=500": "/static/img/no-image.png"}/>
                                    </td>
                                    <td className="cartpop-table-data">
                                        <button className="cart-remove-button" onClick={e=>handleRemoveFromCart(data)}>x</button>
                                        <h3>{data.name}</h3>
                                        <div className="cartpop-action-row">
                                        {data.variantName !==""?<p>
                                             Variant: {data.variantName}</p>:<p></p>} 
                                      
                                        <div className="custom-product-quant">
                                            
                              
                                            <div className="custom-product-box">
                                               <button onClick={e=>handleDecreaseItemQty(data)}>-</button>
                                               <span>{data.quantity}</span>
                                               <button onClick={e => handleIncreaseItemQty(data)}>+</button>
                                            </div>
                                        </div>
                                       
                                        
                                        <div className="cartpop-action-price">
                                            {/* $ {formatCurrency(data.price) }  */}
                                            {currency
                                            ? currency.symbol + " "
                                            : "₹ "} {formatCurrency(data.quantity * data.price) }
                                       
                                       
                                       
                                        </div>

                                        </div>
                                    </td>
                              </tr>
                              ))}
                          </table>
                      </div>:
                        <div className="cartpop-empty-container">
                            <img src="/static/img/cart-empty.svg"/>
                            <h3>{t('EmptyCart')}</h3>
                            <p>{t('NoItemsInYourCart')}</p>
                        </div>}
                        {cartData && cartData.length!==0 && <div className="cartpop-footer-container">
                            <button className="cartpop-checkout-button" onClick={e=> checkoutPageRedirect()}>
                                <img src="/static/img/checkout.svg"/>{t('cart.Checkout')}
                            </button>
                            <h3>{t('TOTAL ')} : {currency
                                            ? currency.symbol + " "
                                            : "₹ "} {formatCurrency(cartTotal())}</h3>
                        </div>}
                  </div>
              </Modal>
              )
            
}

export default CartPopup;
