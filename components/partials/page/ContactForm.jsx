import React from 'react';
//import {ConnectPlugin}   from "../../connectPlugins";
import { useState } from 'react';
import { contactApi } from '../../../api';
import { EmailValidator } from '../../helper/emailValidator';
import { useSelector } from 'react-redux';

const ContactForm = () => {
    const [name,setName]=useState("")
    const [nameError,setNameError]=useState("")
    const [mail,setMail]=useState("")
    const [mailError,setMailError]=useState("")
    const [phone,setPhone]=useState("")
    const [phoneError,setPhoneError]=useState("")
    const [message,setMessage]=useState("")
    const [messageError,setMessageError]=useState("")
    const [submit,setSubmit]=useState(0)
    let currentColor=useSelector(s=>s.palette.currentColor)

  

    const handleSubmit=(e)=>{
        e.preventDefault()
        setSubmit(1)
        if(name!==""&&mail!==""&&phone!==""&&message!==""&&message.length>=6&&mailError===""){

                contactApi(name,mail,phone,message)
        }
        else{
            if(name===""){
                setNameError("* Name is required")
            }
            if(mail===""){
                setMailError("* Mail is required")
            }
            if(phone===""){
                setPhoneError("* Phone number is required")
            }
            if(message===""){
                setMessageError("* Message is required")
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
            setMailError("*Please enter a valid email")
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


    return(
        <div className="ps-contact-form">
           
    <div className="container">
        <form className="ps-form--contact-us" action="/" method="get">
            <h3>CONTACT US</h3>
            <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Name *"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        />
                        {submit===1&&name===""&&<div className="error-div">{nameError}</div>}
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="mail"
                            placeholder="Email *"
                            value={mail}
                            onChange={e=>emailCheck(e.target.value)}
                        />
                    {submit===1&&mailError!==""&&<div className="error-div">{mailError}</div>}

                    </div>

                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="number"
                            placeholder="Phone *"
                            value={phone}
                            onChange={e=>setPhone(e.target.value)}
                        />
                       {submit===1&&phone===""&&<div className="error-div">{phoneError}</div>}

                    </div>
                </div>
                {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Subject *"
                        />
                    </div>
                </div> */}
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Message (minimum 6 characters required) *"
                            value={message}
                            onChange={e=>messageValid(e.target.value)}
                            ></textarea>
                       {submit===1&&messageError!==""&&<div className="error-div">{messageError}</div>}

                    </div>
                </div>
            </div>
            <div className="form-group submit">
                <button className={`ps-btn ${currentColor}`} onClick={e=>handleSubmit(e)}>Send message</button>
            </div>
        </form>
    </div>
   </div>

    )

}




export default ContactForm;
