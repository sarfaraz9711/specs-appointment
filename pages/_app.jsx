import App from 'next/app';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configureStore from '../store/store';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { createWrapper } from 'next-redux-wrapper';
import { appWithTranslation } from '../i18n';
import '../scss/style.scss';
import getProfileApi from '../api/home/getProfile';
import getPageApi from '../api/home/getPage';
import { colorThemeCurrent, viewcolorThemeCurrent } from '../store/colorPalette/action';
import Router, { useRouter } from 'next/router';
import { Flip, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/scss/main.scss'
import { LanguageSwitcherAPi } from '../api/account/languageSwitcherAPi';
import { GoogleAnalytics } from "nextjs-google-analytics";
import NextNProgress from 'nextjs-progressbar';
import { GA_TAG_ID, loginWithGoogleClientID } from '../utilities/app-settings';
import { GoogleOAuthProvider } from '@react-oauth/google';


function MyApp({ Component, pageProps }) {
         const router= useRouter()


       const authcheck = router.pathname.includes("/account/")
    const RedirectMaintain = useSelector(s => s.setting.maintenance)
    useEffect(() => {
        if (RedirectMaintain === 1 && !sessionStorage.getItem("maintenance")) {
            Router.push('/maintenance')
        }
        
        // if (localStorage.getItem("maintenance")) {
            
        // }else{
        //     Router.push('/maintenance')
        // }
    }, [])

    useEffect(() => {
       if(router.pathname.includes("/customer-orders/")){
        
        if(localStorage.getItem("spurtToken")==null){
            router.push("/account/login")
           
        }
       }
    }, [])

    const dispatch = useDispatch()


    useEffect(() => {
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 100);
        getProfileApi(dispatch)
        //getPageApi(dispatch)
        //LanguageSwitcherAPi(dispatch)

        localStorage.getItem("colorThemeSpurt") && dispatch(colorThemeCurrent(localStorage.getItem("colorThemeSpurt")))
        localStorage.getItem("colorThemeSpurtView") && dispatch(viewcolorThemeCurrent(localStorage.getItem("colorThemeSpurtView")))

    }, [])

    const getLayout =
        Component.getLayout || (page => <DefaultLayout children={page} />);
    return getLayout(

        <Provider store={configureStore}>
            <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={2} showOnShallow={true} />

            {/* <GoogleAnalytics trackPageViews gaMeasurementId={GA_TAG_ID} /> */}
            <GoogleOAuthProvider clientId={loginWithGoogleClientID}><Component {...pageProps} /></GoogleOAuthProvider>

            <ToastContainer
                // limit={1}
                transition={Zoom}
                theme="colored"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                draggable={false}
                pauseOnVisibilityChange
                closeOnClick
                pauseOnHover
            // hideDuration={100}
            // position='fixed'
            // containerId="second"


            />

        </Provider>
    );

}

const makestore = () => configureStore;
const wrappers = createWrapper(makestore);

export default wrappers.withRedux(appWithTranslation(MyApp))

// MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })
