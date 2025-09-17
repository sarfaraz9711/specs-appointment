import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Modal from 'react-modal';
import { useState } from 'react';
import { enquiryApi } from '../../../api';
import { EmailValidator } from '../../helper/emailValidator';
import { useSelector } from 'react-redux';

function EnquiryPopUp({showModal,setShowModal,serviceId}){
    const [name,setName]=useState("")
    const [mail,setMail]=useState("")
    const [phone,setPhone]=useState("")
    const [message,setMessage]=useState("")
    const [nameError,setNameError]=useState("")
    const [mailError,setMailError]=useState("")
    const [phoneError,setPhoneError]=useState("")
    const [messageError,setMessageError]=useState("")
    const [submit,setSubmit]=useState(0)
    let currentColor=useSelector(s=>s.palette.currentColor)



    const closeModal=()=>{
        setShowModal(false)
        setName("")
        setMail("")
        setPhone("")
        setMessage("")
        setNameError("")
        setMailError("")
        setPhoneError("")
        setMessageError("")
    }

    const onSubmitHandler=(e)=>{
        setSubmit(1)

        if(name!==""&&mail!==""&&phone!==""&&message!==""&&EmailValidator(mail)===true){
            enquiryApi(JSON.parse(serviceId),name,mail,phone,message)

        }
        else{
            if(name===""){
                setNameError("Please enter name")
            }
            if(phone===""){
                setPhoneError("Please enter phone number")
            }
            if(message===""){
                setMessageError("Please enter message")
            }
            if(mail===""){
                setMailError("Please enter mail")
            }
            if(EmailValidator(mail)===false){
                setMailError("Please enter valid mail")

            }
        }
    }

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgb(64, 64, 64,55%)'
          },
        content : {
          top                   : '15%',
          left                  : '30%',
          right                 : '30%',
          bottom                : '8%',
        //   overflow:"auto",
          backgroundColor: 'white',
          zIndex:9999

        //   marginRight           : '-50%',
        //   transform             : 'translate(-13%, -13%)'
        }
      };

    return(
        <Modal
                isOpen={showModal}
              //   onAfterOpen={afterOpenModal}
                onRequestClose={e=>closeModal(e)}
                style={customStyles}
                contentLabel="Example Modal"
              >
            <div className="overall-enquiry">
                <div className="enquiry-container">
                    <div className="header-enquiry">
                        <h3>Enquire now</h3>
                        <p>iPhone Service</p>
                    </div>
                    <div className="close-enquiry">
                        <button onClick={e=>closeModal()}>X</button>
                    </div>

                </div>
                <div className="input-enquiry">
                {submit===1 &&nameError!=="" && <span style={{color:"red",paddingLeft:"10px"}}>{nameError}</span>}

                    <input placeholder="Enter your name" value={name} onChange={e=>{setName(e.target.value);e.target.value!==""&&setNameError("")}}/>

                    {submit===1 && mailError!=="" && <span style={{color:"red",paddingLeft:"10px"}}>{mailError}</span>}

                    <input placeholder="Enter your email" value={mail} onChange={e=>{setMail(e.target.value);e.target.value!==""&&EmailValidator(e.target.value) &&setMailError("")}}/>

                    {submit===1 && phoneError!=="" && <span style={{color:"red",paddingLeft:"10px"}}>{phoneError}</span>}

                    <input placeholder="Enter your Phone Number" type="number" value={phone} onChange={e=>{setPhone(e.target.value);e.target.value!==""&& setPhoneError("") }}/>

                    {submit===1 && messageError!=="" &&<span style={{color:"red",paddingLeft:"10px"}}>{messageError}</span>}

                    <textarea placeholder="Enter your message" value={message} onChange={e=>{setMessage(e.target.value);e.target.value!==""&& setMessageError("")}}/>
                    
                </div>
                <div className={`button-enquiry-submit`}>
                    <button className={`${currentColor}`} type="button" onClick={e=>onSubmitHandler(e)}> Submit</button>

                </div>

            </div>
                  





              </Modal>

    )


} 

export default EnquiryPopUp