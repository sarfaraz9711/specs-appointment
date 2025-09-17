import React from 'react';
import Head from 'next/head'

const MyTransaction = ({ props }) => {
console.log("props",props)
    return (
        <section className="loyality-account-container">
            <div className="loyality-account-subcontainer">
                <Head>
                    <title>Transactions</title>
                </Head>
                <div className="loyality-position-container">

                    <div className="cus-right-position">
                        <div className="adr-subcontainer">
                            <div className="loyality-main-contain">
                                <div className='coupon' style={{ border: "2px solid gray", backgroundColor: "#DCDCDC" }}>
                                    <div className='container' >
                                        <p style={{ color: "black" }}> <b>Last Used : </b> <span className='promo'>{props.BillDate}</span></p>
                                    </div>
                                    <div className='container' >
                                       
                                        <p style={{ color: "black" }}> <b>Bill No : </b> <span className='promo'>{props.BillNo}</span></p>
                                        <p style={{ color: "black" }}><b>Store Name : </b> <span className='status'>{props.StoreName} </span></p>
                                        <p style={{ color: "black" }}><b>Redeem Status : </b> <span className='status'>{props.Detail} </span></p>
                                        <p style={{ color: "black" }}><b>Points : </b> <span className='status'>{props.Points} </span></p>

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

export default MyTransaction