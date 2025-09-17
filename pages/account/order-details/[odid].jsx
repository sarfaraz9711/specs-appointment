import React, { useEffect } from 'react';

import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../../components/elements/color/themeControl';
import FooterFullwidth from '../../../components/shared/footers/FooterFullwidth';
import {useState} from 'react';
import OrderDetComp from '../../../components/partials/account/OrderDetailNew';
import useNetwork from '../../../components/reusable/NetworkCheck';
import  Router, { useRouter }  from 'next/router';
import {orderDetailApi} from '../../../api';
import HeaderDefault from '../../../components/shared/headers/HeaderDefault';


const breadCrumb = [
    {
        text: 'Account',
    },
    {
        text: 'Order History',
    },
    {
        text: 'Order Details',
    },
];

const OrderDetailComp = ({query}) =>{
    const [orderDetailInfo,setOrderDetailInfo]=useState("")
    const [orderLoading,setOrderLoading]=useState(true)
    const network=useNetwork()
    const router = useRouter()
    const orderProductId=router.query.odid
    useEffect(()=>{
       
        if (orderProductId===undefined) {
            Router.push('/page/page-404');
        }
        if (router.query) {
            orderDetailApi(orderProductId,setOrderDetailInfo,setOrderLoading) 
        }
    },[])

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

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
                <OrderDetComp orderDetailInfo={orderDetailInfo}/>
            </div>  
            <FooterFullwidth/>
        </div>
    )
}

export default OrderDetailComp;

OrderDetailComp.getInitialProps=async(ctx)=>({
    query:ctx.query
})
