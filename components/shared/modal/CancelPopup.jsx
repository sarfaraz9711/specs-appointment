import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useState } from 'react';
import { CancelRequestApi } from '../../../api';

function CancelPopup({activate,setCancel,cancelReason,cancelId,setReload}){
    const [selectValue,setSelectValue]=useState("")
    const [desc,setDesc]=useState("")
    const [descError,setDescError]=useState("")
    const [selectError,setSelectError]=useState("")
    const [submit,setSubmit]=useState(0)
    let active=activate
// class SubscribePopup extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isSubscribeShow: true,
    //     };
    // }

    const handleCloseSubscribePopup=(e)=> {
        e.preventDefault();
        // setIsSubscribeShow(false)
        setCancel(false)
        setDesc("")
        setSelectError("")
        setSelectValue("")
        setDescError("")
        setSubmit(0)
        // this.setState({ isSubscribeShow: false });
    }

    const handleCancelSubmit=(e)=>{
        e.preventDefault();
        setSubmit(1)
        if(selectValue!==""&&desc!==""){
            CancelRequestApi(cancelId,desc,selectValue,setCancel,setDesc,setSelectError,setDescError,setSubmit,setSelectValue,setReload)
        }
        else{
            if(desc===""){
                setDescError("*Description is required")
            }
            if(selectValue===""){
                setSelectError("*Reason is required")
            }
        }

    }

    // render() {
    //     const { isSubscribeShow } = this.state;
    //     const { active } = this.props;

        // if (isSubscribeShow) {
            return (
                <div
                    className={`ps-popup ${active ? 'active' : ''}`}
                    id="subscribe">
                      
                    <div
                        className="ps-popup__content bg--cover"
                        style={{
                            backgroundImage:
                                "url('/static/img/bg/subscribe.jpg')",
                        }}>
                        <a
                            className="ps-popup__close"
                            href="#"
                            onClick={e => handleCloseSubscribePopup(e)}>
                            <i className="icon-cross"></i>
                        </a>
                        <form
                            className="ps-form--subscribe-popup" 
                            action="/"
                            method="get">
                            <div className="ps-form__content">
                                <h4><strong>Cancel order</strong></h4>
                                {/* <h4>
                                    Get <strong>25%</strong> Discount
                                </h4>
                                <p>
                                    Subscribe to the Martfury mailing list{' '}
                                    <br /> to receive updates on new arrivals,
                                    special offers
                                    <br /> and our promotions.
                                </p> */}
                                <div className="heading-reason">
                                <h5>Reason:</h5>
                                </div>
                                <div>
                                <select  className="select-css" onChange={e=>{setSelectValue(e.target.value),setSelectError("")}} value={selectValue}>
                                    <span></span>
    <option value="" selected>Select Reason</option>
    {cancelReason&&cancelReason.map((reason)=>{
        return(
            <option value={reason.id} key={reason.id}>{reason.reason}</option>
        )
    })}
    
  </select>
  {submit===1&&selectError!==""&&<div className="span-error-custom-cancel"><span>{selectError}</span></div>}


                                </div>
                                <div className="heading-reason">
                                <h5>Description:</h5>
                                </div>
  
                                <div className="form-group">
                                    
                                    {/* <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                        required
                                    /> */}
                                    <textarea
                        className="form-control"
                        rows="4"
                        placeholder="" value={desc} onChange={e=>{setDesc(e.target.value),setDescError("")}}></textarea>
                        {submit===1&&descError!==""&&<div className="span-error-custom-cancel"><span>{descError}</span></div>}
                        <br/>
                                    <button className="ps-btn" style={{marginRight:"20px"}} onClick={e=>handleCancelSubmit(e)}>
                                        Submit
                                    </button>
                                    <button className="ps-btn" onClick={e=>handleCloseSubscribePopup(e)}>
                                        Cancel
                                    </button>
                                </div>
                            
                            </div>
                        </form>
                    </div>
                </div>
            );
        // } else {
        //     return '';
        // }
    // }
}

export default CancelPopup;
