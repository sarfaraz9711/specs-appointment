import React, { useState, useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import  Router  from 'next/router';
import { useSelector } from 'react-redux';
import { colorThemeShow } from '../../helper/colorTheme';
import {useTranslation} from '../../../i18n';
const CheckBackOrder=({orderId})=>{
    let currentColor=useSelector(s=>s.palette.currentColor)

    const { t } = useTranslation('common');

    const handleRoute=()=>{
        Router.push("/account/customer-orders")
    }

    useEffect(()=>{
        //setTimeout(function(){ handleRoute(); }, 3000);
    },[])

    return(
        <div className="ps-order-tracking">
            <div className="container">
            <div className="ps-section__header">

                {/* <div className="cart-check-image"> */}
                    <img src="/static/img/tickimages.jpeg" style={{width:"200px"}}/>
                    <h4>{t('checkouts.Congratulation!')} {orderId}</h4>
                    {/* <h4>Congratulation! Your order {orderId} has been placed</h4> */}
                    {/* <p style={{marginBottom:"10px"}}>You are being automatically redirected to home page</p> */}

                {/* </div> */}
                <div className="form-group">
                        <button className={`ps-btn ${currentColor}`} onClick={e=>handleRoute()}>{t('My orders')}</button>
                    </div>          
                      </div>

            </div>
        </div>


    )
}

export default CheckBackOrder;
