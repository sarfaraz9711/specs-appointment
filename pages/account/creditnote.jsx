import React, { useEffect } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import { useRouter }  from 'next/router';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import Creditnoteoffer from '../../components/partials/account/customcreditnote';



const CreditNote = () => {

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
            text: 'Credit Note',
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
                    <Creditnoteoffer/>
              
            </div>  
            <FooterFullwidth/>
        </div>
    )
}

export default CreditNote;