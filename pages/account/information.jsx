import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import BreadCrumb from '../../components/elements/BreadCrumb';
import ThemeChanger from '../../components/elements/color/themeControl';
import InformationCustom from '../../components/partials/account/InformationUser';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

const InformationFormMain = () =>{

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
            text: 'Account Information',
        },
    ]
    
    return(
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account mainBg">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <InformationCustom/>
            </div>
            <FooterFullwidth/>

        </div>
    )
}

export default InformationFormMain;