import React, { useEffect } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { modalSuccess, modalError } from "../../../api/intercept";
import { Modal } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import { useState } from 'react';
import { UserRegister, sendOtpToUser, otpVerificationApi } from '../../../api';
import { EmailValidator, upperPresent, lowerPresent, numPresent, specialPresent } from '../../helper/emailValidator';
import { useTranslation } from '../../../i18n';
import Head from 'next/head'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
// import { SITE_KEY } from '../../../api/url';
// import ReCAPTCHA from "react-google-recaptcha";
import CustomCaptcha from "../CustomCaptcha/captcha"
import { getSingupOfferData } from "../../../api";
import DisplayImageWithS3PreSignedUrl from "../../../components/elements/AwsS3PreSignedUrl";


function Register(auth) {

    const [name, setName] = useState("")
    const [lname, setLName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setpass] = useState("")
    const [cpass, setCpass] = useState("")
    const [number, setNumber] = useState("")
    const [nameValid, setNameValid] = useState("")
    const [lastNameValid, setLastNameValid] = useState("")
    const [mailValid, setMailValid] = useState("")
    const [passValid, setPassValid] = useState([])
    const [cpassValid, setCpassValid] = useState("")
    const [numValid, setNumValid] = useState("")
    const [submit, setSubmit] = useState(0)
    const { t } = useTranslation('common');
    const [passShow, setPassShow] = useState(false)
    const [conpassShow, setConPassShow] = useState(false)
    const [showPop, setShowPop] = useState(false)
    const [mobileSubStr, setMobileSubStr] = useState("")
    const FullNameInputRef = React.useRef(null);
    // const recaptcha = React.useRef();
    const [otp, setOtp] = useState("")

    const [enteredCaptcha, setEnteredCaptcha] = useState('');
    const [browserIdentifier, setBrowserIdentifier] = useState('');
    const [showCustomCaptcha, setShowCustomCaptcha] = useState(true);
    const [isCaptchaBlank, setCaptchaBlank] = useState(false);
    const [reloadCaptchaOnError, setReloadCaptchaOnError] = useState(false);
    const [alreadyRegistred, setAlreadyRegistred]=useState(false)
    useEffect(() => {
        FullNameInputRef.current?.focus();
    }, []);

    const sendOtp = async () => {
        setSubmit(1)
        validMessage()
        if (validMessage()) {
            if (enteredCaptcha == "") {
                setCaptchaBlank(true);
                return false;
            } else {
                setCaptchaBlank(false);
            }
            //  const token = recaptcha.current.getValue()
            const otpResult = await sendOtpToUser(number, enteredCaptcha, browserIdentifier)
            if (otpResult.status == 200) {
                const mobSub1 = (number).substring(0, 2);
                const mobSub2 = (number).substring(8, 10);
                setMobileSubStr(`${mobSub1}******${mobSub2}`)
                setShowPop(true)
            } else {
                setReloadCaptchaOnError(!reloadCaptchaOnError)
                modalError('error', "Captcha is Invalid");
            }


            // window.grecaptcha.ready(()=>{
            //     window.grecaptcha.execute(SITE_KEY, {action: 'submit'}).then(async (token) => {
            //     console.log("tokentokentokentoken", token)      
            //     await sendOtpToUser(number, token)
            //     const mobSub1 = (number).substring(0, 2);
            //     const mobSub2 = (number).substring(8, 10);
            //     setMobileSubStr(`${mobSub1}******${mobSub2}`)
            //     setShowPop(true)
            //     })
            // })

        }
    }

    useEffect(() => {
        // console.log(SITE_KEY)
        //      loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
        //          console.log("script loaded")
        //      });
    }, [])

    const loadScriptByURL = (id, url, callback) => {
        const isScriptExist = document.getElementById(id);

        if (!isScriptExist) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.id = id;
            script.onload = function () {
                if (callback) callback();
            };
            document.body.appendChild(script)
        }
        if (isScriptExist && callback) callback();
    }

    const otpVerification = async () => {

        const result = await otpVerificationApi(number, otp)
        if (result.status == 200) {
            const userResult = await UserRegister(name.trim(), lname.trim(), mail, pass, cpass, number, Router)
            console.log(userResult)
            if (userResult.status == 200) {
                modalSuccess('success', "You have successfully registered");
                Router.push("/account/login")
            } else {
                setAlreadyRegistred(true)
                setShowPop(false)
            }
        } else {
            modalError('error', "OTP is invalid. Please try again.");
        }
    }

    
    const loginAction = ()=>{
        setAlreadyRegistred(false)
        setShowPop(false)
        Router.push("/account/login")
    }
    const closeModal = () => {
        setReloadCaptchaOnError(!reloadCaptchaOnError)
        setEnteredCaptcha("");
        setShowPop(false)
    }

    const validMessage = () => {
        let validateObj = { nameValid: false, lastNameValid: false, mailValid: false, passValid: false, cpassValid: false, numValid: false }
        var regex = new RegExp('^(([a-zA-Z0-9][a-zA-Z0-9 ]*)([,-@/#:().+!%][a-zA-Z0-9][a-zA-Z0-9 ]*)*)$');
        if (name.length < 2 && name.length !== 0) {
            setNameValid("Minimum of 2 characters")
            validateObj.nameValid = false;
        }
        else if (name.length === 0) {
            setNameValid("First name is required")
            validateObj.nameValid = false;
        } else if (!name?.match(regex)) {
            setNameValid("Invalid first name format")
            validateObj.nameValid = false;
        }
        else {
            setNameValid("")
            validateObj.nameValid = true;
        }
        var regex = new RegExp('^(([a-zA-Z0-9][a-zA-Z0-9 ]*)([,-@/#:().+!%][a-zA-Z0-9][a-zA-Z0-9 ]*)*)$');
        if (lname.length < 3 && lname.length !== 0) {
            setLastNameValid("Minimum of 3 characters")
            validateObj.lastNameValid = false;
        }
        else if (lname.length === 0) {
            setLastNameValid("last name is required")
            validateObj.lastNameValid = false;
        } else if (!lname?.match(regex)) {
            setLastNameValid("Invalid last name format")
            validateObj.lastNameValid = false;
        }
        else {
            setLastNameValid("")
            validateObj.lastNameValid = true;
        }

        if (mail) {
            let emailCheck = EmailValidator(mail)
            if (emailCheck) {
                setMailValid("")
                validateObj.mailValid = true
            }
            else {
                setMailValid("Invalid email address")
                validateObj.mailValid = false;
            }
        }
        else {
            setMailValid("Email is required")

        }


        if (pass === "") {
            setPassValid(["Password is required"])
            validateObj.passValid = false


        } else {
            let arrayValue = []
            if (!upperPresent(pass)) {
                arrayValue.push("Must contain at least 1 in capital case!")
            }
            if (!numPresent(pass)) {
                arrayValue.push("Must have at least 1 number")
            }
            if (!lowerPresent(pass)) {
                arrayValue.push("Must contain at least 1 lower case!")
            }
            if (!specialPresent(pass)) {
                arrayValue.push("Must contain at least 1 special characters!")
            }
            if (pass.length < 8) {
                arrayValue.push("Must be at least 8 characters!")
            }
            if (arrayValue.length > 0) {
                validateObj.passValid = false
            } else {
                validateObj.passValid = true
            }
            setPassValid(arrayValue)
        }


        if (cpass) {
            if (cpass && cpass !== pass) {
                setCpassValid(" Passwords do not match")
                validateObj.cpassValid = false
            }
            else {
                setCpassValid("")
                validateObj.cpassValid = true
            }
        }
        else {
            setCpassValid()
        }

        if (number) {
            let phoneCheck = validnumber(number)
            console.log(phoneCheck, "phonecheck")
            console.log(number, "number")
            if (phoneCheck) {
                setNumValid("")
                validateObj.numValid = true
            } else {
                setNumValid("Invalid mobile number")
                validateObj.numValid = false
            }
        }
        else {
            setNumValid("Phone number is required")
            validateObj.numValid = false
        }

        if (validateObj.nameValid && validateObj.lastNameValid && validateObj.mailValid && validateObj.numValid && validateObj.passValid && validateObj.cpassValid) {
            return true
        } else {
            return false
        }

    }

    const validNameFill = (value) => {
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t?.match(regex)) {
            setName(value)

        }
        if (t.length < 2 && t.length !== 0) {
            setNameValid("Minimum of 2 characters")
        }
        else if (t.length === 0) {
            setNameValid("First name is required")
        }
        else {
            setNameValid("")
        }
    }

    const validLastNameFill = (value) => {
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t?.match(regex)) {
            setLName(value)

        }
        if (t.length < 3 && t.length !== 0) {
            setLastNameValid("Minimum of 3 characters")
        }
        else if (t.length === 0) {
            setLastNameValid("Last name is required")
        }
        else {
            setLastNameValid("")
        }
    }

    const validnumber = (value) => {
        var roleExpression = "^[6,7,8,9]{1}[0-9]{9}$";
        var regex = new RegExp(roleExpression);
        var t = value;
        if (t.match(regex) && t.length == 10) {
            return true
        } else {
            return false
        }


    }
    // /^[0-9\b]+$/


    const registerOnChange = (e) => {
        const { name, value, type } = e.target;
        if (value.length > 10 && type == "number") {
            return false
        }
        if (name === "firstname") {
            setName(value)
            if (submit) {

                if (value.length < 2 && value.length !== 0) {
                    setNameValid("First Name must be Minimum of 2 letters")
                }
                else if (value.length === 0) {
                    setNameValid("First name is required")
                }

                else {
                    setNameValid("")
                }
            }
        }

        if (name === "lastname") {
            setLName(value)
            if (submit) {

                if (value.length < 2 && value.length !== 0) {
                    setLastNameValid("Last Name must be Minimum of 2 letters")
                } else if (value.length === 0) {
                    setLastNameValid("Last name is required")
                } else {
                    setLastNameValid("")
                }

            }
        }

        if (name === "email") {
            setMail(value)

            if (value) {
                let emailCheck = EmailValidator(value)
                if (emailCheck) {
                    setMailValid("")
                }
                else {
                    setMailValid("Invalid email address")
                }
            }
            else {
                setMailValid("Email is required")
            }

        }


        if (name === "password") {
            if (value === "") {
                setPassValid(["New password is required"])
                setpass(value)
            }
            else {

                setpass(value)
                let arrayValue = []
                if (!upperPresent(value)) {
                    arrayValue.push("Must contain at least 1 in capital case!")
                }
                if (!numPresent(value)) {
                    arrayValue.push("Must have at least 1 number")
                }
                if (!lowerPresent(value)) {
                    arrayValue.push("Must contain at least 1 lower case!")
                }
                if (!specialPresent(value)) {
                    arrayValue.push("Must contain at least 1 special characters!")
                }
                if (value.length < 8) {
                    arrayValue.push("Must be at least 8 characters!")
                }
                if (arrayValue.length > 0) {
                    setPassValid(arrayValue)

                } else {

                    setPassValid([])
                }


            }
        }



        if (name == "cpass") {
            setCpass(e.target.value)
            // if(value) {
            // if (submit) {
            if (value && value !== pass) {
                setCpassValid(" Passwords do not match")
            }
            else {
                setCpassValid("")
            }
        }
        // else {
        //     setCpassValid()
        // }
        // }

        if (name === "number") {
            setNumber(e.target.value)

            if (e.target.value && e.target.value.length === 10) {
                setNumValid("")
            } else if (e.target.value && e.target.value.length != 10) {
                setNumValid("Phone number must be 10 digits long")
            }
            else {
                setNumValid("Phone number is required")
            }
        }

    }


    const validateMessages = {
        required: '${name} is required!',
        types: {
            email: 'Please enter a valid email',

        },

    };




    const enterKeyEvent = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();

            handleSubmit()
        }


    }

    const [signUpOfferData, setSignupOfferData] = useState();
    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //     //checkCounter();
        // }
        getSingupOfferData(setSignupOfferData);
    }, [])


    return (
        <>
            <div onKeyPress={e => enterKeyEvent(e)}>
                <Head>
                    <title>Register</title>

                </Head>
                <div className="container staticPages">
                    <div className="row">


                        <div className="col-md-8">
                            <h3>{t('Register.Registration')}</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>First Name</label><sup>*</sup>
                                        <input className="form-control" name="firstname" placeholder="First Name" ref={FullNameInputRef} value={name} maxLength="30"
                                            onChange={e => validNameFill(e.target.value)} style={{ borderColor: nameValid && "red" }}

                                        />
                                        {nameValid !== "" && <span className='text-danger'>{nameValid}</span>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Last Name</label><sup>*</sup>
                                        <input className="form-control" name="lastname" placeholder="Last Name" value={lname} maxLength="30"
                                            onChange={e => validLastNameFill(e.target.value)} style={{ borderColor: lastNameValid && "red" }}
                                        />
                                        {lastNameValid !== "" && <span className='text-danger'>{lastNameValid}</span>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>{t('Register.E-mail')}</label><sup>*</sup>
                                        <input className="form-control" name="email" placeholder={t('Register.UserName')}
                                            value={mail}
                                            onChange={e => registerOnChange(e)}
                                            style={{ borderColor: mailValid && "red" }}
                                        />
                                        {mailValid !== "" && <span className='text-danger'>{mailValid}</span>}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>{t('Register.PhoneNumber')}</label><sup>*</sup>
                                        <input className="form-control" name="number" type="number" placeholder={t('Register.PhoneNumber')}
                                            value={number}
                                            onChange={e => registerOnChange(e)}
                                            onKeyDown={(evt) => ["e", "E", ".", "-", "+"].includes(evt.key) && evt.preventDefault()}

                                            // onChange={e=>loginOnChange(e)}
                                            maxLength="10"
                                            style={{ borderColor: numValid && "red" }}
                                        />

                                        {numValid !== "" && <span className='text-danger'>{numValid}</span>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>{t('Register.Password')}</label><sup>*</sup>
                                        <div className="ps-login-passcontain">
                                            <input className="form-control" onPaste={(e) => {
                                                e.preventDefault()
                                                return false;
                                            }} name="password" placeholder={t('Register.Password')} type={passShow ? "text" : "password"}
                                                value={pass}
                                                onChange={e => registerOnChange(e)}
                                                // onChange={e=>loginOnChange(e)}
                                                style={{ borderColor: passValid.length == !0 ? "red" : "" }}
                                            />
                                            {passShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "12px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "12px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} />}

                                            {passValid !== "" && <span style={{ color: "#ff5252" }}>{passValid.map((error) => <>
                                                {/* <ul className="ps-pass-restrict"><li style={{listStyle:"none"}} >{error}</li></ul> */}
                                                <span className='custom-field-error'>{error}<br></br></span>
                                            </>)}</span>}

                                        </div>
                                    </div>
                                    {/* <ul className="ps-pass-restrict">
                                    <li>Must be at least 8 characters long</li>
                                    <li>Must not duplicate any part of the email address</li>
                                    <li>Must contain at least one lowercase and one uppercase letter</li>
                                    <li>Must contain at least one symbol or number</li>
                                </ul> */}
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>{t('Register.ConfrimPassword')}</label><sup>*</sup>
                                        <div className="ps-login-passcontain">
                                            <input className="form-control" onPaste={(e) => {
                                                e.preventDefault()
                                                return false
                                            }}
                                                name="cpass" placeholder={t('Register.ConfrimPassword')} type={conpassShow ? "text" : "password"}
                                                value={cpass}
                                                onChange={e => registerOnChange(e)}
                                                style={{ borderColor: cpassValid === "" ? "" : cpassValid === undefined ? "red" : "" }}

                                            />

                                            {conpassShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "12px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "12px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} />}

                                            {cpassValid !== "" && <span style={{ color: "#ff5252" }}>{cpassValid}</span>}
                                        </div>
                                    </div>
                                </div>
                                {/* <ReCAPTCHA ref={recaptcha} sitekey={SITE_KEY} /> */}
                                <div className="col-md-6">
                                    {showCustomCaptcha && <CustomCaptcha setEnteredCaptcha={setEnteredCaptcha} enteredCaptcha={enteredCaptcha} setBrowserIdentifier={setBrowserIdentifier} isCaptchaBlank={isCaptchaBlank} reloadCaptchaOnError={reloadCaptchaOnError} />}
                                </div>
                                <div className="col-md-12 mt-4">
                                    <p className='alert alert-warning d-none'><input type='checkbox' checked={true} disabled={true}/> By clicking Sign Up, you agree to our Terms of Services and that you have read our <Link href="/page-detail/privacy"><a style={{ color: "blue" }}>Privacy Policy</a></Link></p>
                                    <button className="btn btn-primary" onClick={e => sendOtp(e)}

                                    >{t('Register.REGISTER')}</button>
                                    <p className='mt-2'>{t('Register.AlreadyHaveanAccount')}?
                                        <Link href="/account/login">
                                            <a className='newline' style={{ color: "blue" }}> {t('Register.Signin')}</a>

                                        </Link></p>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-4">
                            <div>
                                {

                                  <img src="/static/img/reg-img.svg" />
                                }
                            </div>
                        </div>


                    </div>

                </div>
            </div>


            <Modal
                open={showPop}
                onCancel={e => closeModal(e)}
                footer={null}
                width={600}
                height={500}>

                <div className='otp-popup'>
                    <h3>
                        Enter Otp
                    </h3>
                    <p>Please Enter OTP sent to {mobileSubStr}</p>
                    <div className='otp-input'>
                        <input name="OTP" placeholder='Enter OTP' type="otp" value={otp} onChange={e => setOtp(e.target.value)} onKeyPress={e => enterKeyEvent(e)} />
                    </div>
                    <input type='button' value="Verify" className='btn-primary' onClick={e => otpVerification()} style={{ margin: "7px", width: "69px" }} />
                </div>

            </Modal>

            
            <Modal
                open={alreadyRegistred}
                onCancel={e => closeModal(e)}
                footer={null}
                width={600}
                height={500}>

                <div className='otp-popup'>
                    <h3>
                        Message
                    </h3>
                    <p className='alert alert-danger'>The customer already has an account, please sign in with us using the existing credentials</p>
                    <input type='button' value="Login" className='btn-primary' onClick={e => loginAction()} style={{ margin: "7px", width: "69px" }} />
                </div>

            </Modal>

        </>

    );

}

const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
