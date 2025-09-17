import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import { useEffect, useState } from 'react';
import ThemeChanger from '../../components/elements/color/themeControl';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import ContactComp from '../../components/partials/contact/ContactNew';
import Head from 'next/head';
function ContactIndex() {

    const breadCrumb = [
        {
            text: 'Contact',
        },
    ];

    return (
        <div className="site-content">
            <Head>
                <title>Contacts</title>

            </Head>
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <div className="mainBg">
                <div style={{ backgroundColor: "#f1f3f6" }}>
                    <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                </div>
                <div>
                    <ContactComp />
                </div>
            </div>
            <FooterFullwidth />
            
        </div>
    )
}
export default ContactIndex;
