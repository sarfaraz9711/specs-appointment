import React, { useEffect } from 'react';

import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../../components/elements/color/themeControl';
import FooterFullwidth from '../../../components/shared/footers/FooterFullwidth';
import { useState } from 'react';
import CustomerOrderDetail from '../../../components/partials/account/CustomerOrderDetail';
import useNetwork from '../../../components/reusable/NetworkCheck';
import Router, { useRouter } from 'next/router';
import { customerOrderDetailApi } from '../../../api';
import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import Loader from '../../../components/shared/Loader';


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
        text: 'Order History',
    },
    // {
    //     text: 'Order Details',
    // },
];

const OrderDetailComp = ({ query }) => {
    const [orderDetailInfo, setOrderDetailInfo] = useState("")
    const [orderLoading, setOrderLoading] = useState(true)
    const network = useNetwork()
    const router = useRouter()
    const orderId = router.query.odid
    useEffect(() => {

        if (orderId === undefined) {
            Router.push('/page/page-404');
        }
        console.log(router, "Nero Router Here")
        if (router.query) {
            setOrderLoading(true)
            customerOrderDetailApi(orderId, setOrderDetailInfo, setOrderLoading)
        }
    }, [])

    useEffect(() => {
        if (network === false) { Router.push('/network-error') }
    }, [])
    return (
        <div className="site-content">

            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <div className="ps-page--my-account mainBg">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <CustomerOrderDetail orderDetailInfo={orderDetailInfo} />
            </div>
            <FooterFullwidth />
            {orderLoading && <Loader />}
        </div>
    )
}

export default OrderDetailComp;

OrderDetailComp.getInitialProps = async (ctx) => ({
    query: ctx.query
})
