import React from 'react';

import Newsletters from '../components/partials/commons/Newletters';
import FooterDefault from '../components/shared/footers/FooterDefault';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import ThemeChanger from '../components/elements/color/themeControl';
import Form from '../components/Join-Our-Troop';

const joinourtroop = () => {
    const breadCrumb = [
        {
            text: 'career',
            url: '/',
        },
        {
            text: 'Join Our Troop',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account">
               
                <Form />
            </div>
           
            <FooterFullwidth />
        </div>
    );
};

export default joinourtroop;
