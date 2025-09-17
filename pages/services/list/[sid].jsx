import React, { useState } from 'react';

import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../../components/elements/color/themeControl';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import FooterDefault from '../../../components/shared/footers/FooterDefault';
import ServiceListInfo from '../../../components/partials/account/ServiceList';
import { useEffect } from 'react';
import { getServiceListApi } from '../../../api';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Router from 'next/router';
import useNetwork from '../../../components/reusable/NetworkCheck';
 

const ServiceListDisplay=({query})=>{
    const dispatch=useDispatch()
    const router=useRouter()
    const [servelistLoader,setServelistLoader]=useState(true)
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

   



    let categoryId=router.query.sid


    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Service Category',
            url:'/services'
        },
        {
            text: 'Services'
        }
    ];

    useEffect(()=>{

        Router.events.on('routeChangeStart', (url) => {
            const nextPid = url.split('/').pop()
            const nid=nextPid.substring(0, 2);
            if (nid !== '' && isNaN(parseInt(nid)) === false) {
                setServelistLoader(true)
                getServiceListApi(dispatch,nid,setServelistLoader) 
                

            }
        });

    },[])

    useEffect(()=>{
        let categoryId=router.query.sid
        getServiceListApi(dispatch,categoryId,setServelistLoader) 
        

    },[])


    return(
        <div className="service-layout--default">
           
             <HeaderDefault/>
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-service--custom">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <ServiceListInfo categoryId={categoryId} servelistLoader={servelistLoader}/>
            </div>                                      
            <FooterDefault/>
        </div>

    ) 
}

export default ServiceListDisplay

ServiceListDisplay.getInitialProps=async(ctx)=>({
    query:ctx.query
})
