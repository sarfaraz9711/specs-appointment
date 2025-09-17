import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Router from 'next/router';
import { ValidateOtp } from '../../../api';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { changeMigUserPasswordApi } from '../../../api';
import { upperPresent, lowerPresent, numPresent, specialPresent } from '../../helper/emailValidator';

function ChangeSizePop({ showPop, setShowPop, logindata,mobileSubStr }) {
    const [newPass, setNewPass] = useState("")
    const [cfmpass, setCfmPass] = useState("")
    const [otp, setOtp] = useState("")
    const [passshow, setPassshow] = useState(false)
    const [newpassShow, setNewPassShow] = useState(false)
    const [conpassShow, setConPassShow] = useState(false)
    const [oldPass, setOldPass] = useState('MigUserRedchief@2023');
    const [passButtonLoader, setPassButtonLoader] = useState(false)
    const [oldPassError, setOldPassError] = useState("");
    const [newPassError, setNewPassError] = useState([])
    const [passSubmit, setPassSubmit] = useState(0)
    const [cfmpassError, setCfmPassError] = useState("")

    const data = logindata.user
    const userActive = data;

    const handleOtpSubmit = async (e) => {
        if (otp !== "") {
            const otpData = await ValidateOtp(userActive?.mobileNumber, otp);
            if (otpData && otpData.status == 1) {
                setPassshow(true)
            }
        }

    }

    const HandlePassChange = (e) => {
        const { name, value } = e.target;

        if (name === "newPass") {
            if (value === "") {
                setNewPassError(["New password is required"])
                setNewPass(value)
            }
            else {

                setNewPass(value)
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
                    setNewPassError(arrayValue)
                } else {
                    setNewPassError("")
                }
                if (value !== cfmpass) {
                    setCfmPassError("Passwords do not match")
                } else {
                    setCfmPassError("")
                }
            }
        }

        if (name === "cfmpass") {
            setCfmPass(value);
            if (value !== newPass) {
                setCfmPassError("Passwords do not match");
            } else {
                setCfmPassError("");
            }
        }
    }

    const handlePassChange = async () => {
        setPassSubmit(1)
        if (newPass === "" || cfmpass === "") {
            passVaildator()
        } else {
            setPassButtonLoader(true)
            const changepassword = await changeMigUserPasswordApi(oldPass, newPass, setPassButtonLoader, setOldPass, setNewPass, setOldPassError, setNewPassError, setPassSubmit, userActive.id)
            if (changepassword && changepassword.status == 1) {
                setShowPop(false)
            }
        }
    }

    const passVaildator = () => {
        let validateObj = { newPassError: false, cfmpassError: false }
        if (newPass === "") {
            setNewPassError(["Password is required"])
            validateObj.passValid = false
        } else {
            let arrayValue = []
            if (!upperPresent(newPass)) {
                arrayValue.push("Must contain at least 1 in capital case!")
            }
            if (!numPresent(newPass)) {
                arrayValue.push("Must have at least 1 number")
            }
            if (!lowerPresent(newPass)) {
                arrayValue.push("Must contain at least 1 lower case!")
            }
            if (!specialPresent(newPass)) {
                arrayValue.push("Must contain at least 1 special characters!")
            }
            if (newPass.length < 8) {
                arrayValue.push("Must be at least 8 characters!")
            }
            if (arrayValue.length > 0) {
                validateObj.passValid = false
            } else {
                validateObj.passValid = true
            }
            setNewPassError(arrayValue)
        }
        if (cfmpass === "") {
            setCfmPassError("Confirm password is required")
            validateObj.cfmpassError = false
        }
        else {
            if (newPass !== "" && cfmpass !== newPass) {
                setCfmPassError(" Passwords do not match")
                validateObj.cpassValid = false
            } else if (newPass === cfmpass && cfmpassError === "") {
                setCfmPassError("")
                validateObj.cpassValid = true
            }
            else {
                setCfmPassError("")
                validateObj.cpassValid = true
            }
            setCfmPassError("")
        }
    }
    const closeModal = () => {
        setShowPop(false)
    }
    const enterKeyEvent = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleOtpSubmit()

        }
    }

    return (
        <>
            <Modal
                open={showPop}
                onCancel={e => closeModal(e)}
                footer={null}
                width={600}
                height={500}>

                {!passshow && <div className='otp-popup'>
                    <h3>
                        Enter Otp
                    </h3>
                    <p>Please Enter OTP sent to {mobileSubStr}</p>
                    <div className='otp-input'>
                        <input name="OTP" placeholder='Enter OTP' type="otp" value={otp} onChange={e => setOtp(e.target.value)} onKeyPress={e => enterKeyEvent(e)} />
                    </div>
                    <input type='button' value="Verify" className='btn-primary' onClick={e => handleOtpSubmit()} style={{ margin: "7px", width: "69px" }} />
                </div>}

                {passshow && <div className='otp-popup'>
                    <h3>Change Password</h3>
                    <div className='otp-main-container'>
                        <input placeholder='New Password' type={newpassShow ? "text" : "password"} value={newPass} name="newPass" onChange={e => HandlePassChange(e)} style={{ border: newPassError && "1px solid red" }} />
                        {newpassShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setNewPassShow(!newpassShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setNewPassShow(!newpassShow)} />}
                        {newPassError.length !== 0 && newPassError && newPassError.map((error) => (
                            <div><span className="error-span">{error}</span></div>
                        ))}
                    </div>
                    <div className='otp-main-container'>
                        <input placeholder='Confirm Password' type={conpassShow ? "text" : "password"} name="cfmpass" value={cfmpass} onChange={e => HandlePassChange(e)} style={{ border: cfmpassError && "1px solid red" }} />
                        {conpassShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "32px", fontSize: "18px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} />}
                        {cfmpassError !== "" ? <span className="error-span">{cfmpassError}</span> : ""}
                    </div>
                    <input type='button' value="Submit" disabled={newPass !== cfmpass || cfmpass !== newPass ? "disabled" : ""} className='btn-primary' onClick={e => handlePassChange()} />
                </div>}
            </Modal></>)

}

export default ChangeSizePop