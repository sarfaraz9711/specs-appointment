import React, { useRef } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import Router from "next/router";
import Link from 'next/link';
import { useTranslation } from '../../../i18n';


function GenrateMloyalOtp() {
    const [otp, setOTP] = useState({ first: "", sec: "", third: "", fourth: "" })
    const [forgotSuccess, setForgotSuccess] = useState(false)
    const [otpvalid, setotpvaild] = useState("");
    const [clicked, setclicked] = useState(false);
    const { t } = useTranslation('common');

    const handleSubmit = (e) => {
        setclicked(true);
        e.preventDefault();
        if (otpvalid === "") {
            setotpvaild("otp required");
        } else {
            let tempotp = otp.first.toString() + otp.sec.toString() + otp.third.toString() + otp.fourth.toString()
            console.log(e, tempotp);
            if (tempotp == "1234") { Router.push('//account/getotpnumbermloyal') }
            else { console.log("otp requird"); }
            // Router.push("/account/genrateotp")

        }

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
                                            <input style={{ border: "1px solid black" }} autoFocus
                                                className="form-control"
                                                name="otp1"
                                                id="otp1"
                                                type="number"
                                                value={otp?.first}
                                                onChange={e => { if (e?.target?.value?.length == 1) { document.getElementById("otp2").focus(); setOTP({ ...otp, first: e?.target?.value }) } }}
                                            />
                                            <input style={{ marginLeft: "10px", border: "1px solid black" }}
                                                className="form-control"
                                                name="otp2"
                                                id="otp2"
                                                type="number"
                                                value={otp.sec}
                                                onChange={e => { if (e?.target?.value?.length == 1) { document.getElementById("otp3").focus(); setOTP({ ...otp, sec: e?.target?.value }) } }}
                                            />
                                            <input style={{ marginLeft: "10px", border: "1px solid black" }}
                                                className="form-control"
                                                name="otp3"
                                                id="otp3"
                                                type="number"
                                                value={otp?.third}
                                                onChange={e => { if (e?.target?.value?.length == 1) { document.getElementById("otp4").focus(); setOTP({ ...otp, third: e?.target?.value }) } }}
                                            />
                                            <input style={{ marginLeft: "10px", border: "1px solid black" }}
                                                className="form-control"
                                                name="otp4"
                                                id="otp4"
                                                type="number"
                                                value={otp?.fourth}
                                                onChange={e => { if (e?.target?.value?.length == 1) setOTP({ ...otp, fourth: e?.target?.value }) }}
                                            />
                                        </div>

                                    </Form.Item>
                                </div>
                                <span style={{ color: "red" }}>{clicked && (otp?.first?.length != 1 || otp?.sec?.length != 1 || otp?.third?.length != 1 || otp?.fourth?.length != 1) ? "Please enter valid OTP." : null}</span>
                                <br />
                                <button className="ps-login-button" onClick={e => handleSubmit(e)}
                                >{t('Submit')}</button>

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

export default GenrateMloyalOtp;
