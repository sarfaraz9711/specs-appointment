
import React from 'react';
import { login,userData } from '../../../store/auth/action';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { Button, Modal, notification, Space, Tabs } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
//import { GoogleLogin } from 'react-google-login';
import { MobileGenrate, OtpGenrate, UserOauthLogin, ValidateOtp } from '../../../api';
import { UserLogin } from '../../../api';
import { EmailValidator } from '../../helper/emailValidator';
import { PhoneValidator } from '../../helper/allValidator'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../i18n';
import Head from 'next/head'
import { GoogleLoginApi } from '../../../api/auth/GoogleLoginApi';
import { forgotApi, fbAccountRegister } from '../../../api';
import { modalSuccess, modalWarning } from '../../../api/intercept';
import ChangeSizePop from '../../shared/modal/changepassPop';
import { send } from 'react-ga';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import * as ga from '../../../utilities/common-helpers';
//import { SITE_KEY } from '../../../api/url';
// import ReCAPTCHA from "react-google-recaptcha";
import CustomCaptcha from "../../partials/CustomCaptcha/captcha"
function Login(props) {
    const dispatch = useDispatch()
    const [mail, setMail] = useState("")
    const [mailandPhone, setEmailandPhone] = useState("")
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [loginType, setLoginType] = useState("normal")
    const [emailValid, setEmailValid] = useState("");
    const [phoneValid, setPhoneVaild] = useState("")
    const [isMobileValid, setMobileValid] = useState(false)
    const [otp, setOtp] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [showPassword, setShowPassword] = useState(true)
    const [passValid, setPassValid] = useState("")
    const [passShow, setPassShow] = useState(false)
    const [loadImg, setLoadImg] = useState(false)
    const [googleId, setgoogleId] = useState("")
    const [googlePath, setgooglePath] = useState("")
    const [phoneErrorBoolean, setPhoneErrorBoolean] = useState(false);
    const [otpErrorBoolean, setOtpErrorBoolean] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [shouldSowTimer, setShouldSowTimer] = useState();
    const [mobileSubStr, setMobileSubStr]=useState("") 
    const [timerForOTP, setTimerForOTP] = useState(60);
    const [flagUp, setFlagUp] = useState(false);
    const { t } = useTranslation('common');

    const [loginEmail, setLoginEmail] = useState("")
    const [forgotSuccess, setForgotSuccess] = useState("")

    const [getMinLength, setMinLength] = useState(10)
    const [getMaxLength, setMaxLength] = useState(10)
    const [getCurrentViewForLogin, setCurrentViewForLogin] = useState("Mobile");
    const [getActionName, setActionName] = useState("Email");
    const [showPop, setShowPop] = useState(false)
    const [logindata, setLogindata] = useState("")
    const [num, setNum] = useState("")
    const [id, setId] = useState("")
    const [showMobile, setShowMobile] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [numberError, setNumberError] = useState("")
    // const recaptcha = React.useRef();


    const [enteredCaptcha, setEnteredCaptcha] = useState('');
    const [browserIdentifier, setBrowserIdentifier] = useState('');
    const [showCustomCaptcha, setShowCustomCaptcha] = useState(true);
    const [isCaptchaBlank, setCaptchaBlank] = useState(false);
    const [reloadCaptchaOnError, setReloadCaptchaOnError] = useState(false);

    var _intVarl = '';
    const handleChange = (e) => {
        setLoginEmail(e.target.value);
    }
    const handleClick = () => {
        if (loginEmail != "") {
            forgotApi(loginEmail, setForgotSuccess)
        } else {
            modalSuccess('error', "Enter a valid Email Id")
        }
    }

    useEffect(() => {
        localStorage.removeItem("cartItem");
        if (getCurrentViewForLogin == 'Mobile') {
            setActionName('Email');
            setMinLength(10);
            setMaxLength(10);
        } else {
            setActionName('Mobile');
            setMinLength(3);
            setMaxLength(50);
        }
    }, [getCurrentViewForLogin]);

    useEffect(()=>{
        // console.log(SITE_KEY)
        //      loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
        //          console.log("script loaded")
        //      });
         },[])
     
         const loadScriptByURL = (id, url, callback) => {
             const isScriptExist = document.getElementById(id);
     
             if(!isScriptExist){
                 var script = document.createElement("script");
                 script.type = "text/javascript";
                 script.src = url;
                 script.id = id;
                 script.onload = function () {
                     if(callback) callback();
                 };
                 document.body.appendChild(script)
             }
             if(isScriptExist && callback) callback();
         }

    const emailInputRef = React.useRef(null);
    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
    }, [props])

    // const handleFeatureWillUpdate = (type) => {
    //     setLoginType(type)
    //     GoogleLoginApi(mailandPhone, password, type, setgoogleId, setgooglePath)
    //     setShowPassword(false)

    // }

    const validate = (checkOtp = true) => {
        let validateObj = {
            phoneD: true, otp: true
        }
        if (mailandPhone === "") {
            setPhoneError("Phone is required");
            validateObj.phoneD = false;
            setPhoneErrorBoolean(true)

        } else if (mailandPhone !== "") {
            setPhoneError("")
            validateObj.phoneD = true;
            setPhoneErrorBoolean(false)
        }

        if (showOtp) {
            if (otp === "") {
                // console.log("---- ", "check1", otp);
                setOtpError("OTP is required");
                validateObj.otp = false;
                setOtpErrorBoolean(true)
            } else if (otp != "") {
                // console.log("---- ", "check2", otp);
                setOtpError("");
                validateObj.otp = true;
                setOtpErrorBoolean(false)
            }
        }
        console.log("showOtp----", showOtp)

        if (showPassword) {
            if (password === "") {
                // console.log("---- ", "check1", otp);

                validateObj.password = false;

            } else if (password != "") {
                // console.log("---- ", "check2", otp);

                validateObj.password = true;

            }
        }

        console.log("password----", showPassword)



        if (checkOtp) {
            if (validateObj.phoneD && validateObj.otp) {
                return true;
            } else {
                return false;
            }
        } else if (validateObj.phoneD) {
            return true;
        } else {
            return false;

        }
    }


    const handleLoginSubmit = async (e) => {
        console.log("erewrwerew3243432423")
        if(enteredCaptcha==""){
            setCaptchaBlank(true);
            return false;
        }else{
            setCaptchaBlank(false);
        }
        if (isMobileValid) {
            setLoadImg(true)
            // console.log(1)
            if (mailandPhone !== "") {
                setShowOtp(false);
                setShowPassword(false)
                let _r = validate(false);
                // console.log("ok-1", _r);
                if (!_r) {
                    return _r;
                }
                // console.log("ok-2", _r);
                // const token = recaptcha.current.getValue()
                const token= enteredCaptcha;
              //  const browserIdentifier = browserIdentifier;
                    let otpResponse = await OtpGenrate(mailandPhone, token, browserIdentifier);
                    console.log(otpResponse)
                    if (otpResponse.status == "200") {
                    setShowOtp(true);
                    setShowCustomCaptcha(false)
                    intervalCounter();
                    } else {
                    setShowOtp(false);
                    setShowCustomCaptcha(true)
                    setLoadImg(false)
                    setReloadCaptchaOnError(!reloadCaptchaOnError)
                    }
                // window.grecaptcha.ready(()=>{
                //     window.grecaptcha.execute(SITE_KEY, {action: 'submit'}).then(async (token) => {
                //     console.log("tokentokentokentoken", token)      
                //         let otpResponse = await OtpGenrate(mailandPhone, token);
                //                    console.log(otpResponse)
                // if (otpResponse.status == "200") {
                //     setShowOtp(true);
                //     intervalCounter();
                // } else {
                //     setShowOtp(false);
                //     setLoadImg(false)
                // }
                //     })
                // })
                console.log("OtpGenrate1")
     
            }
        } else {
            console.log('dfdddddddddsgdddddddddd')
            if (mailandPhone !== "" && password !== "" && emailValid === "" && passValid === "") {
                setLoadImg(true)
                let passwordResponse = await UserLogin(mailandPhone, password, loginType, Router, setLoginError, dispatch, setEmailandPhone, setPassword, setLoadImg, enteredCaptcha, browserIdentifier);

                console.log("passwordResponse", passwordResponse);
                if (passwordResponse && passwordResponse.status == "210") {
                    let mobileOtp = passwordResponse.mobile;
                   // const token = recaptcha.current.getValue()
                    let otpResponse = await OtpGenrate(mobileOtp, enteredCaptcha, browserIdentifier);
                    console.log("OtpGenrate2")
                    if (otpResponse.status != "204") {
                        Router.push('/account/genrateotp');
                    } else {
                        setShowOtp(false);
                    }
                    // window.grecaptcha.ready(()=>{
                    //     window.grecaptcha.execute(SITE_KEY, {action: 'submit'}).then(async (token) => {
                    //         let otpResponse = await OtpGenrate(mobileOtp, token);
                    //         console.log("OtpGenrate2")
                    //         if (otpResponse.status != "204") {
                    //             Router.push('/account/genrateotp');
                    //         } else {
                    //             setShowOtp(false);
                    //         }
                    //     })
                    // })

            
                } else if (passwordResponse && passwordResponse.status == "205") {
                    console.log('Nerossssssssssspppp')
                    if (passwordResponse.user.mobileNumber == null) {
                        setIsModalOpen(true)
                        setShowMobile(true)
                        setId(passwordResponse.user.id, "dgfhgfgf")


                    } else {
                        setLoadImg(false)
                        setLogindata(passwordResponse)
                        const data = passwordResponse.user
                        const userActive = data
                        const mobSub1 = (userActive?.mobileNumber).substring(0, 2);
                        const mobSub2 = (userActive?.mobileNumber).substring(8, 10);
                        setMobileSubStr(`${mobSub1}******${mobSub2}`)
                      //  const token = recaptcha.current.getValue()
                        let sendotp = await OtpGenrate(userActive?.mobileNumber, enteredCaptcha, browserIdentifier);
                        console.log("OtpGenrate3")
                        if (sendotp.status == 200) {
                            setShowPop(!showPop)
                            setIsModalOpen(false)

                        }
                        // window.grecaptcha.ready(()=>{
                        //     window.grecaptcha.execute(SITE_KEY, {action: 'submit'}).then(async (token) => {
                        //         let sendotp = await OtpGenrate(userActive?.mobileNumber, token);
                        //         console.log("OtpGenrate3")
                        //         if (sendotp.status == 200) {
                        //             setShowPop(!showPop)
                        //             setIsModalOpen(false)
        
                        //         }
                        //     })
                        // })
           
                    }

                } else if (passwordResponse && passwordResponse.status != "204") {
                    setShowPassword(true);
                    intervalCounter();
                } else {
                    setShowPassword(true);
                    setEnteredCaptcha('');
                    setReloadCaptchaOnError(!reloadCaptchaOnError)
                }


            }

        }



        if (mailandPhone == "" && password == "" && mailandPhone == "" || !phoneValid.length > 10) {

            setEmailValid("Email is required")
            console.log(setEmailValid, "xbxysxv")
            setPhoneVaild("Phone number is required")
            setPhoneVaild("only 10 digit number")
            setPassValid("Password is required")
        } else if (mailandPhone == "" || password == !"" && mailandPhone == !"" || password == "") {
            // setPassValid("Password is required")
        } else {
            // setEmailValid("Invalid email address")
        }

    };

    const handleMobileSubmit = async () => {
        let mobileResponse = await UserLogin(mailandPhone, password, loginType, Router, setLoginError, dispatch, setEmailandPhone, setPassword, setLoadImg);
        setLoadImg(false)
        let sendotp = await MobileGenrate(num, id);
        mobileResponse.user.mobileNumber = num
        setLogindata(mobileResponse)
        if (sendotp.data.status == 0) {
            setShowMessage(true)
            setShowPop(showPop)
            console.log("number already available")
        } else {
            setShowPop(!showPop)
            setIsModalOpen(false)
        }
        // if (sendotp.status == 200) {
        //     setShowPop(!showPop)
        //     setIsModalOpen(false)


        // }
        // if (sendotp.status == 202) {
        //     setShowPop(!showPop)

        // }
    }



    const responseGoogle = (response) => {
        console.log(response, "googledata")
       // if (response.error != "idpiframe_initialization_failed") {
            const decodedInfo = jwt_decode(response.credential);
console.log(decodedInfo, "IN response google")
const profileInfo = {
    email: decodedInfo.email,
    name: decodedInfo.name,
    image: decodedInfo.picture
}
const googleExtraInfo = {
    id: decodedInfo.sub,
    token: decodedInfo.aud,
    idToken: decodedInfo.aud
}

GoogleLoginApi(mailandPhone, password, "gmail", setgoogleId, setgooglePath, googleId, googlePath, profileInfo, Router, googleExtraInfo)
            //GoogleLoginApi(mailandPhone, password, "gmail", setgoogleId, setgooglePath, googleId, googlePath, response.profileObj, Router, response)
        //}
        //    if(googleId){
        // UserOauthLogin(response.profileObj, Router,response,googleId,googlePath)
        //    }


    }

    const responseFacebook = (res) => {
        if (Object.keys(res).length > 0) {
            console.log("res", res);
            fbAccountRegister(res);

        }
    }




    const loginOnChange = (e) => {
        // console.log(e.target.value.length)
        // if(e.target.value.length>10){
        //     return false
        // }

        const { name, value, type } = e.target;
        if (value.length > 10 && type == "number") {
            return false
        }
        console.log("name", name, value);
        if (name === "text") {
            setEmailandPhone(value)
            if (value) {
                let emailCheck = EmailValidator(value)
                if (emailCheck) {
                    setEmailValid("")
                    setMobileValid(false)
                }
                else {
                    setEmailValid("Invalid login Id")
                    setMobileValid(false)
                    if (value) {
                        let phoneCheck = PhoneValidator(value)
                        // console.log(4, phoneCheck)
                        if (phoneCheck) {
                            console.log(e.target.value.length, "gdshgdh")
                            if (e.target.value.length > 10) {
                                return false

                            } else {
                                setPhoneVaild("")
                                setMobileValid(true)
                                setEmailValid("")
                            }

                        } else {
                            console.log("ssss");
                        }

                    }
                }
            }
            else {
                setEmailValid("Login Id is required")
                setPhoneVaild("Login number is required")
            }
        }
        if (name === "password") {
            setPassword(e.target.value)
            if (value) {
                if (value.length) {
                    setPassValid("")
                }

            }
            else {
                setPassValid("Password is required")
            }
        }

        if (name == "text") {
            setEmailandPhone(e.target.value)
            if (value) {
                if (value) {
                    setPhoneVaild("")
                }

            }
            else {
                setPhoneVaild("Phone number is required")
            }
        }
        if(name === "number"){
            setNum(e.target.value)
            if(e.target.value && e.target.value.length === 10){
                setNumberError("")
            }else if(e.target.value && e.target.value.length != 10){
                setNumberError("Phone number must be 10 digits long")
            }else{
                setNumberError("Phone number is required")
            }
        }
        // console.log(phone, "gschsabchsa")
    }

    const enterKeyEvent = e => {
        // if (e.key === 'Enter') {
        //     e.preventDefault();
        //     e.stopPropagation();

        //     handleLoginSubmit()
        // }




    }


    const intervalCounter = () => {
        setFlagUp(true);
        let _t = 60;
        _intVarl = setInterval(() => {
            if (_t >= 0) {
                setShouldSowTimer(true);
                setTimerForOTP(_t--);
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(_intVarl);
            setShouldSowTimer(false);
        }, 60000);
    }


    const handleKeypress = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleOtpSubmit();
        }
    };


    const handleOtpSubmit = async (e) => {
        console.log("otp", otp)
        setLoadImg(true)
        let r = validate();

        if (!r) {
            return r;
        } else {
            setLoadImg(false)
        }

        let rData = await ValidateOtp(mailandPhone, otp);

        if (rData.status == "1") {
            localStorage.setItem("spurtToken", rData?.data?.token);
            localStorage.setItem("spurtUser", JSON.stringify(rData?.data?.user));
            // ga.event("login", {method: "Google"});
            let data = {
                event: "login",
                method: "Google"
              }
    
    
            ga.pushToDataLayer(data);
            Router.push('/');
            dispatch(login())
            console.log('dsd',rData?.data?.user)
            dispatch(userData(rData?.data?.user))
        } else {
            setLoadImg(true)
        }


    }

    const setActiveTab = (e) => {
        console.log(e, "gdhsgyasdh");
        Router.push('/account/login');
        // setShowPassword(true);
        setShowOtp(false)
        setShowPassword(true);
        setFlagUp(false);
        setTimerForOTP(0);
        intervalCounter(false)
    }

    const handleClose = () => {
        setIsModalOpen(false)
    }




    const setFormForOtherVersion = (currentSession) => {
        console.log("currentSession", currentSession);
        setShowCustomCaptcha(true)
        setReloadCaptchaOnError(!reloadCaptchaOnError);
        setEnteredCaptcha('');
        if (currentSession == 'Mobile') {
            clearInterval(_intVarl);
            setPassword('');
            setLoadImg(false);
            setShouldSowTimer(false)
            setShowOtp(false)
            setShowPassword(true);
            setFlagUp(false);
            // setTimerForOTP(0);
            intervalCounter(false)
            setCurrentViewForLogin('Mobile');
            setEmailandPhone('')
            // Get a reference to the last interval + 1
            const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
            console.log("interval_id", interval_id);
            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
                window.clearInterval(i);
            }

        } else if (currentSession == "Email") {
            setEmailandPhone('');
            setPassword('');
            clearInterval(_intVarl);
            setLoadImg(false);
            setShouldSowTimer(false)
            setShowOtp(false)
            setShowPassword(true);
            setFlagUp(false);
            // setTimerForOTP(0);
            intervalCounter(false)
            setCurrentViewForLogin('Email');
            // Get a reference to the last interval + 1
            const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);
            console.log("interval_id", interval_id);
            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
                window.clearInterval(i);
            }

        }
    }


    return (

        <div className="ps-my-account" onKeyPress={e => enterKeyEvent(e)}>

            <Head>
                <title>Login</title>

            </Head>

            {/* <div className='oh-tabs-container' style={{marginBottom: "24"}}>
                                    <Tabs

                                    items={new Array(3).fill(null).map((_, i) => {
                                        const id = String(i + 1);
                                        return {
                                            label: `tab ${id}`,
                                            key: id,
                                            childern: `content of tabpane ${id}`
                                        };
                                    })}
                                    />
                                </div> */}

            <div className="ps-login-container">

                <div className="ps-login-sub-container flex-common">
                    <div className="ps-login-left">
                        <div className="ps-login-left-main">
                            <h3>{t('login.login')}</h3>

                            {(getCurrentViewForLogin == 'Mobile' || getCurrentViewForLogin == 'Email') && <div className="ps-login-email-contain">
                                <p>
                                    {/* {t('Email/mobile no')} */}
                                    {showOtp?'Mobile':getCurrentViewForLogin}
                                </p>
                                <input type={getCurrentViewForLogin == 'Mobile' ? "number" : "text"} name="text" placeholder={getCurrentViewForLogin} ref={emailInputRef} value={mailandPhone} minLength={getMinLength} maxLength={getMaxLength}
                                    onChange={e => (loginOnChange(e), handleChange(e))} style={{ border: emailValid && "1px solid red" }} readOnly={e => showOtp}
                                />
                                {console.log("emailValid", emailValid, phoneValid)}
                                {(emailValid || phoneValid) && <span>{emailValid}</span>}
                            </div>}


                            {showPassword && getCurrentViewForLogin == 'Email' && <div className="ps-login-email-contain ps-bottom-pass">
                                <p>{t('login.Password')}</p>
                                <div className="ps-login-passcontain">
                                    <input name="password" placeholder={t('Password')} type={passShow ? "text" : "password"} value={password}
                                        style={{ border: passValid && "1px solid red" }} onChange={e => loginOnChange(e)} onKeyPress={e => enterKeyEvent(e)} />
                                    {passShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "10px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "10px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} />}
                                </div>
                                {passValid !== "" && <span style={{ color: "#ff5252" }}>{passValid}</span>}
                            </div>
                            }



                            {false && showOtp && <div className="ps-login-email-contain">
                                <p> Please Enter OTP sent to {mailandPhone} &nbsp;
                                    {/* <a href='javascript:void(0)' onClick={(e) => setActiveTab(e)}><strong>Change?</strong></a> */}
                                </p>


                            </div>}

                            {shouldSowTimer && flagUp && !showPassword && <div style={{ textAlign: "right" }}>Regenerate OTP - {timerForOTP}s</div>}


                            {!shouldSowTimer && flagUp && !showPassword && <div className='text-right'><button onClick={es => handleLoginSubmit(es)}>Regenerate OTP</button></div>}


                            {showOtp && <div className="ps-login-email-contain ps-bottom-pass">
                                <p>{t('OTP')}</p>
                                <div className="ps-login-passcontain">
                                    <input name="OTP" placeholder="Enter OTP" type="otp" value={otp}
                                        onChange={e => setOtp(e.target.value)} onKeyPress={e => handleKeypress(e)} />
                                </div>
                                {otpErrorBoolean && <span style={{ color: "#ff5252" }}>{otpError}</span>}
                            </div>
                            }


                            <>
                                <Modal
                                    open={isModalOpen}
                                    onCancel={e => handleClose(e)}
                                    width={600}
                                    height={800}
                                    footer={null}
                                >
                                    {showMobile && <div className='otp-popup'>
                                        <h3>
                                            Enter Mobile Number
                                        </h3>
                                        <div className='otp-input'>
                                            <input name="number" placeholder='mobile number' type="number" value={num} onChange={e => (loginOnChange(e))} onKeyDown={(evt)=>["e", "E", ".", "-"].includes(evt.key) && evt.preventDefault()} />
                                            {numberError !== "" && <div><span className="error-span">{numberError}</span></div>}
                                        </div>
                                        
                                        <button className='sub-btn' onClick={e => handleMobileSubmit()}>Submit</button>
                                    </div>}

                                    {showMessage && <div>
                                        <h5 style={{color: "red"}}>Mobile number already available</h5></div>}
                                </Modal>
                            </>





                            {getCurrentViewForLogin == 'Email' && <div className="ps-forgot-container">
                                {/* <Link href="/account/forgot-password"> */}
                                <a onClick={e => handleClick(e)}>{t('login.forgetpassword')} ?</a>
                                {/* </Link> */}
                            </div>
                            }
                            {/* <ReCAPTCHA ref={recaptcha} sitekey={SITE_KEY} /> */}
                            { showCustomCaptcha && <CustomCaptcha setEnteredCaptcha={setEnteredCaptcha}  enteredCaptcha={enteredCaptcha} setBrowserIdentifier={setBrowserIdentifier} isCaptchaBlank={isCaptchaBlank}  reloadCaptchaOnError={reloadCaptchaOnError} /> }

                            {!showOtp && getCurrentViewForLogin == 'Email' && <button className="ps-login-button aa" onClick={e => handleLoginSubmit(e)}>{loadImg ? <img src="/static/img/loading.gif" style={{ height: "40px", width: "40px" }} /> : <>{t('login.login')}</>}
                            </button>}

                            {/* { showPassword && <div style={{ textAlign: "center", padding: "5px" }}>OR</div> }  */}

                            {!showOtp && getCurrentViewForLogin == 'Mobile' &&
                                <button className="psa-login-button" disabled={!isMobileValid} onClick={e => handleLoginSubmit(e)}>{isMobileValid && loadImg ? <img src="/static/img/loading.gif" style={{ height: "40px", width: "40px", backgroundColor: "white" }} /> : <>{t('Request OTP')}</>}
                                </button>}

                            {showOtp && <button className="ps-login-button bb" onClick={e => handleOtpSubmit(e)}
                            >{loadImg ? <>{t('Submit')}</> : <img src="/static/img/loading.gif" style={{ height: "40px", width: "40px" }} />}</button>}


                            {/* <p className="ps-login-reg-link">{t('Login with Phone')}?
                                <Link href="/account/loginwithphone">
                                    <a> {t('Phone')}</a>
                                </Link></p> */}

                            {<p className="ps-login-reg-link">
                                <a href='javascript:void(0);' onClick={e => setFormForOtherVersion(getActionName)}>
                                    Login with {getActionName}
                                </a>
                            </p>}



                            <p className="ps-login-reg-link">{t('login.Donothaveanaccount')}?
                                <Link href="/account/register">
                                    <a> {t('login.registernow')}</a>
                                </Link></p>
                            <div className="ps-social-link-container">

                                <FacebookLogin
                                    // appId="863002871397008"
                                    // appId="1404663196952209" //sangeeta id
                                    appId="495464636097338"

                                    autoLoad={false}
                                    fields="name,email,picture"

                                    textButton="Sign In with Facebook"

                                    icon="fab fa-facebook-f"
                                    cssClass="ps-social-button"
                                    callback={responseFacebook}

                                />


                                {/* <GoogleLogin
                                    clientId="326680404078-fm2pbkgomc4nic42o6ua4difup6ff2dn.apps.googleusercontent.com"

                                    render={renderProps => (

                                        <button className="ps-social-button" onClick={renderProps.onClick}>
                                            <img src="/static/img/google-sign.svg" /> Sign In with Google
                                        </button>)}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    isSignedIn={false}

                                /> */}

                                <GoogleLogin
                                        onSuccess={credentialResponse => {
                                            
                                        //console.log(credentialResponse);

                                        
                                        responseGoogle(credentialResponse);
                                        // console.log(decodedInfo, "Nero Gmail")
                                        }}
                                        onError={() => {
                                        console.log('Login Failed');
                                        }}
                                    />

                            </div>
                        </div>
                    </div>
                    <div className="ps-login-right">
                        <img src="/static/img/login-page.png" />
                    </div>
                </div>
            </div>
            <ChangeSizePop showPop={showPop} setShowPop={setShowPop} logindata={logindata} mobileSubStr={mobileSubStr}/>
        </div>
    );
}
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);
