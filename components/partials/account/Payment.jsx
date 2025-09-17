import React, { Component, useState, useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import { Radio, Select } from 'antd';
import { getCart } from '../../../store/cart/action';
import {checkOutApi} from '../../../api';
import { colorThemeShow } from '../../helper/colorTheme';
import OptionNameDisplay from '../../shared/headers/modules/optionNamePar';
import { getPaymentApi } from '../../../api';
import { imageUrl } from '../../../api/url';

const { Option } = Select;

function Payment({amount,currency}){
    const [method,setMethod]=useState(1)
    const [cartItems,setCartItems]=useState("")
    const [address,setAddress]=useState("")
    const [buttonLoader,setButtonLoader]=useState(false)
    const [paymentOption,setPaymentOption]=useState([])

    let currentColor=useSelector(s=>s.palette.currentColor)





    const handleChangePaymentMethod = e => {
        setMethod(e.target.value)
        // this.setState({ method: e.target.value });
    };

    useEffect(()=>{
        setCartItems(JSON.parse(localStorage.getItem("cartItem")))
        setAddress(JSON.parse(localStorage.getItem("contact")))
        getPaymentApi(setPaymentOption)
    
    },[])

    const handleSubmit=()=>{
        setButtonLoader(true)
        checkOutApi(address.fname,address.lname,address.address,address.number,address.city,address.postCode,address.email,address.productDetail,setButtonLoader,method)
    }

    const radioStyle = {
        display: 'block',
        height: '70px',
        width:"120px",
        lineHeight: '100px',
      };

 

    
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
                                    {/* <h4>Shipping Method</h4>
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                International Shipping
                                            </small>
                                            <strong>$20.00</strong>
                                        </figure>
                                    </div> */}
                                    <h4>Payment Methods</h4>

                                    <div className="ps-block--payment-method">
                                        <div className="ps-block__header">
                                            <Radio.Group
                                                onChange={e =>handleChangePaymentMethod(e)
                                                }
                                                value={method}>

                                        {paymentOption&&paymentOption.map((pay)=>(
                                            <Radio style={radioStyle} value={pay.id} key={pay.id}>
                                            {/* Visa / Master Card */}
                                            {/* <div className="payment-imgcustom"> */}
                                            <img src={imageUrl+"?path="+pay.pluginAvatarPath+"&name="+pay.pluginAvatar} alt="" style={{maxHeight:"100%",maxWidth:"100%"}}/>

                                            {/* </div> */}
                                        </Radio>

                                        ))}                                              
                                        </Radio.Group>
                                        </div>
                                        <div className="ps-block__content">
                                           
                                                <div className="ps-block__tab">
                                                     <a className={`ps-btn ${currentColor}`} onClick={e=>handleSubmit()} disabled={buttonLoader===true?"disabled":""}>
                                                        Place Order
                                                        {buttonLoader===true && <img  src="/static/img/buttonLoaders.gif" alt="" style={{height:"30px",width:"30px",verticalAlign:"middle"}}/>}

                                                    </a>
                                                    </div>
                                            {/* )} */}
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
                                                {cartItems &&
                                                    cartItems.map(product => (
                                                        <Link
                                                            href="/"
                                                            key={product.id}>
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
                                                    {currency ? currency.symbol : '₹'}{parseInt(address.total) }
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
export default connect(mapStateToProps)(Payment);
