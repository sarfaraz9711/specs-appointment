import React, { useEffect } from "react";
//import {ConnectPlugin}   from "../../connectPlugins";
import {contactApi} from "../../../api";
import { useState } from 'react';
import {EmailValidator} from "../../helper/emailValidator";
import {useTranslation} from '../../../i18n';
import { useRouter } from "next/router";
import ContentLeftMenu from "../../ContentLeftMenu";
const nameReg = RegExp(/^[A-Za-z\s]*$/);
const phoneReg= RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
 const validPhone = (value)=>{
    if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value))
        return true
    else 
        return false;
}
function ContactComp(){
    const [name,setName]=useState("")
    const [nameError,setNameError]=useState("")
    const [mail,setMail]=useState("")
    const [mailError,setMailError]=useState("")
    const [phone,setPhone]=useState("")
    const [phoneError,setPhoneError]=useState("")
    const [message,setMessage]=useState("")
    const [messageError,setMessageError]=useState("")
    const [submit,setSubmit]=useState(0)
    const [nameError1,setNameError1]=useState()
    const { t } = useTranslation('common');
    const handleSubmit=(e)=>{
        e.preventDefault()
        setSubmit(1)
        if(nameReg.test(name) &&mail!==""&& phoneReg.test(phone) &&message!==""&&message.length>=6&&mailError===""){

             contactApi(name,mail,phone,message)
        }
        else{
            if(name===""){
                setNameError("Name is required")
            }
            if(mail===""){
                setMailError("Mail is required")
            }
            if(phone===""){
                setPhoneError("Phone number is required")
            }
            if(message===""){
                setMessageError("Message is required")
            }
        }
    }
    const emailCheck=(value)=>{
        
        if(EmailValidator(value)){
            setMail(value)
            setMailError("")
        }
        else{ 
            setMail(value)
            setMailError("Please enter a valid email")
        }
    }
    const validPhonecheck=(value)=>{
        
        if(validPhone(value)){
            setPhone(value)
           setPhoneError("")
        }
        else{ 
            setPhone(value)
            setPhoneError("Please enter a valid phone number")
        }
    }
    const messageValid=(value)=>{
        setMessage(value)
        if(value.length>=6){
            setMessageError("")
        }
        else{
            setMessageError("Minimum 6 characters is required")
        }
    }
    const userName=(value)=>{
       // console.log("object",value)
        setName(value)
        if(nameReg.test(value)){
            setNameError("")
        }
        else{
            setNameError("Please enter validate name")
        }
    }
    const router = useRouter();
     var  pdid  = router.query.pdid;
      let _url = typeof window !== "undefined" && window.location.href.split("/").includes('contact');
      if(_url){
          pdid  = "contact";
      }else{
          pdid  = pdid
      }
    return( 
        <div className="container staticPages">
           <div className="row">
            <div className="col-md-3">
            <div className='leftNav'>
                 <ContentLeftMenu pid={pdid} />
            </div>      
           </div>
            <div className="col-md-9 bgWhite">
            <div className="row">
            <div className="col-md-8">
                    <h3>{t('contact.CONTACTUS')}</h3>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>{t('contact.Name')}</label><sup>*</sup>
                                <input className="form-control" placeholder={t('contact.Name')} value={name} onChange={e => userName(e.target.value)} style={{ border: nameError && "1px solid red" }} />
                                {<div className="error-div">{nameError}</div>}
                            </div></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>{t('contact.Email')}</label><sup>*</sup>
                                <input className="form-control" placeholder="Email" value={mail} onChange={e => emailCheck(e.target.value)} style={{ border: mailError && "1px solid red" }} />
                                {<div className="error-div">{mailError}</div>}
                            </div> </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Phone</label><sup>*</sup>
                                <input className="form-control" placeholder="Phone" value={phone} onChange={e => validPhonecheck(e.target.value)} type="tel" maxLength="10" style={{ border: phoneError && "1px solid red" }} />
                                {<div className="error-div">{phoneError}</div>}
                            </div></div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>{t('contact.Message')}</label><sup>*</sup>
                                <textarea className="form-control" placeholder={t('contact.Message')} value={message} onChange={e => messageValid(e.target.value)} style={{ border: messageError && "1px solid red" }} />
                                {<div className="error-div">{messageError}</div>}
                            </div></div>
                            
                            <div className="col-md-12">
                        <button className="btn btn-primary" onClick={e=>handleSubmit(e)}>{t('contact.Submit')}</button>
                            </div>

                    </div>
                    </div>
            {/* <div className="ct-left-container">
                <h3>{t('contact.CONTACTUS')}</h3>
                <div className="ct-form-container">
                    <div className="ct-ip-container">
                        <p>{t('contact.Name')} *</p>
                        <input placeholder={t('contact.Name')} value={name} onChange={e=> userName(e.target.value)} style={{border:nameError&& "1px solid red"}}/>
                        {<div className="error-div">{nameError}</div>}
                    </div>
                    <div className="ct-ip-container">
                        <p>{t('contact.Email')} *</p>
                        <input placeholder="Email" value={mail} onChange={e=>emailCheck(e.target.value)} style={{border:mailError && "1px solid red"}}/>
                        {<div className="error-div">{mailError}</div>}
                    </div>
                    <div className="ct-ip-container">
                        <p>{t('contact.Phone')} </p>
                        <input placeholder={t('contact.Phone')} value={phone} onChange={e=>validPhonecheck(e.target.value)} type="tel" maxLength="10" style={{border:phoneError&& "1px solid red"}}/>
                        {<div className="error-div">{phoneError}</div>}
                    </div>
                    <div className="ct-ip-container">
                        <p>{t('contact.Message')} *</p>
                        <textarea placeholder={t('contact.Message')} value={message} onChange={e=>messageValid(e.target.value)} style={{border:messageError && "1px solid red"}}/>
                        {<div className="error-div">{messageError}</div>}
                    </div>
                    <div className="ct-button-container">
                        <button onClick={e=>handleSubmit(e)}>{t('contact.Submit')}</button>
                    </div>
                </div>
            </div> */}
            <div className="col-md-4">
            <div className="form-img">
                <img src="/static/img/contact-us-img.png"/>
            </div>
            </div>
            </div>
            </div>
           </div>
        </div>
    )
}

export default ContactComp;