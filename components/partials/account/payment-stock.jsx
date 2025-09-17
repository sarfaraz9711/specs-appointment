import React, { Component, useState, useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Radio, Select } from 'antd';
import { getCart } from '../../../store/cart/action';
import {checkOutApi} from '../../../api/checkout/checkoutMain'
import { backCheckOutApi } from '../../../api/checkout/backOrderCheckout';

const { Option } = Select;

function PaymentStock({amount}){
    const [method,setMethod]=useState(2)
    const [cartItems,setCartItems]=useState("")
    const [address,setAddress]=useState("")


    const handleChangePaymentMethod = e => {
        setMethod(e.target.value)
        // this.setState({ method: e.target.value });
    };

    useEffect(()=>{
        setCartItems(JSON.parse(localStorage.getItem("backOrderLocal")))
        setAddress(JSON.parse(localStorage.getItem("contact")))
    
    },[])

    const handleSubmit=()=>{
        backCheckOutApi(address.fname,address.lname,address.address,address.number,address.city,address.postCode,address.email,[cartItems])
    }

 

    
        let month = [],
            year = [];
        for (let i = 1; i <= 12; i++) {
            month.push(i);
        }
        for (let i = 2019; i <= 2050; i++) {
            year.push(i);
        }
        return (
            <div className="ps-checkout ps-section--shopping">
                
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Payment</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>Contact</small>
                                            <p>{address.email}</p>
                                            <Link href="/account/stock-checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                        <figure>
                                            <small>Ship to</small>
                                            <p>
                                               {address.address}
                                            </p>
                                            <Link href="/account/stock-checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                    </div>
                                    <h4>Shipping Method</h4>
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                International Shipping
                                            </small>
                                            <strong>$20.00</strong>
                                        </figure>
                                    </div>
                                    <h4>Payment Methods</h4>

                                    <div className="ps-block--payment-method">
                                        <div className="ps-block__header">
                                            <Radio.Group
                                                onChange={e =>handleChangePaymentMethod(e)
                                                }
                                                value={method}>
                                                <Radio value={1}>
                                                    Visa / Master Card
                                                </Radio>
                                                <Radio value={2}>Cash on delivery</Radio>
                                            </Radio.Group>
                                        </div>
                                        <div className="ps-block__content">
                                            {method === 1 ? (
                                                <div className="ps-block__tab">
                                                    <div className="form-group">
                                                        <label>
                                                            Card Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>
                                                            Card Holders
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <div className="form-group">
                                                                <label>
                                                                    Expiration
                                                                    Date
                                                                </label>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <Select
                                                                            defaultValue={
                                                                                1
                                                                            }>
                                                                            {month.map(
                                                                                item => (
                                                                                    <Option
                                                                                        value={
                                                                                            item
                                                                                        }
                                                                                        key={
                                                                                            item
                                                                                        }>
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </Option>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <Select
                                                                            defaultValue={
                                                                                2020
                                                                            }>
                                                                            {year.map(
                                                                                item => (
                                                                                    <Option
                                                                                        value={
                                                                                            item
                                                                                        }
                                                                                        key={
                                                                                            item
                                                                                        }>
                                                                                        {
                                                                                            item
                                                                                        }
                                                                                    </Option>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <div className="form-group">
                                                                <label>
                                                                    CVV
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button className="ps-btn ps-btn--fullwidth">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="ps-block__tab">
                                                    <a className="ps-btn" onClick={e=>handleSubmit()}>
                                                        Submit
                                                    </a>
                                                    </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ps-block__footer">
                                        <Link href="/account/shipping">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to shipping
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
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
                                                {/* {cartItems && */}
                                                    {/* // cartItems.map(product => ( */}
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
                                                    {/* // ))} */}
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Subtotal</strong>
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
                                            <figure className="ps-block__total">
                                                <h3>
                                                    Total
                                                    <strong>
                                                    ${cartItems.quantityUpdated *
                                                                        cartItems.price}
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
    return state.cart;
};
export default connect(mapStateToProps)(PaymentStock);
