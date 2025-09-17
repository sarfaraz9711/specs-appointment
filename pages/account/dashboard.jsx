import React, { useEffect } from 'react';

import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import UserInformation from '../../components/partials/account/UserInformation';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import  Router, { useRouter }  from 'next/router';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';

const UserInformationPage = () => {
    const network=useNetwork()
    const router = useRouter()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    useEffect(()=> {
        if(localStorage.getItem("spurtToken")==null){
            router.push("/account/login")
        }
    }, [])

    

    const breadCrumb = [
        {
            text: 'Home',
            url:'/',
        },
        {
            text: 'Account',
            url:'/account/dashboard'
        },
        {
            text: 'Account Dashboard',
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
                    <UserInformation />
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterFullwidth />
        </div>
    );
};

export default UserInformationPage;
