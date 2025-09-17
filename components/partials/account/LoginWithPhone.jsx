import React from 'react';
import { Form, Input } from 'antd';
import { useState } from 'react';
import Router from "next/router";
import Link from 'next/link';
import { useTranslation } from '../../../i18n';
import { OtpGenrate,ValidateOtp,UserLogin } from '../../../api';

function Phone() {
    const [phone, setPhone] = useState("")
    const [numValid, setNumValid] = useState("");
    const [forgotSuccess] = useState(false)
    const [otpKey, setOtpKey] = useState("");
    const { t } = useTranslation('common');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [phoneError,setPhoneError] = useState("");
    const [otpError,setOtpError] = useState("");
    const [timerForOTP,setTimerForOTP] = useState(60);
    const [shouldSowTimer,setShouldSowTimer] = useState();
    const [flagUp,setFlagUp] = useState(false);
    
    

    
    
    const [phoneErrorBoolean,setPhoneErrorBoolean] = useState(false);
    const[otpErrorBoolean,setOtpErrorBoolean] = useState(false);


    const validate = (checkOtp = true) => {
        let validateObj = {
            phoneD: true, otp: true
        }
        if (phone === "") {
            setPhoneError("Phone is required");
            validateObj.phoneD = false;
            setPhoneErrorBoolean(true)

        } else if (phone !== "") {
            setPhoneError("")
            validateObj.phoneD = true;
            setPhoneErrorBoolean(false)
        }


        if(showOtp){
            if(otp === ""){
                console.log("---- ","check1",otp);
                setOtpError("OTP is required");
                validateObj.otp = false;
                setOtpErrorBoolean(true)
            }else if(otp != ""){
                console.log("---- ","check2",otp);
                setOtpError("");
                validateObj.otp = true;
                setOtpErrorBoolean(false)
            }
        }
        console.log("showOtp----",showOtp)
       
       
       
        if(checkOtp){
            if(validateObj.phoneD && validateObj.otp){
                return true;
            }else{
                return false;
            }
        }else if(validateObj.phoneD){
            return true;
        }else{
            return false;

        }
        


    }

    const handleSubmit = async (e) => {

        setShowOtp(false);
        let _r = validate(false);
        console.log("ok-1",_r);
        if(!_r){
            return _r;
        }
        console.log("ok-2",_r);

        let otpResponse = await OtpGenrate(phone);
        if (otpResponse.status != "204") {
            console.log("otpResponse",otpResponse);
            setShowOtp(true);
            intervalCounter();
        } else {
            setShowOtp(false);
        }
        if (otpResponse.data == 1) {

        } else {

        }
    }

    const intervalCounter = () => {
        setFlagUp(true);
        let _t = 60;
        let _intVarl = setInterval(()=>{
            if(_t >= 0){
                setShouldSowTimer(true);
                setTimerForOTP(_t--);
            }
        },1000);

        setTimeout(()=>{
            clearInterval(_intVarl);
            setShouldSowTimer(false);
        },60000);
    }

    const handleOtpSubmit = async (e) =>{
        
        let _r = validate();
        
        if(!_r){
            return _r;
        }

        let _rData = await ValidateOtp(phone, otp);

        if(_rData.status == "1"){
            localStorage.setItem("spurtToken", _rData?.data?.token);
            localStorage.setItem("spurtUser", JSON.stringify(_rData?.data?.user));
            Router.push('/');
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
                        <Form className="ps-form--account"
                            validateMessages={validate}>

                            <h3>Login with Phone</h3>
                            <div className="form-group">
                                <Form.Item name="Phone">
                                    <div style={{ border: "1px solid black" }}>
                                        <Input
                                            className="form-control"
                                            type="phone"
                                            placeholder="Phone Number"
                                            value={phone}
                                            readOnly = {showOtp}
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

                            {!shouldSowTimer && flagUp && <div style={{ textAlign: "right" }} onClick={es=>handleSubmit(es)}>Regenerate OTP</div>}
                            
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
                            >{t('Genrate OTP')}</button>}

                            {showOtp && <button className="ps-login-button" onClick={e => handleOtpSubmit(e)}
                            >{t('Submit')}</button>}

                            <p className='backlogin'>
                                <Link href="/account/login">
                                    <a >Go Back To Other Login</a>

                                </Link> Or <Link href="/account/register"><a>SignUp</a></Link>

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

export default Phone;
