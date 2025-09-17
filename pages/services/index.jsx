import React, { useEffect } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import ServiceDetail from '../../components/partials/account/ServicesInfo';
import useNetwork from '../../components/reusable/NetworkCheck';
import Router from 'next/router';

function servicIndex(){
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
            text: 'Service Category',
        },
    ];

    return(
        <div className="service-layout--default">
             <HeaderDefault/>
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-service--custom">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <ServiceDetail/>
            </div>  

            <FooterDefault/>
        </div>

    )
}

export default servicIndex