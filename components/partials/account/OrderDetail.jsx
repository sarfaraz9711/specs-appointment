import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect } from 'react';
// import { addressListApi } from '../../../api/account/getAddress';
import { useState } from 'react';
// import { delAddressApi } from '../../../api/account/deleteAddress';
import { useDispatch, connect, useSelector } from 'react-redux';
import  Router  from 'next/router';
import { imageUrl } from '../../../api/url';
import { logOut } from '../../../store/auth/action';
import { orderExportApi } from '../../../api';

// import { orderExportApi } from '../../../api/account/orderExport';
// import { editDetail } from '../../../store/setting/action';

function OrderDetailFunc({orderDetailInfo,orderLoading,currency}){
    // const [addressData,setAddressData]=useState()
    // const [delStatus,setDelStatus]=useState(0)
    const [fname,setFname]=useState("")
    let currentColor=useSelector(s=>s.palette.currentColor)
    const dispatch=useDispatch() 
    const [loadImg,setLoadImg]=useState(false)

    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            

        }
        
    },[])

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear() 
        dispatch(logOut())
        Router.push("/account/login")
    }
    // useEffect(()=>{
    //     setDelStatus(0)
    //     addressList()

    // },[delStatus])

    // const addressList=()=>{
    //     addressListApi(setAddressData)
    // }

    // const deleteAddress=(id)=>{
    //     delAddressApi(id,setDelStatus)
    // }

    const handleBuyAgain=(e,productSlug)=>{
        Router.push("/product/[pid]",`/product/${productSlug}`)
    }

    const getPdfData=(e,id)=>{
        e.preventDefault()
        setLoadImg(true)
        orderExportApi(id,setLoadImg)
    }

    const handleProductReview=(e,orderProductId)=>{
        // orderDetailApi()
        Router.push('/account/review/[rid]',`/account/review/${orderProductId}`)

    }

        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            {
                text: 'My Order',
                url: '/account/orders',
                icon: 'icon-bag2',
            },
           
           
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
                // active: true,
            },
            
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];
        return (
            <section className="ps-my-account ps-page--account">
               
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <img src="/static/img/users/3.jpg" />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>{fname}</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map(link => ( 
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? 'active'
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                    <a onClick={e=>handleLogout(e)} href="">
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className="row">
                                        {/* <div className="col-md-6 col-12">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                    Billing address
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    <p>
                                                        You Have Not Set Up This
                                                        Type Of Address Yet.
                                                    </p>
                                                    <Link href="/account/edit-address">
                                                        <a>Edit</a>
                                                    </Link>
                                                </div>
                                            </figure>
                                        </div> */}
                                            
                                            <div className="col-md-12 col-24">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                    Order Details
                                                </figcaption>
                                                {orderLoading===false?<div className="ps-block__content"> 
                                                    <div className="order-detail-header">
                                                        <h3>Order Details</h3>
                                                        <p>Ordered on {orderDetailInfo.orderedDate} | Order# {orderDetailInfo.orderProductPrefixId}</p><a href=""  onClick={e=>getPdfData(e,orderDetailInfo.orderProductId)}>{loadImg&&<img src="/static/img/loading.gif" style={{height:"20px",width:"20px"}}/>}Invoice</a>

                                                    </div>
                                                    <hr/>
                                                    <div className="order-detail-position-container diff-flex">
                                                        <div className="order-detail-position-left ">
                                                            <h4>Shipping Address</h4>
                                                            <h5>{orderDetailInfo.shippingAddress1},{orderDetailInfo.shippingAddress2}</h5>
                                                            <p>{orderDetailInfo.shippingCity}</p>
                                                            <p>{orderDetailInfo.shippingPostcode}</p>
                                                        </div>
                                                    <div  className="order-detail-position-right">
                                                        <h4>Order Summary</h4>
                                                        <p className="diff-flex right-para-custom">
                                                            <span>Quantity</span>{orderDetailInfo.productQuantity}
                                                        </p>
                                                        <p className="diff-flex right-para-custom">
                                                            <span>Base Price:</span>{currency ? currency.symbol : '₹'}{orderDetailInfo.basePrice}
                                                        </p>
                                                        <p className="diff-flex right-para-custom">
                                                        <span>Tax:</span>{orderDetailInfo.taxValue}%
                                                        </p>
                                                        <p className="diff-flex right-para-custom">
                                                            <span>Discount Amount</span>{currency ? currency.symbol : '₹'}{orderDetailInfo.discountAmount}
                                                        </p>
                                                        <p className="diff-flex right-para-custom right-para-weight">
                                                            <span style={{fontWeight: "700"}}>Grand Total:</span>{currency ? currency.symbol : '₹'}{orderDetailInfo.total}
                                                        </p>
 
                                                    </div>

                                                    </div> 
                                                    <div className="order-detail-card diff-flex">
                                                        <div className="left-order-cart diff-flex">
                                                            <div className="left-order-image">
                                                                <img src={imageUrl+"?path="+orderDetailInfo.containerName+"&name="+orderDetailInfo.productImage}/>

                                                            </div>
                                                            <div className="left-order-content">
                                                                <h3>{orderDetailInfo.productName}</h3>
                                                                <h4>{orderDetailInfo.productPrice}</h4>
                                                            </div>

                                                        </div>
                                                        <div className="right-order-cart">
                                                            <button onClick={e=>handleBuyAgain(e,orderDetailInfo.productSlug)} className={currentColor}>Buy it again</button>
                                                            <button onClick={e=>handleProductReview(e,orderDetailInfo.orderProductId)} className={currentColor}>Review this product</button>

                                                        </div>

                                                    </div>
                                                </div>:<div className="ps-block__content">
                                                <center><img src="/static/img/spurt-original-loader.gif"/></center>
                                                    </div>}
                                               
                                            </figure>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    
}

const mapStateToProps=state=>{
    return state.setting;

}

export default connect(mapStateToProps)(OrderDetailFunc);
