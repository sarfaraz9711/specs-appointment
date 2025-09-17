import React, { useEffect } from 'react';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import  Router  from 'next/router';
import useNetwork from '../../components/reusable/NetworkCheck';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';

const PaytmProcess = () => {
    const network = useNetwork()

    useEffect(() => {
        if (network === false) { Router.push('/network-error') }
    }, [])


    return (
        <>

            <div className="site-content">
                <HeaderDefault />
                <HeaderMobile />
                <NavigationList />
                <ThemeChanger />
              
                Hellow

                <FooterFullwidth />
            </div>
        </>

    );
}
export default PaytmProcess;