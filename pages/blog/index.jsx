import React, { useEffect } from 'react';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import BreadCrumb2 from '../../components/elements/BreadCrumb2';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import Router from "next/router";
import { useState } from 'react';
import { blogListApi } from '../../api';
import BlogGridplugin from '../../components/partials/Blogs/BlogGridPlugin';



const BlogGridPage = (props, dispatch) => {
    const network = useNetwork()
    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        if (network === false) { Router.push('/network-error') }
    }, [])

    // useEffect(() => {
    //     blogListApi(setBlogList)

    // }, [])



    // const [cookies, setCookie, removeCookie] = useCookies(['spurt-token']);

    const breadCrumb = [
      
        {
            text: 'Blogs',
        },
    ];

   

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <div className="ps-page--blog">
                
                <BreadCrumb2 breacrumb={breadCrumb} />

         
                        <BlogGridplugin  />
                       
                <div className='blog-detail-wrapper'>

                </div>

            </div>
            <FooterDefault />
        </div>
    );
};

export default BlogGridPage;
