import React, { useEffect } from 'react';

import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../../components/elements/color/themeControl';
import FooterFullwidth from '../../../components/shared/footers/FooterFullwidth';
import TrackOrderCustom from '../../../components/partials/account/TrackOrder';
import {orderTrackIdApi} from '../../../api';
import {useState} from 'react';
import Router, { useRouter } from 'next/router';

const breadCrumb = [
    {
        text: 'Account',
    },
    {
        text: 'Order History',
    },
    {
        text: 'Track Order',
    },
];

const TrackOrderComp = ({query}) =>{

    const [orderInfo,setOrderInfo]=useState([])
    const [submit,setSubmit]=useState(0)
    const [orderId,setOrderId]=useState("")
    const router = useRouter()
    const  tid  =router.query.tid;
    useEffect(()=> {
    
       
        if(tid !== undefined) {
            orderTrackIdApi(tid,setOrderInfo)
        }
    },[tid])

    return(
        <div className="site-content">
            
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList/>
            <ThemeChanger/>
            <div className="ps-page--my-account">
                <div style={{backgroundColor:"#f1f1f1",padding:"16px 0px"}}>
                    <BreadCrumb breacrumb={breadCrumb} />
                </div>
                <TrackOrderCustom orderInfo={orderInfo}/>
            </div>  
            <FooterFullwidth/>
        </div>

    )
}

export default TrackOrderComp;

TrackOrderComp.getInitialProps=async(ctx)=>({
    query:ctx.query
})
