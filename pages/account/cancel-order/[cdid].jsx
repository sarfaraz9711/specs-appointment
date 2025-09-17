import React, { useEffect } from 'react';

import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../../components/elements/color/themeControl';
import FooterFullwidth from '../../../components/shared/footers/FooterFullwidth';
import {useState} from 'react';
import useNetwork from '../../../components/reusable/NetworkCheck';
import  Router,{ useRouter }  from 'next/router';
import CancelCustomComp from '../../../components/partials/account/CancelCustom';
import {cancelReasonApi, orderDetailApi} from '../../../api';

const breadCrumb = [
    {
        text: 'Account',
    },
    {
        text: 'Order History',
    },
    {
        text: 'Cancel History',
    },
];

const CancelOrder = ({query}) =>{
    const [orderDetailInfo,setOrderDetailInfo]=useState("")
    const [orderLoading,setOrderLoading]=useState(true)
    const [cancelReason,setCancelReason]=useState([])
    
    const network=useNetwork()
    const router = useRouter()
   
 
    useEffect(()=>{
        const orderProductId = router.query.cdid

        if (orderProductId===undefined) {
            Router.push('/page/page-404');
        }
        if (router.query) {
            orderDetailApi(orderProductId,setOrderDetailInfo,setOrderLoading)
            cancelReasonApi(setCancelReason) 
        }
    },[])

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    return(
        <div className="site-content">
            
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList/>
            <ThemeChanger/>
            <div className="ps-page--my-account">
                <div style={{backgroundColor:"#f1f1f1",padding:"16px 0px"}}>
                    <BreadCrumb breacrumb={breadCrumb} />
                </div>
                <CancelCustomComp orderDetailInfo={orderDetailInfo} cancelReason={cancelReason} orderProductId={router.query.cdid}/>
            </div>
            <FooterFullwidth/>
        </div>
    )

}
export default CancelOrder;

CancelOrder.getInitialProps=async(ctx)=>({
    query:ctx.query
})