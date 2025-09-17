import React, { useEffect,useState } from 'react';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Newsletters from '../../components/partials/commons/Newletters';
import Addresses from '../../components/partials/account/Addresses';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import  Router  from 'next/router';
import { useSelector } from 'react-redux';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import CustomAddAddress from '../../components/partials/account/CustomAddAddress';

const AddAddress = () => {
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    const RedirectMaintain=useSelector(s=>s.setting.maintenance)

    useEffect(()=>{
    if(RedirectMaintain===1 && !sessionStorage.getItem("maintenance")){
        Router.push('/maintenance')
    }
    },[])
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
            text: 'Address',
        },
        // {
        //     text: 'Add Address',
        // },
    ];

    return(
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account mainBg">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <CustomAddAddress type={"add"}/>
            </div>  
            <FooterFullwidth/>
        </div>
    )
}
export default AddAddress;