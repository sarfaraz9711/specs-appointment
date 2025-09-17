import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import ThemeChanger from '../../components/elements/color/themeControl';
import AuthComp from '../../components/partials/auth/AuthFunc';

function ForgotPass(){
    return(
        <div className="site-content">
            <HeaderDefault />
                <HeaderMobile />
                <NavigationList />
                <ThemeChanger/>
                <div className="ps-page--shop">
                    <AuthComp/>
                </div>
                <FooterFullwidth />
        </div>
    )
}

export default ForgotPass