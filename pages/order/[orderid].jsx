import React from 'react';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import OrderTracking from '../../components/partials/account/OrderTracking';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import { useEffect } from 'react';
import { trackOrderApi } from '../../api';
import { useState } from 'react';
import useNetwork from '../../components/reusable/NetworkCheck';
import  Router  from 'next/router';


const OrderTrackingPage = ({query}) => {
    const [orderTrack,setOrderTrack]=useState()
    const [trackLoading,setTrackLoading]=useState(true)
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    

    const breadCrumb = [
        {
            text: 'Home',
            url: '/', 
        },
        {
            text: 'Order Tracking',
        },
        {
            text:orderTrack&&orderTrack.orderProductPrefixId
        }
    ];
 
    useEffect(()=>{
        const orderId=query.orderid
        if (orderId===undefined) {
            Router.push('/page/page-404');
        }
        if (query) {
            setTrackLoading(true)
            trackOrderApi(orderId,setOrderTrack,setTrackLoading)
        }

    },[])

 

    return (
        <div className="site-content">
      
            <HeaderDefault />
            <HeaderMobile /> 
            <NavigationList />
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderTracking orderTrack={orderTrack} trackLoading={trackLoading}/>
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterDefault />
        </div>
    );
};

export default OrderTrackingPage;

OrderTrackingPage.getInitialProps=async(ctx)=>({
    query:ctx.query
})