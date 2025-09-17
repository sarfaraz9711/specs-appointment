import React from 'react';
import Head from 'next/head'

const LoyalityPoints = ({ props }) => {
    console.log(props, "Nero Propss")
    let totalPoints = props && props[0].LoyalityPoints;
    let burnedPoints = props && props[0].BurningPoints
    return (
        <section className="cus-account-container">
            <div className="cus-account-subcontainer">
                <Head>
                    <title>Coupons</title>
                </Head>
                <div className="cus-position-container loyality-box">

                    <div className="cus-right-position">
                        <div className="adr-subcontainer">
                            <div className="adr-main-contain">
                                <div className='loyalty-points'>
                                    <div className='container'>
                                        {/* <p><b>Loyalty Points - {totalPoints}</b></p> */}
                                    </div>
                                    <div className='container'>
                                        <p style={{ color: "gray"}}><b>You Redeemed  <strong style={{ color: "black" }}>{burnedPoints}</strong> Points</b></p>
                                        {/* <p><b>You Redeemd {burnedPoints} Points</b></p> */}

                                    </div>
                                    <div className='container' >
                                        <p><b>You Have <strong style={{ color: "black" }}>{totalPoints}</strong> Points to Spend</b></p>

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

export default LoyalityPoints;