import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import ThemeChanger from '../../components/elements/color/themeControl';
import Phone from '../../components/partials/account/LoginWithPhone';

const PhonePage = () => {
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account">
               
                <Phone />
            </div>
           
            <FooterFullwidth />
        </div>
    );
};

export default PhonePage;
