import React, { useEffect } from 'react';

import FooterDefault from '../../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import Newsletters from '../../../components/partials/commons/Newletters';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ReviewProduct from '../../../components/partials/account/ReviewOrder';
import { useState } from 'react';
import { orderRevDetailApi } from '../../../api';
import  Router , { useRouter } from 'next/router';
import useNetwork from '../../../components/reusable/NetworkCheck';
import ReviewComp from '../../../components/partials/account/ReviewProduct';

const MyReviewPage = ({query}) => {
    const [orderDetailInfo,setOrderDetailInfo]=useState("")
    const [revLoader,setRevLoader]=useState(true)
    const network=useNetwork()

    const router = useRouter()
    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    

    const breadCrumb = [
        {
            text: 'Home',
            url:'/',
        },
        {
            text: 'Account',
            url:'/account/dashboard'
        },
        {
            text: 'Order History',
        },
        // {
        //     text: "Order Details"
        // },
        // {
        //     text: "Review this product"
        // }
    ];

   
    const orderId=router.query.rid
    useEffect(()=>{
       
      
        if (orderId===undefined) {
            Router.push('/page/page-404');
        }
       
        if (router.query) {
            orderRevDetailApi(orderId,setOrderDetailInfo,setRevLoader)
        }

    },[])
 
    

    return (
        <div className="site-content">
            
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account mainBg">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ReviewComp orderDetailInfo={orderDetailInfo} revLoader={revLoader}/>
                {/* <ReviewProduct orderDetailInfo={orderDetailInfo} revLoader={revLoader}/> */}
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterDefault />
        </div>
    );
};

export default MyReviewPage;

MyReviewPage.getInitialProps=async(ctx)=>({
    query:ctx.query
})
