import React from 'react';
import Head from 'next/head'

const MyMembership = ({ props }) => {

    return (
        <section className="membership-account-container">
            <div className="membership-account-subcontainer">
                <Head>
                    <title>My Membership</title>
                </Head>
                <div className="membership-position-container loyality-box">

                    <div className="cus-right-position">
                        <div className="sdr-subcontainer">
                            <div className="membership-main-contain">
                                <div className='member' style={{ border: "3px solid  black", backgroundColor: "black", width: "33%" }}>
                                    <div className='member-container' style={{ display: "block", maxWidth: "100%", width: "85px", height: "85px", padding: "20px", marginBottom: "35px", top: "45px", position: "relative", fontSize: "20px"}}>
                                        <img src="https://media.istockphoto.com/vectors/code-abstract-vector-modern-bar-code-sample-for-smartphone-scanning-vector-id1095468748?k=20&m=1095468748&s=612x612&w=0&h=QkNgbB839T27QTYllcNKGtTDQj8pgEQ5rjKs62HFXs4=" alt="Avatar" style={{ flex: "1", flexDirection: "column", alignItems: "flex-end", width: "90px" }} />
                                        <h4 style={{ color: "white", margin: "3px", padding: "3px"  }}>{props.Name}</h4>
                                    </div>
                                    <div>
                                        <img src='http://redchief.mloyalcrm.com/microsite/images/logo_card.png' style={{ float: "right", height: "50px"}}/>
                                    </div>
                                    <div className='member-containerr'  >
                                        <p style={{ color: "white", display: "flex", padding: "10px" }}><b>{props.Slab} Customer </b></p>
                                    <div style={{ display: "block", fontSize: "16px", backgroundColor: "white", color: "black", bottom: "5px", textShadow: "none", left: "15px", backgroundPosition: "right center", fontWeight: "700", padding: "7px 10px", borderBottomLeftRadius: "8px"}}>Points: {props.LoyalityPoints}</div>
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

export default MyMembership