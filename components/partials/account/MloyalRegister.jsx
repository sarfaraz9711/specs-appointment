import React from 'react';
import { Form, Input } from 'antd';
import { useState } from 'react';
import Router from "next/router";
import Link from 'next/link';
import { useTranslation } from '../../../i18n';
import { useEffect } from 'react';
// import { OtpGenrate } from '../../../api';
import { mloyalApi } from '../../../api';
import { an } from '../../../api';
import { modalWarning, modalSuccess } from '../../../api/intercept';
import { mLoyalVal} from '../../../api/account/genratemloyalotp'
import { OtpGenrate, ValidateOtp } from '../../../api/account/otp-hndler/loginOtp'
import {registerUser} from '../../../api/loyalityPoints/index'

function Mlogin() {
    const [phone, setPhone] = useState("")
    const [numValid, setNumValid] = useState("");
    const [forgotSuccess] = useState(false)
    const { t } = useTranslation('common');
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [phoneErrorBoolean, setPhoneErrorBoolean] = useState(false);
    const [otpErrorBoolean, setOtpErrorBoolean] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [timerForOTP, setTimerForOTP] = useState(60);
    const [shouldSowTimer, setShouldSowTimer] = useState();
    const [flagUp, setFlagUp] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("spurtUser")) {

            setPhone(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber)

        }

    }, [])

    // const validate = (checkOtp = true) => {
    //     let validateObj = {
    //         phoneD: true, otp: true
    //     }
    //     if (phone === "") {
    //         setPhoneError("Phone is required");
    //         validateObj.phoneD = false;
    //         setPhoneErrorBoolean(true)

    //     } else if (phone !== "") {
    //         setPhoneError("")
    //         validateObj.phoneD = true;
    //         setPhoneErrorBoolean(false)
    //     }


    //     if (showOtp) {
    //         if (otp === "") {
    //             console.log("---- ", "check1", otp);
    //             setOtpError("OTP is required");
    //             validateObj.otp = false;
    //             setOtpErrorBoolean(true)
    //         } else if (otp != "") {
    //             console.log("---- ", "check2", otp);
    //             setOtpError("");
    //             validateObj.otp = true;
    //             setOtpErrorBoolean(false)
    //         }
    //     }
    //     console.log("showOtp----", showOtp)



    //     // if (checkOtp) {
    //     //     if (validateObj.phoneD && validateObj.otp) {
    //     //         return true;
    //     //     } else {
    //     //         return false;
    //     //     }
    //     // } else if (validateObj.phoneD) {
    //     //     return true;
    //     // } else {
    //     //     return false;

    //     // }



    // }

    const handleSubmit = async (e) => {
        const userData = JSON.parse(localStorage.getItem("spurtUser"));
        await OtpGenrate(phone, "VERIFY_REGISTRATION", "SOCIAL", userData.email);
        setShowOtp(true);
       // sessionStorage.setItem("mobileotp", "1234")

        // let _r = validate(false);
        // console.log("ok-1", _r);
        // if (!_r) {
        //     return _r;
        // }
        // console.log("ok-2", _r);

        // let otpResponse = await OtpGenrate(phone);
        // if (otpResponse.status != "204") {
        //     console.log("otpResponse",otpResponse);
        //     setShowOtp(true);
        //     intervalCounter();
        // } else {
        //     setShowOtp(false);
        // }
        // if (otpResponse.data == 1) {

        // } else {

        // }
    }

    // const intervalCounter = () => {
    //     setFlagUp(true);
    //     let _t = 60;
    //     let _intVarl = setInterval(() => {
    //         if (_t >= 0) {
    //             setShouldSowTimer(true);
    //             setTimerForOTP(_t--);
    //         }
    //     }, 1000);

    //     setTimeout(() => {
    //         clearInterval(_intVarl);
    //         setShouldSowTimer(false);
    //     }, 60000);
    // }

    const handleOtpSubmit = async (e) => {
        const userData = JSON.parse(localStorage.getItem("spurtUser"));
        const result = await ValidateOtp(phone, otp, "VERIFY_REGISTRATION", "SOCIAL", userData.email);
        console.log(result, "Nero Result Otp")
            if(result.status == 1){
                const payload = {
                    "objClass": [
                        {
                            "store_code": "ONLINE",
                            "registration_date": "2021-04-22 12:10",
                            "customer_name": userData.email,
                            "customer_mobile": phone
                           
                        }
                    ]
                }
                // Register User to Mloyal System(Loyality Points)
                await registerUser(payload);
               // Router.push("/");
                       localStorage.setItem("spurtToken", result.data.token);
                       localStorage.setItem("spurtUser",JSON.stringify(result.data.user));
                       modalSuccess('success', "OTP verified and logged in successfully")
                       Router.push("/");
            }else{
                modalWarning('error', "Please enter valid OTP");
            }
            
        // if (otp == sessionStorage.getItem("mobileotp")) {
        // const mLoyalData = JSON.parse(localStorage.getItem("spurtUser"));
        //     console.log(mLoyalData, "hcsjckja")
        //     const jsonData = {
        //         "objClass": [
        //             {
        //                 "store_code": "",
        //                 "registration_date": jsonData?.createdDate,
        //                 "customer_name": jsonData?.firstName,
        //                 "customer_mobile": jsonData?.mobileNumber,
        //                 "customer_email": jsonData?.email,
        //                 "customer_city": "",
        //                 "customer_pin": "",
        //                 "customer_dob": "",
        //                 "customer_doa": "",
        //                 "customer_gender": ""
        //             }
        //         ]
        //     }
        //         const mloyalResponse = await mLoyalVal(jsonData)
        //         console.log(mloyalResponse, "dagfayu")
        //         Router.push('/');
    
            
       
            // const result = await http.post(mloyalApi);
            // if (result && result.data && result.data.status === 1) {
            //     console.log(result, "sdscvhas")
            //     sessionStorage.setItem("spurtToken", result.data.data);
            //     sessionStorage.setItem("spurtUser", JSON.stringify(result.data.data));
            //     modalSuccess('success', result.data.message)
            //     Router.push('/');


            // } else {
            //     modalError('success', result.data.message)
            // }
        // } else {
        //     console.log("not found")
        // }

        // if (!_r) {
        //     return _r;
        // }


        // let rData = (phone, otp);
        // Router.push('/');
        // console.log(rData, "sgsvuabxd")
        // // console.log(mloyalApi, "scbcuabxcusa")

        // if (rData.status == "1") {
        //     localStorage.setItem("spurtToken", rData?.data?.token);

        // }

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
                            <div className='loyality-point-msg'>By registering mobile number, you will get 1000 loyality points which you can redeemed during shopping.</div>
                            <Form className="ps-form--account"
                            >

                                <h3>Enter Phone number</h3>
                                <div className="form-group">
                                    <Form.Item name="Phone">
                                        <div style={{ border: "1px solid black" }}>
                                            <Input
                                                className="form-control"
                                                type="phone"
                                                placeholder="Phone Number"
                                                value={phone}
                                                readOnly={showOtp}
                                                onChange={e => setPhone(e.target.value)}
                                                maxLength="10"
                                                minLength="10"
                                                style={{ borderColor: phoneError && "red" }}
                                            />
                                        </div>

                                        {phoneErrorBoolean && <span style={{ color: "#ff5252" }}>{phoneError}</span>}
                                    </Form.Item>

                                </div>

                                {shouldSowTimer && flagUp && <div style={{ textAlign: "right" }}>Regenerate OTP - {timerForOTP}s</div>}

                                {!shouldSowTimer && flagUp && <div style={{ textAlign: "right" }} onClick={es => handleSubmit(es)}>Regenerate OTP</div>}

                                <br />


                                {showOtp && <div className="form-group">
                                    <Form.Item
                                        name="OTP">
                                        <div style={{ border: "1px solid black" }}>
                                            <Input
                                                className="form-control"
                                                type="otp"

                                                placeholder="Enter OTP"

                                                value={otp}
                                                onChange={e => setOtp(e.target.value)}
                                                maxLength="4"
                                                minLength="4"
                                                style={{ borderColor: otpError && "red" }}
                                            />
                                        </div>

                                        {otpErrorBoolean && <span style={{ color: "#ff5252" }}>{otpError}</span>}
                                    </Form.Item>

                                </div>}
                                <br />
                                {!showOtp && <button className="ps-login-button" onClick={e => handleSubmit(e)}
                                >{t('Send OTP')}</button>}

                                {showOtp && <button className="ps-login-button" onClick={e => handleOtpSubmit(e)}
                                >{t('Verify Otp')}</button>}

                                <p className='backlogin'>
                                    <Link href="/">
                                        <a >Skip for now</a>

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

export default Mlogin;
