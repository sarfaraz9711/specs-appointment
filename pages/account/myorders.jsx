import React, { useEffect } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import MyOrderComp from '../../components/partials/account/OrderMy';
import { useRouter } from 'next/router';


const breadCrumb = [
    {
        text: 'Account',
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
            <div className="ps-page--my-account">
                <div style={{backgroundColor:"#f1f1f1",padding:"16px 0px"}}>
                    <BreadCrumb breacrumb={breadCrumb} />
                </div>
                <MyOrderComp/>
            </div>  
            <FooterFullwidth/>
        </div>
    )
}
export default MyOrders;