import  Router, { useRouter }  from 'next/router';
import React from 'react';

import {useState,useEffect} from 'react';
import {changePasswordApi} from '../../api';
import {resetPassApi,resetConfomPassApi} from '../../api/account/resetPass';
import {numPresent, specialPresent, upperPresent} from '../../components/helper/emailValidator';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function SetPassword({query}){
   let router= useRouter()
    const [passSubmit,setPassSubmit]=useState(0)
    const [conPassError,setConPassError]=useState("")
    const [cpass,setCpass]=useState("")
    const [newPass,setNewPass]=useState("")
    const [newPassError,setNewPassError]=useState([])
    const [pageTru,setPageTrue]=useState(false)
    const [passShow, setPassShow] = useState(false)
    const [conpassShow, setConPassShow] = useState(false)

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
           

            if(upperPresent(newPass) && !newPass.length<8 && (!numPresent(newPass) || !specialPresent(newPass))) {
                setNewPassError(["Must have at least 1 number or Symbol!"])
                validObj.conPassValid = false
            }
            if(!upperPresent(newPass) && !newPass.length<8 && (!numPresent(newPass) || !specialPresent(newPass))) {
                setNewPassError(["Must contain at least 1 in Capital Case!","Must have at least 1 number or Symbol!"])
                validObj.conPassValid = false
            }
            if(newPass.length<8 && !upperPresent(newPass) && (!numPresent(newPass) || !specialPresent(newPass))) {
                setNewPassError(["Must be at least 8 characters!","Must contain at least 1 in Capital Case!","Must have at least 1 number or Symbol!"])
                validObj.conPassValid = false
            }
            if(!newPass.length<8 && !upperPresent(newPass) && (numPresent(newPass) || specialPresent(newPass))) {
                setNewPassError(["Must contain at least 1 in Capital Case!"])
                validObj.conPassValid = false
            }
            if(upperPresent(newPass) && !newPass.length<8 && (numPresent(newPass) || specialPresent(newPass))) {
                setNewPassError([])
                validObj.conPassValid = true
            }
            if(newPass.length<8 && !upperPresent(newPass) && (numPresent(newPass) || specialPresent(newPass))) {
                setNewPassError(["Must contain at least 1 in Capital Case!","Must be at least 8 characters!"])
                validObj.conPassValid = false
            }
            if(newPass.length<8 && !upperPresent(newPass) && (numPresent(newPass) || specialPresent(newPass))) {
                setNewPassError(["Must contain at least 1 in Capital Case!"])
                validObj.conPassValid = false
            }
            if(upperPresent(newPass) && newPass.length<8 && (!numPresent(newPass) || !specialPresent(newPass))){
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
            resetPassApi(router.query.token,newPass,Router)
        }
    }

    useEffect(()=>{
        resetConfomPassApi(router.query.token,setPageTrue)
    },[])
    console.log(router.query.token,'42fsdfsdfsf');
    useEffect(()=>{

        passVaildator()
    },[cpass,newPass])

    return (
        <>{pageTru==true&&<>
         <div className="rp-container">
            <div className="rp-subcontainer">
                <div className="rp-main-container">
                    <span>Reset Password</span>
                    <input placeholder="New Password" type={passShow ? "text" : "password"} value={newPass} onChange={e=>setNewPass(e.target.value)} spellCheck={false}/>
                    {passShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "85px", fontSize: "15px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "85px", fontSize: "15px", color: "#c0c4cc" }} onClick={e => setPassShow(!passShow)} />}
                    {passSubmit===1&&newPassError.length!==0 && newPassError && newPassError.map((error)=>(
                            <p className="error-span" style={{margin:"0",fontSize:"11px"}}>{error}</p>
                    ))}
                    <input placeholder="Confirm Password" type={conpassShow ? "text" : "password"} value={cpass} onChange={e=>setCpass(e.target.value)}/>
                    {conpassShow ? <EyeOutlined style={{ position: "absolute", right: "10px", top: "165px", fontSize: "15px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} /> : <EyeInvisibleOutlined style={{ position: "absolute", right: "10px", top: "165px", fontSize: "15px", color: "#c0c4cc" }} onClick={e => setConPassShow(!conpassShow)} />}
                    {passSubmit===1 && conPassError.length !==0 && <p className="error-span" style={{margin:"0",fontSize:"11px"}}>{conPassError}</p>}
                    <button onClick={e=>handlePassSubmit()}>Submit</button>
                </div>
            </div>
        </div>
        
        
        </>

        }
        
        </>
       
    )
}

export default SetPassword;

SetPassword.getInitialProps=async(ctx)=>({
    query:ctx.query
})