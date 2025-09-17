import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect } from 'react';
import { addressListApi } from '../../../api/account/getAddress';
import { useState } from 'react';
import { Rate } from 'antd';
import { imageUrl } from '../../../api/url';
import { UserAddRating } from '../../../api';
import { logOut } from '../../../store/auth/action';
import { useDispatch, connect } from 'react-redux';
import  Router  from 'next/router';


function ReviewProduct({orderDetailInfo,revLoader,currency}){
    const [rateValue,setRateValue]=useState(0)
    const [submit,setSubmit]=useState(0)
    const [review,setReview]=useState("")
    // const [reviewError,setReviewError]=useState("")
    const [fname,setFname]=useState("")
    const dispatch=useDispatch()

    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            

        }
        
    },[])

    useEffect(()=>{
       readValues()
        

    },[orderDetailInfo])


    const readValues=()=>{
        if(orderDetailInfo&&orderDetailInfo.rating!==0){
            setRateValue(orderDetailInfo.rating)
        }
        if(orderDetailInfo&&orderDetailInfo.review!==""){
            setReview(orderDetailInfo.review)
        }

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

        const handleReviewSubmit=(productId,orderProductId)=>{
            setSubmit(1)
            if(rateValue!==0){
                
                UserAddRating(productId,orderProductId,review,rateValue)
                Router.push("/account/customer-orders")
            }
        }

        const handleLogout=(e)=>{
            e.preventDefault()
            localStorage.clear() 
            dispatch(logOut())
            Router.push("/account/login")
        }

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
                                                    Review this product
                                                </figcaption>
                                                {revLoader===false?<div className="ps-block__content">
                                                    <div className="review-product-container diff-flex">
                                                        <div className="review-product-image">
                                                            <img src={imageUrl+"?path="+orderDetailInfo.containerName+"&name="+orderDetailInfo.productImage} alt=""/>
                                                        </div>
                                                        <div className="review-product-content">
                                                           <h3>{orderDetailInfo.productName}</h3>
                                                           <h4>{currency ? currency.symbol : '₹'}{orderDetailInfo.productPrice}</h4>

                                                        </div>
                                                        

                                                    </div>
                                                    <div className="form-group form-group__rating">
                    <label>Your rating for this product. </label>
                    <div style={{backgroundColor:"#bababa",display: "inline-block"}}>
                    <Rate value={rateValue} onChange={value=>setRateValue(value)}/>

                    </div>
                    {submit===1&&rateValue===0&&<span style={{color:"red"}}>Please give rating for this product</span>}

                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Write your review here" value={review} onChange={e=>setReview(e.target.value)}></textarea>
                        {/* {submit===1&&reviewError!==""&&<span style={{color:"red"}}>{reviewError}</span>} */}
                </div>
                <div className="form-group submit">
                    <button className="ps-btn" onClick={e=>handleReviewSubmit(orderDetailInfo.productId,orderDetailInfo.orderProductId)}>Submit Review</button>
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

export default connect(mapStateToProps)(ReviewProduct);
