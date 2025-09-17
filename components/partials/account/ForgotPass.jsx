import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { Form, Input } from 'antd';
import { useState,useEffect } from 'react';
import {forgotApi} from '../../../api/auth/forgotPassword'
import  Router  from "next/router";
import Link from 'next/link';


function ForgotPassword(){
    const [mail,setMail]=useState("")
    const [forgotSuccess,setForgotSuccess]=useState(false)

   
    const validateMessages = {
        required: '${name} id is required!',
        types: {
          email: 'Invalid Email Id'
        },
      };

    const handleSubmit=()=>{    
       
        forgotApi(mail,setForgotSuccess)

    }

    return(
      <div className='forgot-wrapper'>
          {forgotSuccess?<h4 
           style={{display: "flex",
           justifyContent: "center",
           alignItems: "center",
           height: "300px"}}
          >Reset Password link has been sent to your email inbox.</h4>:(
                <div className="ps-order-tracking">
                <div className="container">
                    
                    <div className="ps-section__content">
                    <Form className="ps-form--account"

                    
                                validateMessages={validateMessages}
                                onFinish={handleSubmit}
                                >
                                    <h3>Forgot Password</h3>
                        <p>Enter your Registered email ID below. We will sent the link to reset your password</p>
                            {/* <div className="form-group">
                                <label>Order ID</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Found in your order confimation email"
                                />
                            </div> */}
                            <div className="form-group">
                                            <Form.Item
                                                name="Email"
                                                rules={[
                                                    {
                                                        required: true,
                                                        type:"email",
                                                    
                                                        // message:
                                                        // 'Email Id is required'
                                                     
                                                    
                                                       
                                                        
                                                    },
                                                ]}>
                                                <Input
                                                    className="form-control"
                                                    type="email"    
                                                    placeholder="Email address"
                                                    value={mail}
                                                    onChange={e=>setMail(e.target.value)}
                                                />
                                            </Form.Item>
                                        </div>
                            {/* <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" placeholder="" />
                            </div> */}
                            <div className="form-group submit">
                                <button className="ps-btn ps-btn--fullwidth"  type="submit">Submit</button>
                            </div>
                            <p className='backlogin'>
                                <Link href="/account/login">
                                <a >Go Back To Login</a>
                                </Link>
                                </p>
                        </Form>
                    </div>
                </div>
            </div>

          )

          }
      
    </div>
    )
}

export default ForgotPassword;
