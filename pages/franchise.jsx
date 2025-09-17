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
import FranchiseForm from '../components/Franchise';

const franchise = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Franchise',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account mainBg">
            <BreadCrumb breacrumb={breadCrumb} />

               <div>
                <FranchiseForm />
                </div>
            </div>
           
            <FooterFullwidth />
        </div>
    );
};

export default franchise;
