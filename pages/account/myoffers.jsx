import React, { useEffect } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import  Router, { useRouter }  from 'next/router';
import { useSelector } from 'react-redux';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import NewOffers from '../../components/partials/account/CustomOffers';



const MyOffers = () => {

    const router = useRouter()

    useEffect(()=> {
        if(localStorage.getItem("spurtToken")==null){
            router.push("/account/login")
        }
    }, [])

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
            text: 'Notification if Offer',
        },
    ];

    return(
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account mainBg">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <NewOffers />
                
              
            </div>  
            <FooterFullwidth/>
        </div>
    )
}

export default MyOffers;