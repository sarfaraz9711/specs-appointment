import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect } from 'react';
import { addressListApi } from '../../../api';
import { useState } from 'react';
import { delAddressApi } from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { editDetail } from '../../../store/setting/action';
import { logOut } from '../../../store/auth/action';
import  Router  from 'next/router';
import { colorThemeShow } from '../../helper/colorTheme';

function Addresses(){
    const [addressData,setAddressData]=useState()
    const [delStatus,setDelStatus]=useState(0)
    const [fname,setFname]=useState("")
    const [addressLoader,setAddressLoader]=useState(true)
    const dispatch=useDispatch() 
    let currentColor=useSelector(s=>s.palette.currentColor)


    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            

        }
        
    },[])

    useEffect(()=>{
        setDelStatus(0)
        addressList()

    },[delStatus])

    const addressList=()=>{
        setAddressLoader(true)
        addressListApi(setAddressData,setAddressLoader)
    }

    const deleteAddress=(id)=>{
        delAddressApi(id,setDelStatus)
    }

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear() 
        dispatch(logOut())
        Router.push("/account/login")
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
                active: true,
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
                                                            ? `active ${currentColor}`
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
                                                {/* <Link href="/account/login"> */}
                                                    <a onClick={e=>handleLogout(e)} href="">
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                                {/* </Link> */}
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
                                                    Shipping address
                                                </figcaption>
                                                {addressLoader===false? <div>
                                                {addressData&&addressData.map(address=>(
                                                <div className="ps-block__content"  key={address.addressId}>
                                                    
                                                    <h4>{address&&address.address1}</h4>
                                                    <p>{address&&address.address2}{address&&address.address2!==""?",":""}{address&&address.city},
                                                    {address&&address.state}:{address&&address.postcode}</p>
                                                    <Link href={{pathname:"/account/edit-address" ,query: { addressId:  address.addressId} }}  >
                                                        <a onClick={e=>dispatch(editDetail(address))}>Edit</a>
                                                    </Link>
                                                        <a onClick={e=>deleteAddress(address.addressId)}>Delete</a>
                                                    <hr/>
                                                </div>))}
                                                    <center><Link href="/account/add-address">
                                                        <a>Add</a>
                                                    </Link>
                                                    </center>
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

export default Addresses;
