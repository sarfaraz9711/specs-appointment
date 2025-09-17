import React, { useEffect, useState } from 'react';

import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../../components/elements/color/themeControl';
import FooterFullwidth from '../../../components/shared/footers/FooterFullwidth';
import CustomAddAddress from '../../../components/partials/account/CustomAddAddress';
import  Router,{ useRouter }  from 'next/router';
import HeaderDefault from '../../../components/shared/headers/HeaderDefault';

const EditAddressIndex = ({query}) => {
    const [addressId,setAddressId]=useState("")
    const router = useRouter()
    useEffect(()=>{
        const {eaid} = router.query;
        setAddressId(eaid)

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
            url:'/account/addresses',
        },
        // {
        //     text: "Edit Address"
        // }
    ];

    return(
        <div className="site-content">
       <HeaderDefault />
        <HeaderMobile />
        <NavigationList />
        <ThemeChanger/>
        <div className="ps-page--my-account mainBg">
                <BreadCrumb breacrumb={breadCrumb} />
                <CustomAddAddress type={"edit"} addressId={addressId}/>
          
        </div>  
        <FooterFullwidth/>
    </div>
    )
}
export default EditAddressIndex;

EditAddressIndex.getInitialProps=async(ctx)=>({
    query:ctx.query
})