import React, { useEffect } from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import  Router  from 'next/router';
import { useSelector } from 'react-redux';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';

import SpurtQuotationList from '../../components/partials/Quotation/QuotationList';


const breadCrumb = [
    {
        text: 'Account',
    },
    {
        text: 'Quotation Request List',
    },
];

const QuotationList = () => {
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
                <SpurtQuotationList />
               
                
              
            </div>  
            <FooterFullwidth/>
        </div>
    )
}

export default QuotationList;