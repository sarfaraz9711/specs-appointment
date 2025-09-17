import React, { useEffect } from 'react';
import Newsletters from '../../components/partials/commons/Newletters';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import EditAddress from '../../components/partials/account/EditAddress';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import useNetwork from '../../components/reusable/NetworkCheck';
import { useRouter } from 'next/router';
// import  Router  from 'next/router';


const MyAccountPage = ({query}) => {
    const router = useRouter()
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ router.push('/network-error')  }
    },[])

    

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Edit address',
        },
    ];
    return (
        <div className="site-content">
            
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <EditAddress id={query&&query.addressId}/>
            </div>
            {/* <Newsletters layout="container" /> */}
            <FooterDefault />
        </div>
    );
};

export default MyAccountPage;

// MyAccountPage.getInitialProps=async(ctx)=>({
//     query:ctx.query
// })


