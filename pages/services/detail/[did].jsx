import React, { useState, useEffect } from 'react';

import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../../components/elements/color/themeControl';
import FooterDefault from '../../../components/shared/footers/FooterDefault';
import ServiceDetailComp from '../../../components/partials/account/ServiceDetail'
import { getServiceListApi } from '../../../api';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Router from 'next/router';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import useNetwork from '../../../components/reusable/NetworkCheck';

function ServiceInfoDetail(){
    const dispatch=useDispatch()
    const router=useRouter()
    const [servelistLoader,setServelistLoader]=useState(true)
    let categoryId=router.query.did
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

  



    


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
        let categoryId=router.query.did
        getServiceListApi(dispatch,categoryId,setServelistLoader) 
        

    },[])

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
            text: 'Service Detail'
        }
    ];

    return(
        <div className="service-layout--default">
         <HeaderDefault/>
        <HeaderMobile />
        <NavigationList />
        <ThemeChanger/>
        <div className="ps-service--custom">
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <ServiceDetailComp categoryId={categoryId} servelistLoader={servelistLoader}/>
        </div>                                      
        <FooterDefault/>
    </div>
    )


}

export default ServiceInfoDetail