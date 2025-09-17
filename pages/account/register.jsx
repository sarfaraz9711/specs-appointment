import React, { useEffect, useState } from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Register from '../../components/partials/account/Register';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import ThemeChanger from '../../components/elements/color/themeControl';
import DisplayImageWithS3PreSignedUrl from "../../components/elements/AwsS3PreSignedUrl";
import { getSingupOfferData } from "../../api";



const RegisterPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Register an account',
        },
    ];
    const [signUpOfferData, setSignupOfferData] = useState();
    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //     //checkCounter();
        // }
        getSingupOfferData(setSignupOfferData);
    }, [])
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <div className="mainBg">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className='bgWhite'>
                    <Register />
                </div>
            </div>

            <FooterFullwidth />
        </div>
    );
};

export default RegisterPage;
