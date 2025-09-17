import React from 'react';
//import {ConnectPlugin} from '../../components/connectPlugins';
import Head from './modules/Head';
import BackToTop from '../elements/BackToTop';
import Router from "next/router";
import HeaderDefault from '../shared/headers/HeaderDefault';
const routeNavigate = (val)=>{
    Router.push(val);
  }

const DefaultLayout = ({ children }) => (
    <div className="layout--default">
        <Head />
        <HeaderDefault />
        {children}
        <div id="loader-wrapper">
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
        </div>
        <BackToTop scrollStepInPx="1000" delayInMs="0.5" />
        {/* <Resuable /> */}
    </div>
);

export default DefaultLayout;
