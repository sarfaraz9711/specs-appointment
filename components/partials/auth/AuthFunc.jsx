import React from 'react';
//import {ConnectPlugin}   from "../../connectPlugins";
import {useEffect} from 'react';
import {useState} from 'react';
import {forgotApi} from '../../../api';
import {EmailValidator} from '../../helper/emailValidator';

function AuthComp() {
    const [mail,setMail]=useState("")
    const [mailValid,setMailValid]=useState("")
    const [forgotSuccess,setForgotSuccess]=useState(false)
    const [submit,setSubmit] = useState(0)

    useEffect(()=>{
        if(submit) {
            valid()
        }
    },[mail])

    const valid = () => {
        let mailSub =true;
        if(mail.length !== 0) {
            let emailCheck = EmailValidator(mail)
            if(emailCheck){
                setMailValid("")
                mailSub = true;
            }
            else {
                setMailValid("Invalid email address")
                mailSub = false;
            }
        }
        else {
            setMailValid("Email is required")
            mailSub = false;
        }

        if(mailSub) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = () => {
        setSubmit(1)
        if(valid()) {
            forgotApi(mail,setForgotSuccess)
        }    
    }

    return(
        <div className="fp-container">
            <div className="fp-recover-form">
                {!forgotSuccess ? 
                <>
                    <span className="fp-title">Forgot Password</span>
                    <span className="fp-content">Enter your Registered email ID below. We will sent the link to</span>
                    <span className="fp-content">reset your password</span>
                    <input type="text" placeholder="Your email ID"  value={mail} onChange={e=>setMail(e.target.value)} spellCheck={false}/> 
                    {mailValid!=="" && <span style={{color:"red"}}>{mailValid}</span> }
                    <button className="fp-ripple" onClick={e=>handleSubmit()}>
                        <span>Submit</span>
                    </button>      
                    <p>Go Back To Login</p> 
                </> : <h3 style={{marginBottom:"72px"}}>Reset Password link has been sent to your email inbox.</h3>}
            </div>
        </div>
    )
}

export default AuthComp