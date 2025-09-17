import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { imageUrl } from '../../../api/url';
import { connect } from 'react-redux';
import Link from 'next/link';

const OrderTracking = ({orderTrack,trackLoading,currency}) => {

    return(
        <div className="ps-order-tracking"> 
           
        {trackLoading===false?<div className="container">
            {orderTrack&&orderTrack&&<div>
            <div className="ps-section__header">
                <h3>Order Tracking</h3>
                   <p>Tracking ID:{orderTrack&&orderTrack.orderProductPrefixId}</p>
                   <Link href="/account/order/[orderdetail]" as={`/account/order/${orderTrack&&orderTrack.orderProductId}`} >
                   <a style={{color:"#fcb800"}}>Order details-click here</a>
                   </Link>
                
                {/* <p>
                    To track your order please enter your Order ID in the box below and press the
                    "Track" button. This was given to youon your receipt and in the confirmation
                    email you should have received.
                </p> */}
            </div>
            {/* <div className="ps-section__content">
                <form className="ps-form--order-tracking" action="/" method="get">
                    <div className="form-group">
                        <label>Order ID</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Found in your order confimation email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Billing Email</label>
                        <input className="form-control" type="text" placeholder="" />
                    </div>
                    <div className="form-group">
                        <button className="ps-btn ps-btn--fullwidth">Track Your Order</button>
                    </div>
                </form>
            </div> */} 

            <div className="ps-custom__content_container">
            <div className="row flex">
               <div className="col-lg-6 col-md-6 col-sm-6">
               <div className="split-custom left-custom-divider">
                    <div className="card-custom-content">
                        {/* <h4>fddfd dfd</h4> */}
                        {/* <div className="custom-imge-container"> */}
                            <img src={imageUrl+"?path="+orderTrack.containerName+"&name="+orderTrack.productImage}/>
                            {/* <span>dads ds</span> */}
                        {/* </div> */}
                        {/* <div className="custom-name-container">  */}
                          <h4> {orderTrack&&orderTrack.productName} </h4>
                          <p>{currency ? currency.symbol : '₹'}{""+orderTrack&&orderTrack.productPrice } </p>
                         {/* </div> */}
                        {/* <p>dfdsf fdf fewe dd fdsf ds fsd f sdf sd f sd fsd f sd w</p> 
                        <p>dsd fef ef ewf ewf   </p>
                        <p>dv fdsf dsf df d</p>
                        <p>dsff fer fwe f wef </p>
                        <p>ddd de wed wed w wed we d</p> */}

                    </div>
                    </div>

               </div>
               <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="split-custom right-custom-divider">
                    <div className="card-custom-content">
                    <h4>Shipping Address</h4>
                        <h5>{orderTrack&&orderTrack.shippingAddress1},{orderTrack&&orderTrack.shippingAddress2}</h5>
                        <p>{orderTrack&&orderTrack.shippingCity}</p>
                        <p>postal code:{orderTrack&&orderTrack.shippingPostcode}</p>
                        <p>country</p>
                        
                    </div>
                </div>
                </div>
                </div>
                
                </div>

                <div className="custom-track-flow-container">
                                            
                    
                    <div className="custom-track-flow">
                    
                    
                       {orderTrack.deliveryStatus.map((order,index)=> {
                       return(<div key={order.name}>
                        <div className="custom-box-track">
                            <img src={orderTrack.orderStatus===order.name? "/static/img/checked.svg":"/static/img/checkbox.svg"}/>
                            {order.name}
                            
                        </div>
                        {orderTrack.deliveryStatus.length===index+1?"": <div className="cautom-dotted-image"><img src="/static/img/dotted-image.png" rotate="180"></img></div>}
                        </div>)})}
                        {/* <div className="custom-dotted-track"/> */}
                        {/* <hr class='dotted' /> */}

                        {/* <div className="custom-box-track"><img src="/static/img/checkbox.svg"/>Completed</div>
                        <div className="cautom-dotted-image"><img src="/static/img/dotted-image.png" rotate="180"></img></div>

                        <div className="custom-box-track"><img src="/static/img/checkbox.svg"/>Hold</div>
                        <div className="cautom-dotted-image"><img src="/static/img/dotted-image.png" rotate="180"></img></div>

                        <div className="custom-box-track"><img src="/static/img/checkbox.svg"/>In Progress</div> */}
                        </div>
                    {/* </div> */}
                    </div>

                </div>}
                {/* <p></p> */}
                </div>:<div className="container">
                    <center><img src="/static/img/spurt-original-loader.gif"/></center>
                    </div>}

        
    </div>

    )
    
}

const mapStateToProps=state=>{
    return state.setting;

}

export default connect(mapStateToProps)(OrderTracking);
