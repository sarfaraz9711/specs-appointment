import React, { useRef } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import Router from "next/router";
import Link from 'next/link';
import { useTranslation } from '../../../i18n';
import {ValidateOtpNew} from '../../../api/account/otp-hndler/loginOtp';
import {registerUser} from '../../../api/loyalityPoints'
import { modalWarning } from '../../../api/intercept';

function Genrate() {
    const [otp, setOTP] = useState("")
    const [forgotSuccess, setForgotSuccess] = useState(false)
    const [otpvalid, setotpvaild] = useState("");
    const [clicked, setclicked] = useState(false);
    const { t } = useTranslation('common');

    const handleSubmit = async(e) => {
        setclicked(true);
        e.preventDefault();

           const regDetail = await sessionStorage.getItem(
                "registrationDetail");
                
                const parsedString = JSON.parse(regDetail);
                
            const otpData = await ValidateOtpNew(parsedString.phoneNumber, otp);
            if(otpData.status == "200"){
                const payload = {
                    "objClass": [
                        {
                            "store_code": "ONLINE",
                            "registration_date": "2021-04-22 12:10",
                            "customer_name": parsedString.name,
                            "customer_mobile": parsedString.phoneNumber
                           
                        }
                    ]
                }
                await registerUser(payload);
                Router.push("/account/login");
                modalWarning('success', "You have successfully registered.");
            }else{
                modalWarning('error', "Please enter valid OTP");
            }
            

        //}

    }

    return (
        <div className='forgot-wrapper'>
            {forgotSuccess ? <h4
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "300px"
                }}
            >Please enter OTP</h4> : (
                <div className="ps-order-tracking">
                    <div className="container">

                        <div className="ps-section__content">
                            <Form className="ps-form--account">
                                <h3>Enter OTP</h3>

                                <div className="form-group" style={{ flexDirection: "row" }}>
                                    <Form.Item
                                        name="text"
                                        rules={[
                                            {
                                                required: true,
                                                type: "text",
                                            },
                                        ]}>
                                        <div style={{ display: "flex" }}>
                                            <input style={{border: "1px solid black" }}
                                                className="form-control"
                                                type="number"
                                                value={otp}
                                                onChange={e => {setOTP(e?.target?.value)}}/>
                                        </div>

                                    </Form.Item>
                                </div>
                                
                                <button className="ps-login-button" onClick={e => handleSubmit(e)}
                                >{t('Verify')}</button>

                                <p className='backlogin'>
                                    <Link href="/account/login">
                                        <a >Go Back To Login</a>
                                    </Link>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>

            )

            }

        </div>
    )
}

export default Genrate;
