import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Link from 'next/link';


function EnquireSuccess(){
    let currentColor=useSelector(s=>s.palette.currentColor)


    return(
        <div className="service-layout--default">
           <HeaderDefault/>
           <HeaderMobile/>
           <NavigationList />
           <ThemeChanger/>
           <div className="enq-tick-container">
               <img src="/static/img/success-chk.png"/>
               <h2>Your Request has been submitted succesfully</h2>
               <p>We will contact soon</p>

               <div className="success-enq-button">
               <Link href="/"><a><button className={currentColor}>Go to home page</button></a></Link>
               <Link href="/services"><a><button className={currentColor}>Go back to service</button></a></Link>
               </div>

           </div>
           <FooterDefault/>
        </div>

    )
}

export default EnquireSuccess