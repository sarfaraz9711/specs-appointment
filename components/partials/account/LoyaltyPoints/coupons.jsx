import React from 'react';
import Head from 'next/head'
import { useState } from 'react';

const MyCoupons = ({ props }) => {

    const [notapplicable, setNotApplicable] = useState([]);

 
        
    return (
        <section className="loyality-account-container">
            <div className="loyality-account-subcontainer">
                <Head>
                    <title>Coupons</title>
                </Head>
                <div className="loyality-position-container loyality-box">

                    <div className="cus-right-position">
                        <div className="adr-subcontainer">
                            <div className="loyality-main-contain">
                                <div className='coupon' key={props.Coupon}>
                                    <div className='container'>
                                        <img src="https://media.istockphoto.com/vectors/code-abstract-vector-modern-bar-code-sample-for-smartphone-scanning-vector-id1095468748?k=20&m=1095468748&s=612x612&w=0&h=QkNgbB839T27QTYllcNKGtTDQj8pgEQ5rjKs62HFXs4=" alt="Avatar" style={{ flex: "1", flexDirection: "column", alignItems: "flex-end", width: "90px" }} />
                                        { props.Store == 'N/A' ? <h4>Not Availed</h4>  : <h4>{props.Store}</h4>  }
                                        
                                    </div>
                                    <div className='container' >
                                        <p><b>Vaild till : {props.Validity}</b></p>

                                    </div>
                                    <div className='container'>
                                        <p> <b>Coupon Number :</b> <span className='promo'> {props.Coupon}</span></p>
                                        <p><b>Status :</b> <span className='status'> {props.Status} </span></p>
                                        <p>T & C *</p>
                                    </div>
                                </div>





                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyCoupons