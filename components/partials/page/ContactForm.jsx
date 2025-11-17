// import React from 'react';
// //import {ConnectPlugin}   from "../../connectPlugins";
// import { useState } from 'react';
// import { contactApi } from '../../../api';
// import { EmailValidator } from '../../helper/emailValidator';
// import { useSelector } from 'react-redux';

// const ContactForm = () => {
//     const [name,setName]=useState("")
//     const [nameError,setNameError]=useState("")
//     const [mail,setMail]=useState("")
//     const [mailError,setMailError]=useState("")
//     const [phone,setPhone]=useState("")
//     const [phoneError,setPhoneError]=useState("")
//     const [message,setMessage]=useState("")
//     const [messageError,setMessageError]=useState("")
//     const [submit,setSubmit]=useState(0)
//     let currentColor=useSelector(s=>s.palette.currentColor)

//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         setSubmit(1)
//         if(name!==""&&mail!==""&&phone!==""&&message!==""&&message.length>=6&&mailError===""){

//                 contactApi(name,mail,phone,message)
//         }
//         else{
//             if(name===""){
//                 setNameError("* Name is required")
//             }
//             if(mail===""){
//                 setMailError("* Mail is required")
//             }
//             if(phone===""){
//                 setPhoneError("* Phone number is required")
//             }
//             if(message===""){
//                 setMessageError("* Message is required")
//             }
//         }
//     }

//     const emailCheck=(value)=>{

//         if(EmailValidator(value)){
//             setMail(value)
//             setMailError("")

//         }
//         else{
//             setMail(value)
//             setMailError("*Please enter a valid email")
//         }
//     }

//     const messageValid=(value)=>{
//         setMessage(value)
//         if(value.length>=6){
//             setMessageError("")
//         }
//         else{
//             setMessageError("Minimum 6 characters is required")
//         }
//     }

//     return(
//         <div className="ps-contact-form">

//     <div className="container">
//         <form className="ps-form--contact-us" action="/" method="get">
//             <h3>CONTACT US</h3>
//             <div className="row">
//                 <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
//                     <div className="form-group">
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder="Name *"
//                             value={name}
//                             onChange={e=>setName(e.target.value)}
//                         />
//                         {submit===1&&name===""&&<div className="error-div">{nameError}</div>}
//                     </div>
//                 </div>
//                 <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
//                     <div className="form-group">
//                         <input
//                             className="form-control"
//                             type="mail"
//                             placeholder="Email *"
//                             value={mail}
//                             onChange={e=>emailCheck(e.target.value)}
//                         />
//                     {submit===1&&mailError!==""&&<div className="error-div">{mailError}</div>}

//                     </div>

//                 </div>
//                 <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
//                     <div className="form-group">
//                         <input
//                             className="form-control"
//                             type="number"
//                             placeholder="Phone *"
//                             value={phone}
//                             onChange={e=>setPhone(e.target.value)}
//                         />
//                        {submit===1&&phone===""&&<div className="error-div">{phoneError}</div>}

//                     </div>
//                 </div>
//                 {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
//                     <div className="form-group">
//                         <input
//                             className="form-control"
//                             type="text"
//                             placeholder="Subject *"
//                         />
//                     </div>
//                 </div> */}
//                 <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
//                     <div className="form-group">
//                         <textarea
//                             className="form-control"
//                             rows="5"
//                             placeholder="Message (minimum 6 characters required) *"
//                             value={message}
//                             onChange={e=>messageValid(e.target.value)}
//                             ></textarea>
//                        {submit===1&&messageError!==""&&<div className="error-div">{messageError}</div>}

//                     </div>
//                 </div>
//             </div>
//             <div className="form-group submit">
//                 <button className={`ps-btn ${currentColor}`} onClick={e=>handleSubmit(e)}>Send message</button>
//             </div>
//         </form>
//     </div>
//    </div>

//     )

// }

// export default ContactForm;

import React, { useState } from "react";
import { contactApi } from "../../../api";
import { EmailValidator } from "../../helper/emailValidator";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./ContactForm.module.scss";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [mail, setMail] = useState("");
  const [mailError, setMailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [submit, setSubmit] = useState(0);

  const currentColor = useSelector((s) => s.palette.currentColor);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setSubmit(1);

  //     let isValid = true;

  //     if (name === "") {
  //       setNameError("* Name is required");
  //       isValid = false;
  //     }

  //     if (mail === "") {
  //       setMailError("* Mail is required");
  //       isValid = false;
  //     }

  //     if (phone === "") {
  //       setPhoneError("* Phone number is required");
  //       isValid = false;
  //     }

  //     if (message === "" || message.length < 6) {
  //       setMessageError("Minimum 6 characters is required");
  //       isValid = false;
  //     }

  //     if (mailError !== "") isValid = false;

  //     if (isValid) {
  //       contactApi(name, mail, phone, message);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(1);

    let isValid = true;

    if (name === "") {
      setNameError("* Name is required");
      isValid = false;
    }

    if (mail === "") {
      setMailError("* Mail is required");
      isValid = false;
    }

    if (phone === "") {
      setPhoneError("* Phone number is required");
      isValid = false;
    }

    if (message === "" || message.length < 6) {
      setMessageError("Minimum 6 characters is required");
      isValid = false;
    }

    if (mailError !== "") isValid = false;

    if (isValid) {
      console.log("FORM DATA:", {
        name,
        mail,
        phone,
        message,
      });

      const res = await contactApi(name, mail, phone, message);

      if (res) {
        toast.success("Message sent successfully!");

        // Clear form after submission
        setName("");
        setMail("");
        setPhone("");
        setMessage("");
        setSubmit(0);
      } else {
        toast.error("Something went wrong. Try again!");
      }
    }
  };

  const emailCheck = (value) => {
    setMail(value);

    if (EmailValidator(value)) {
      setMailError("");
    } else {
      setMailError("* Please enter a valid email");
    }
  };

  const messageValid = (value) => {
    setMessage(value);

    if (value.length >= 6) {
      setMessageError("");
    } else {
      setMessageError("Minimum 6 characters is required");
    }
  };

  return (
    // <div className="ps-contact-form">
    //   <div className="container">
    //     <form className="ps-form--contact-us">
    //       <h3>CONTACT US</h3>

    //       <div className="row">
    //         {/* NAME */}
    //         <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
    //           <div className="form-group">
    //             <input
    //               className="form-control"
    //               type="text"
    //               placeholder="Name *"
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //             />
    //             {submit === 1 && nameError && (
    //               <div className="error-div">{nameError}</div>
    //             )}
    //           </div>
    //         </div>

    //         {/* EMAIL */}
    //         <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
    //           <div className="form-group">
    //             <input
    //               className="form-control"
    //               type="email"
    //               placeholder="Email *"
    //               value={mail}
    //               onChange={(e) => emailCheck(e.target.value)}
    //             />
    //             {submit === 1 && mailError && (
    //               <div className="error-div">{mailError}</div>
    //             )}
    //           </div>
    //         </div>

    //         {/* PHONE */}
    //         <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
    //           <div className="form-group">
    //             <input
    //               className="form-control"
    //               type="number"
    //               placeholder="Phone *"
    //               value={phone}
    //               onChange={(e) => setPhone(e.target.value)}
    //             />
    //             {submit === 1 && phoneError && (
    //               <div className="error-div">{phoneError}</div>
    //             )}
    //           </div>
    //         </div>

    //         {/* MESSAGE */}
    //         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
    //           <div className="form-group">
    //             <textarea
    //               className="form-control"
    //               rows="5"
    //               placeholder="Message (minimum 6 characters required) *"
    //               value={message}
    //               onChange={(e) => messageValid(e.target.value)}
    //             />
    //             {submit === 1 && messageError && (
    //               <div className="error-div">{messageError}</div>
    //             )}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="form-group submit">
    //         <button className={`ps-btn ${currentColor}`} onClick={handleSubmit}>
    //           Send message
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className={styles.contactWrapper}>
      <div className={styles.container}>
        {/* LEFT SIDE */}
        <div className={styles.leftSection}>
          <h1 className={styles.heading}>Get in Touch</h1>
          <p className={styles.desc}>
            We're here to answer your questions and help you take the next step
            toward clearer vision. Whether you're curious about LASIK or need
            expert advice on eyewear, our team is ready to assist.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Name *</label>
              <input
                type="text"
                // value={firstName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {submit === 1 && nameError && (
                <div className="error-div">{nameError}</div>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Email *</label>
              <input
                type="email"
                // value={email}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              {submit === 1 && mailError && (
                <div className="error-div">{mailError}</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {submit === 1 && phoneError && (
                <div className="error-div">{phoneError}</div>
              )}
            </div>
          </div>

          <div className={styles.inputGroupFull}>
            <label>Message</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {submit === 1 && messageError && (
              <div className="error-div">{messageError}</div>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
