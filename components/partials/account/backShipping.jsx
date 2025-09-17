import React, { Component, useState, useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect } from 'react-redux';
import { getCart } from '../../../store/cart/action';

import Link from 'next/link';

function OrderShipping({amount}){
    const [cartItems,setCartItems]=useState("")
    const [address,setAddress]=useState("")


useEffect(()=>{
    setCartItems(JSON.parse(localStorage.getItem("backOrderLocal")))
    setAddress(JSON.parse(localStorage.getItem("contact")))

},[])


  
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
                                    {/* <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                International Shipping
                                            </small>
                                            <strong>$20.00</strong>
                                        </figure>
                                    </div> */}
                                    <div className="ps-block__footer">
                                        <Link href="/account/stock-checkout">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to information
                                            </a>
                                        </Link>
                                        <Link href="/account/stock-payment">
                                            <a className="ps-btn">
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
                                                {/* {cartItems &&
                                                    cartItems.map(product => ( */}
                                                        <Link
                                                            href="/"
                                                            >
                                                            <a>
                                                                <strong>
                                                                    {
                                                                        cartItems.name
                                                                    }
                                                                    <span>
                                                                        x
                                                                        {
                                                                            cartItems.quantityUpdated
                                                                        }
                                                                    </span>
                                                                </strong>
                                                                <small>
                                                                    $
                                                                    {cartItems.quantityUpdated *
                                                                        cartItems.price}
                                                                </small>
                                                            </a>
                                                        </Link>
                                                    {/* ))} */}
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Total</strong>
                                                    <small>${cartItems.quantityUpdated *
                                                                        cartItems.price}</small>
                                                </figcaption>
                                            </figure>
                                            {/* <figure>
                                                <figcaption>
                                                    <strong>Shipping</strong>
                                                    <small>$20.00</small>
                                                </figcaption>
                                            </figure> */}
                                            {/* <figure className="ps-block__total">
                                                <h3>
                                                    Total
                                                    <strong>
                                                        ${parseInt(address.total) + 20}
                                                        .00
                                                    </strong>
                                                </h3>
                                            </figure> */}
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
    return state.cart;
};
export default connect(mapStateToProps)(OrderShipping);
