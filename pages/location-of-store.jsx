import React from 'react';

import Newsletters from '../components/partials/commons/Newletters';
import FooterDefault from '../components/shared/footers/FooterDefault';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import BreadCrumb from '../components/elements/BreadCrumb';
import Register from '../components/partials/account/Register';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import ThemeChanger from '../components/elements/color/themeControl';
import FindLocation from '../components/Location-Of-Store';

const LocationPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Find Locations',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="mainBg">
               
                <FindLocation/>
            </div>
           
            <FooterFullwidth />
        </div>
    );
};

export default LocationPage;
