import React, { Component } from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input } from 'antd';
import { useState } from 'react';
import {notification } from 'antd';
import { useEffect } from 'react';


function FormStockCheck({cartItems,amount,productDetail,addressData}){
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [postCode,setPostCode]=useState("")
    const [num,setNum]=useState("")
    const [addressCheck,setAddressCheck]=useState(0)



// class FormCheckoutInformation extends Component {
//     constructor(props) {
//         super(props);
//     }

useEffect(()=>{
    if(localStorage.getItem("spurtUser")){
        if(JSON.parse(localStorage.getItem("spurtUser")).email){
            setEmail(JSON.parse(localStorage.getItem("spurtUser")).email)
        }
        if(JSON.parse(localStorage.getItem("spurtUser")).firstName){
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
        }
        if(JSON.parse(localStorage.getItem("spurtUser")).lastName){
            setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName)
        }
        
        if(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber){
            setNum(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber)
        }
    }

},[])

    const addressSelect=(address)=>{
        setAddressCheck(1)
        
        setAddress(address.address1+","+address.address2)
        setCity(address.city)
        setPostCode(address.postcode)
    }


    const handleLoginSubmit = () => {
        if(addressCheck===1){
            Router.push('/account/order-shipping');
            localStorage.setItem("contact",JSON.stringify({fname:fname,lname:lname,email:email,address:address,city:city,number:num,postCode:postCode,productDetail:productDetail,total:amount}))
        }
        else{
            modalWarning('warning');

        }
        
    };

    const modalWarning = (type) => {
        notification[type]({
            message: 'Address is required',
            description: 'Enter the address for shipping purpose',
            duration: 3,
        });
    };
    

    // render() {
    //     const { amount, cartItems, cartTotal } = this.props;
        return (
            <Form
                className="ps-form--checkout"
                onFinish={handleLoginSubmit}>
                    
                <div className="ps-form__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-form__billing-info">
                                <h3 className="ps-form__heading">
                                    Contact information
                                </h3>
                                {addressData.length!==0?<div className="form-group">
                                    <Form.Item
                                        label="First Name"
                                        name="First Name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please Enter a first name',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="First name"
                                            // defaultValue={fname}
                                            value={fname}
                                            onChange={e=>setFname(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>:""}
                                {addressData.length!==0?<div className="form-group">
                                    <Form.Item
                                        label="Last Name"
                                        name="Last Name"
                                        rules={[
                                            {
                                                required: false,
                                               
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Last name"
                                            // defaultValue={lname}
                                            value={lname}
                                            onChange={e=>setLname(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>:""}
                                <div className="form-group">
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                type:"email",
                                                message:
                                                    'Enter an valid email',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email"
                                            // defaultValue={email}
                                            value={email}
                                            onChange={e=>setEmail(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        label="Phone number"
                                        name="phone number"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Enter an phone number!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="number"
                                            placeholder="phone number"
                                            // defaultValue={num}
                                            value={num}
                                            onChange={e=>setNum(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="keep-update"
                                        />
                                        <label htmlFor="keep-update">
                                            Keep me up to date on news and
                                            exclusive offers?
                                        </label>
                                    </div>
                                </div>
                                <h3 className="ps-form__heading">
                                    Shipping address
                                </h3>
                                {addressData&&addressData.length===0?<div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                label="First Name"
                                                name="firstName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Enter your first name!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={fname}
                                                    onChange={e=>setFname(e.target.value)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                label="Last Name"
                                                name="lastName"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message:
                                                            'Enter your last name!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    defaultValue={lname}
                                                    value={lname}
                                                    onChange={e=>setLname(e.target.value)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Enter an address!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Address"
                                            value={address}
                                            onChange={e=>setAddress(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        name="apartment"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Enter an Apartment!'

                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Apartment, suite, etc. (optional)"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                name="city"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter a city!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="city"
                                                    placeholder="City"
                                                    value={city}
                                                    onChange={e=>setCity(e.target.value)}
                                                />
                                            </Form.Item>

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item
                                                name="postalCode"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter a postal oce!',
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="postalCode"
                                                    placeholder="Postal Code"
                                                    value={postCode}
                                                    onChange={e=>setPostCode(e.target.value)}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="keep-update"
                                        />
                                        <label htmlFor="keep-update">
                                            Save this information for next time
                                        </label>
                                    </div>
                                </div> */}
                                </div>:
                                <div>
                                    {addressData&&addressData.map((address,index)=>{
                                        return(
                                            <div className="address-container" key={index}>
                                       <input type="radio" id={address.addressId} name="drone" onClick={e=>addressSelect(address)} value={address}  className="addr-input"/>
                                       <label for={address.addressId} className="address-custom-label">{address.addressType===0?"Home":"Work"}</label>
                                        <p className="address-paragraph">{address&&address.address1},{address.address2},{address.city},{address.state+":"+address.postcode}</p>
                                    </div>

                                        )
                                    })}

                                    {/* <div className="address-container">
                                       <input type="radio" id="louie" name="drone" value="louie" className="addr-input"/>
                                       <label for="louie">Louie</label>
                                    </div> */}
                                </div>}
                                <div className="ps-form__submit">
                                    <Link href="/account/cart">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to shopping cart
                                        </a>
                                    </Link>
                                    <div className="ps-block__footer">
                                        <button className="ps-btn">
                                            Continue to shipping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <h3>Your order</h3>
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
                                                    key={cartItems.productId}>
                                                    <a>
                                                        <strong>
                                                            {cartItems.name}
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
                                            {/* ))}  */}
                                        </figure>
                                        <figure>
                                            <figcaption>
                                                <strong>Subtotal</strong>
                                                <small>${cartItems.quantityUpdated*cartItems.price}</small>
                                            </figcaption>
                                        </figure>
                                        <figure className="ps-block__shipping">
                                            <h3>Shipping</h3>
                                            <p>Calculated at next step</p>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    
}

export default FormStockCheck;
