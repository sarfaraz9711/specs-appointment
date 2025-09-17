import React, { useEffect } from 'react';

import HeaderDefault from '../components/shared/headers/HeaderDefault';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import BreadCrumb from '../components/elements/BreadCrumb';
import NavigationList from '../components/shared/navigation/NavigationList';
import ThemeChanger from '../components/elements/color/themeControl';
import useNetwork from '../components/reusable/NetworkCheck';
import  Router  from 'next/router';
import { useSelector } from 'react-redux';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import MyEquiry from '../components/Enquiry';

const breadCrumb = [
    {
        text: 'Home',
        url: '/',
    },
    {
        text: 'Corporate Gifting',
    },
];

const MyPoints = () => {
    return(
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="mainBg">
                    <BreadCrumb breacrumb={breadCrumb} />
                <div>
                <MyEquiry />
                </div>
                
              
            </div>  
            <FooterFullwidth/>
        </div>
    )
}

export default MyPoints;