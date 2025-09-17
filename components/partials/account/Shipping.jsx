import React, { Component, useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { ApplyCouponApi } from '../../../api';
import OptionNameDisplay from '../../shared/headers/modules/optionNamePar';

function Shipping({amount,currency}){
    const [cartItems,setCartItems]=useState("")
    const [address,setAddress]=useState("")
    const [couponInput,setCouponInput]=useState("")
    const [couponProduct,setCouponProduct]=useState("")
    const [discountedPrice,setDiscountedPrice]=useState("")
    const [appliedName,setAppliedName]=useState("")
    const [appliedProductArray,setAppliedProductArray]=useState([])
    let currentColor=useSelector(s=>s.palette.currentColor)





useEffect(()=>{
    setCartItems(JSON.parse(localStorage.getItem("cartItem")))
    setAddress(JSON.parse(localStorage.getItem("contact")))

    detailCart()

},[])
  

const couponSubmit=()=>{


    if(discountedPrice===""&&couponInput!==""){
        ApplyCouponApi(couponInput,address.email,couponProduct,setDiscountedPrice,setAppliedName,setAppliedProductArray)
    }

}

const detailCart=()=>{
    let cartLocale=JSON.parse(localStorage.getItem("cartItem"))
    let cartFinal={}
    let cartArray=[]
    
    cartLocale.forEach((product)=>{
       
        cartFinal={productId:product.productId,productPrice:product.price,quantity:product.quantity,total:product.price*product.quantity}

        cartArray.push(cartFinal)
        setCouponProduct(cartArray)



    }
    )
    
        
}


  
        return (
            <div className="ps-checkout ps-section--shopping">
               
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shipping Information</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>Contact</small>
                                            <p>{address.email}</p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                        <figure>
                                            <small>Ship to</small>
                                            <p>
                                                {address.address}
                                            </p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                    </div>
                                    {/* <h4>Shipping Method</h4> */}
                                    <div className="ps-coupon-code">
                                        {/* <figure> */}
                                        <div className="ps-coupon-left">
                                        <h4>Enter Coupon code</h4>

                                        </div>
                                        {discountedPrice!==""&&<h3>Coupon applied</h3>}
                                           <div className="ps-coupon-input">
                                            <input value={couponInput} onChange={e=>setCouponInput(e.target.value)}></input>
                                            <button onClick={e=>couponSubmit()}>Apply</button>
                                            </div>
                                            {discountedPrice!==""&&<h5>Discounted price : {discountedPrice} </h5>}

                                        {appliedName!==""&&<div className='ps-coupon-applied'>
                                            <p>Discount applied for : <span>{appliedName}</span></p>
                                            </div>}
                                          
                                    </div>
                                   
                                     {appliedProductArray.length!==0&&<div className="ps-discount-detail">
                                        <div className="ps-discount-heador">
                                            <h4>Discount details :</h4>
                                        </div>
                                        {appliedProductArray&&appliedProductArray.map((product)=>{
                                        return(
                                            <div className="ps-discount-row" key={product.productId}>
                                            <div className="ps-row-content1">
                                                <span>{product.productName}</span>

                                            </div>
                                            <div className="ps-row-content2">
                                                <h3>Total</h3>
                                                <p>After Discount</p>

                                            </div>

                                            <div className="ps-row-content3">
                                        <p>{currency ? currency.symbol : '₹'} {product.actualAmount}</p>
                                                <p>{currency ? currency.symbol : '₹'} {product.actualAmount-product.discountAmount}</p>

                                            </div>

                                        </div>
                                            
                                        )
                                    })}
                                        

                                        <div className="ps-coupon-grand">
                                            <span>Grand Total</span>
                                <h4>₹  {parseInt(address.total)-discountedPrice}</h4>

                                        </div>


                                    </div>}
                                    <div className="ps-block__footer">
                                        <Link href="/account/checkout">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to information
                                            </a>
                                        </Link>
                                        <Link href="/account/payment">
                                            <a className={`ps-btn ${currentColor}`}>
                                                Continue to payment
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                <div className="ps-form__orders">
                                    <div className="ps-block--checkout-order">
                                        <div className="ps-block__content">
                                            <figure>
                                                <figcaption>
                                                    <strong>Product</strong>
                                                    <strong>total</strong>
                                                </figcaption>
                                            </figure>
                                            <figure className="ps-block__items">
                                                {cartItems &&
                                                    cartItems.map(product => (
                                                        <Link
                                                            href="/"
                                                            key={product.productId}>
                                                            <a>
                                                                <strong>
                                                                    {
                                                                        product.name
                                                                    }
                                                                    <span>
                                                                        x
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </span>
                                                                    <OptionNameDisplay optionName={JSON.parse(product&&product.optionName)}/>

                                                                </strong>
                                                                <small>
                                                                {currency ? currency.symbol : '₹'}
                                                                    {product.quantity *
                                                                        product.price}
                                                                </small>
                                                            </a>
                                                        </Link>
                                                    ))}
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Subtotal</strong>
                                                    <small>{currency ? currency.symbol : '₹'}{address.total}</small>
                                                </figcaption>
                                            </figure>
                                            {discountedPrice!==""&&<figure>
                                                <figcaption>
                                                    <strong>Discount<span>({appliedName})</span></strong> 
                                                    <small>- {currency ? currency.symbol : '₹'}{discountedPrice}</small>
                                                </figcaption>
                                            </figure>}
                                            {/* <figure>
                                                <figcaption>
                                                    <strong>Shipping</strong>
                                                    <small>₹20.00</small>
                                                </figcaption>
                                            </figure> */}
                                            <figure className="ps-block__total">
                                                <h3>
                                                    Total
                                                    <strong>
                                                    {currency ? currency.symbol : '₹'}{parseInt(address.total)-discountedPrice}
                                                        .00
                                                    </strong>
                                                </h3>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    
}

const mapStateToProps = state => {
    return state.cart,state.setting;
};
export default connect(mapStateToProps)(Shipping);
