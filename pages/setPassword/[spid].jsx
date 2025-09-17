import  Router  from 'next/router';
import React from 'react';

import {useState,useEffect} from 'react';
import {changePasswordApi} from '../../api';
import {resetPassApi} from '../../api/account/resetPass';
import {numPresent, specialPresent, upperPresent} from '../../components/helper/emailValidator';

function SetPassword({query}){
    const [passSubmit,setPassSubmit]=useState(0)
    const [conPassError,setConPassError]=useState("")
    const [cpass,setCpass]=useState("")
    const [newPass,setNewPass]=useState("")
    const [newPassError,setNewPassError]=useState([])

    const passVaildator = () => {
        let validObj ={newPassValid:true,conPassValid:true}

        if(cpass.length!==0) {
            if(cpass !== newPass) {
                setConPassError("Password MisMatch")
                validObj.newPassValid = false
            }
            else {
                setConPassError("")
                validObj.newPassValid = true
            }
        } else {
            setConPassError("Password is required")
            validObj.newPassValid = false
        }

        if(newPass.length ===0) {
            setNewPassError(["Password is required"])
            validObj.conPassValid = false
        } else {
           

            if(upperPresent(newPass) && !newPass.length<8 && !numPresent(newPass) && !specialPresent(newPass)) {
                setNewPassError(["Must have at least 1 number","Must have at least 1 Symbol!"])
                validObj.conPassValid = false
            }
            if(!upperPresent(newPass) && !newPass.length<8 && !numPresent(newPass) && !specialPresent(newPass)) {
                setNewPassError(["Must contain at least 1 in Capital Case!","Must have at least 1 number!","Must have at least 1 Symbol!"])
                validObj.conPassValid = false
            }
            if(newPass.length<8 && !upperPresent(newPass) && !numPresent(newPass) && !specialPresent(newPass)) {
                setNewPassError(["Must be at least 8 characters!","Must contain at least 1 in Capital Case!","Must have at least 1 number!","Must have at least 1 Symbol!"])
                validObj.conPassValid = false
            }
            if(!newPass.length<8 && !upperPresent(newPass) && numPresent(newPass) && specialPresent(newPass)) {
                setNewPassError(["Must contain at least 1 in Capital Case!"])
                validObj.conPassValid = false
            }
            if(!newPass.length<8 && upperPresent(newPass) && !numPresent(newPass) && specialPresent(newPass)) {
                setNewPassError(["Must contain at least 1 in number!"])
                validObj.conPassValid = false
            }
            if(!newPass.length<8 && upperPresent(newPass) && numPresent(newPass) && !specialPresent(newPass)) {
                setNewPassError(["Must contain at least 1 in symbol!"])
                validObj.conPassValid = false
            }
            if(upperPresent(newPass) && !newPass.length<8 && numPresent(newPass) && specialPresent(newPass)) {
                setNewPassError([])
                validObj.conPassValid = true
            }
            if(newPass.length<8 && !upperPresent(newPass) && numPresent(newPass) && specialPresent(newPass)) {
                setNewPassError(["Must contain at least 1 in Capital Case!","Must be at least 8 characters!"])
                validObj.conPassValid = false
            }
            if(newPass.length<8 && !upperPresent(newPass) && numPresent(newPass) && specialPresent(newPass)) {
                setNewPassError(["Must contain at least 1 in Capital Case!"])
                validObj.conPassValid = false
            }
            if(upperPresent(newPass) && newPass.length<8 && !numPresent(newPass) && !specialPresent(newPass)){
                setNewPassError(["Must be at least 8 characters!"])
                validObj.conPassValid = false
            }
        }

        if(validObj.newPassValid && validObj.conPassValid) {
            return true;
        } else {
            return false;
        }
    }

    const handlePassSubmit = () => {
        setPassSubmit(1)
        if(passVaildator()) {
            resetPassApi(Router.query.spid,newPass,Router)
        }
    }

    useEffect(()=>{
        passVaildator()
    },[cpass,newPass])

    return (
        <div className="rp-container">
            <div className="rp-subcontainer">
                <div className="rp-main-container">
                    <span>Reset Password</span>
                    <input placeholder="New Password" type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} spellCheck={false}/>
                    {passSubmit===1&&newPassError.length!==0 && newPassError && newPassError.map((error)=>(
                            <p className="error-span" style={{margin:"0",fontSize:"11px"}}>{error}</p>
                    ))}
                    <input placeholder="Confirm Password" type="password" value={cpass} onChange={e=>setCpass(e.target.value)}/>
                    {passSubmit===1 && conPassError.length !==0 && <p className="error-span" style={{margin:"0",fontSize:"11px"}}>{conPassError}</p>}
                    <button onClick={e=>handlePassSubmit()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default SetPassword;

SetPassword.getInitialProps=async(ctx)=>({
    query:ctx.query
})