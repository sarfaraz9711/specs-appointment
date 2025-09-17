import React, { Component } from 'react';
import AccountNav from '../../elements/AccountNav';
import Head from 'next/head'
import { creditNoteByEmail } from '../../../api/account/creditNote';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from "moment";
import Loader from '../../shared/Loader';


function CreditNote() {
    const [isLoaderActive, setLoaderActive]=useState(false)
   const [getCoupanData, setCoupanData]=useState([])
   const [getActCoupanData, setActCoupanData]=useState([])
    useEffect(()=>{
        setLoaderActive(true)
        creditNoteByEmail(setCoupanData, setActCoupanData, setLoaderActive)
        
    },[])

    const creditNoteFilter = (data)=>{
        const filterData = getActCoupanData.filter(item=>item.couponClass==data)
        if(data=="all"){
            setCoupanData(getActCoupanData)
        }else{
            setCoupanData(filterData)        
        }
        }

    return (
        <section className="cus-account-container">
            <div className="cus-account-subcontainer">
                <Head>
                    <title>Coupon</title>
                </Head>
                <div className="cus-position-container">
                    <AccountNav keyValue={10} />
                    <div className='creditNote'>
                    <div className='account-heading ml-3 mt-3'>Coupons Details:</div>
                    <div className='coupon-indicator d-flex justify-content-start pl-4 pr-4 mt-3'>
                <div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('all')}><span className='all'></span> All Coupon</div>
                <div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('pending')}><span className='pending'></span> Available</div>
                <div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('redeem')}><span className='redeem'></span> Redeem</div>
                <div className='mr-3 coupon-click' onClick={e=>creditNoteFilter('expired')}><span className='expired'></span> Expired</div>
            </div>
<div className='row mt-3 pl-4 pr-4'>
    {getCoupanData && getCoupanData.map((data)=>{
    return <div className='col-md-4 mb-5'>
    <div className={`coupon ${data.couponClass}`}>
<h3 className='offer-heading'><img src='/static/img/red-chief-logo.png'/></h3>
<div className="offer-body pl-3 pr-3">
<h2 className='heading'><b> {data.coupanType==2?'₹':''} {data.discount}{data.coupanType==1?'%':''} OFF YOUR PURCHASE</b></h2> 
</div>
<div className="offeer-exp pl-3 pr-3">
<p>Use Promo Code: <span className="promo">{data.coupanCode}</span></p>
<p className="expire">Expires: {moment(data.endDate).format("DD/MM/YYYY, hh:mm A")}</p>
</div>
</div>
</div>
    })}

</div>
</div>
                    </div>
                </div>
                {isLoaderActive &&<Loader />}
            
        </section>
    )
}

export default CreditNote