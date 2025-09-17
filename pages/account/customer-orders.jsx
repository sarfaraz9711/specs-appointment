import React, { useEffect } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import CustomerOrders from '../../components/partials/account/CustomerOrders';
import { useRouter } from 'next/router';
import {synchUserOrderApi} from '../../api/account/customerOrderList'


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
];


const MyOrders = () => {
    const router=useRouter()
    let TokenAuth=""
    // useEffect(()=>{
    //     if(sessionStorage.getItem("spurtToken") ==null){
    //         router.push("/account/login")
    //       }
    // },[])
    const authFunc=()=>{
        if(localStorage.getItem("spurtToken")==null){
            router.push("/account/login")
           
        }
    }
   useEffect(()=>{
    
    if(localStorage.getItem("spurtToken")==null){
        router.push("/account/login")
       
    }else{
        let loggedInUser = localStorage.getItem("spurtUser");
        let userPrased = JSON.parse(loggedInUser);
        
        const customerId = userPrased.id;
       // synchUserOrderApi(customerId);
    }
    // TokenAuth=localStorage.getItem("spurtToken")
    // authFunc()
    },[])
    

    return(
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account mainBg">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <CustomerOrders/>
            </div>  
            <FooterFullwidth/>
        </div>
    )
}
export default MyOrders;