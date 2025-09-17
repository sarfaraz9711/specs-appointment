import React, { useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useState } from 'react';
import { orderTrackIdApi } from '../../../api';
import { colorThemeShow } from '../../helper/colorTheme';
import { useSelector } from 'react-redux';
import DateRev from './modules/DateReview';

function OrderTrackingInput (){
    const [orderId,setOrderId]=useState("")
    const [orderIdError,setOrderIdError]=useState("")
    const [submit,setSubmit]=useState(0)
    const [switchTrack,setSwitchTrack]=useState(false)
    const [orderInfo,setOrderInfo]=useState([])
    let currentColor=useSelector(s=>s.palette.currentColor)

    // useEffect(()=>{
    //     setColorTheme(colorThemeShow)
    
    // },[currentColor])

    const handleTrackorder=(e)=>{
        // setSwitchTrack(true)
        e.preventDefault()
        setSubmit(1)
        if(orderId!==""){
            orderTrackIdApi(orderId,setOrderInfo)
        }
        else{
            setOrderIdError("* This feild is required")

        }

    }

    return(
        <div className="ps-order-tracking">
           
        {switchTrack===false&&orderInfo.length===0? <div className="container">
            <div className="ps-section__header">
                <h3>Order Tracking</h3>
                <p>
                    To track your order please enter your Order ID in the box below and press the
                    "Track" button. This was given to youon your receipt and in the confirmation
                    email you should have received.
                </p>
            </div>
            <div className="ps-section__content">
                <form className="ps-form--order-tracking" action="/" method="get">
                    <div className="form-group">
                        <label>Order ID</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Found in your order confimation email"
                            value={orderId}
                            onChange={e=>{setOrderId(e.target.value);setOrderIdError("")}}
                        />
                        {submit===1&&orderIdError!==""&&<span style={{color:"red"}}>{orderIdError}</span>}
                    </div>
                         
                    <div className="form-group">
                        <button type="submit" className={`ps-btn ps-btn--fullwidth ${currentColor}`}  onClick={e=>handleTrackorder(e)}>Track Your Order</button>
                    </div>
                </form>
            </div>
        </div>:
        <div className="container">
            <div className="order-track-main-width">
            <span className="orderTrack-start-span">Tracking ID : <span>{orderId}</span></span>
            <h3 className="track-ur-orderh3">Your Order Status</h3>

            <div className="order-tract-content-main">
                {orderInfo.map((info)=>{
                    return(
                <div className={`order-tract-content-submain track-active ${info.createdDate===""? "blue-Incomplete":""}`} key={info.orderStatusId}>
                   
                    <div className="trackordercontentleft flex">
                        {/* <span>06-08-2020</span>
                        <span>10:47 AM</span> */}
                        <DateRev dateCarry={info.createdDate}/>

                    </div> 
                    <div className={`trackordercontentright ${info.createdDate===""? "blue-Incomplete-content-det":""}`}>
                        <span></span>
                        <h3>{info.name}</h3>
                    </div>      
                </div>
                    )
                }) }

            </div>
            </div>

        </div>}
    </div>

    )
}
    


export default OrderTrackingInput;
