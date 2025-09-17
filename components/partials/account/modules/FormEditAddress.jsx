import React, { Component } from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import { useEffect } from 'react';
import { countryListApi } from '../../../../api/account/country';
import { useState } from 'react';
import Select from 'react-select';
import { UserAddAddress } from '../../../../api/account/address';
import  Router  from 'next/router';
import { editAddressApi } from '../../../../api/account/editAddress';
import {notification } from 'antd';


function FormEditAddress({id,type,details}){
    const [countryData,setCountryData]=useState([])
    const [countryId,setCountryId]=useState("")
    const [address1,setAddress1]=useState("")
    const [address2,setAddress2]=useState("")
    const [city,setCity]=useState("")
    const [states,setStates]=useState("")
    const [postCode,setPostCode]=useState("")
    const [addressError,setAddressError]=useState("")
    const [cityError,setCityError]=useState("")
    const [stateError,setStateError]=useState("")
    const [postCodeError,setPostCOdeError]=useState("")
    const [countryIdError,setCountryIdError]=useState("")
    const [addressType,setAddressType]=useState("")
    // const [defaultCountry,setDefaultCountry]=useState("")

    let arrayComp=[]
// class FormEditAddress extends Component {
//     render() {
    if(countryData!==[]){
        var len = countryData.length;
        for (var i = 0; i < len; i++) {
            arrayComp.push({
                value: countryData[i].countryId,
                label: countryData[i].name,
            });
        }
    }
         
    useEffect(()=>{
        if(type==="edit"){
            setAddress1(details.address1)
            setAddress2(details.address2)
            setCity(details.city)
            setStates(details.state)
            setPostCode(details.postcode)
            setCountryId(details.countryId)
            setAddressType(details.addressType)
            // setDefaultCountry(arrayComp.find(x => x.value === details.countryId))

        }

    },[])

    useEffect(()=>{
        apiCallFunc()
        
    },[])

    const modalWarning = (type) => {
        notification[type]({
            message: 'Address type is required',
            description: 'Enter the address type for shipping purpose',
            duration: 3,
        });
    };

    const apiCallFunc=()=>{
        countryListApi(setCountryData)
    }

    const colourStyles = {
        control: (styles,state) => ({ ...styles, backgroundColor: state.isFocused ?'#fff':'transparent', color: "#495057",
        // border: "1px solid",
        borderRadius: "0",height: "50px",
        boxShadow: state.isFocused ? 0 : 0,
        borderColor: state.isFocused
        ? "#fcb800"
        : "#ced4da",
        '&:hover': { borderColor: 'none' }
    }),
}
    
    const handleSubmit=()=>{
    if(type==="edit"){
        if(address1!==""&&city!==""&&countryId!==""&&states!==""&&postCode!==""){
            editAddressApi(id,address1,address2,city,countryId,states,postCode,Router,addressType)
        }
        else{
            if(address1===""){
                setAddressError("*Address is required")
            }
            if(city===""){
                setCityError("*City is required")
            }
            if(states===""){
                setStateError("*State is required")
            }
            if(postCode===""){
                setPostCOdeError("*Postcode is required")
            }
            if(countryId===""){
                setCountryIdError("Country is required")
            }
        }
    }    
    else{
        if(address1!==""&&city!==""&&countryId!==""&&states!==""&&postCode!==""&&addressType!==""){
            UserAddAddress(address1,address2,city,countryId,states,postCode,Router,addressType)
        }
        else{
            if(address1===""){
                setAddressError("*Address is required")
            }
            if(city===""){
                setCityError("*City is required")
            }
            if(states===""){
                setStateError("*State is required")
            }
            if(postCode===""){
                setPostCOdeError("*Postcode is required")
            }
            if(countryId===""){
                setCountryIdError("Country is required")
            }
            if(addressType===""){
                modalWarning('warning');

            }
        }
    }
    }
    

   


        return (
            <form className="ps-form--edit-address">
                
                <div className="ps-form__header">
                    <h3>Billing address</h3>
                </div>
                <div className="ps-form__content">
                    <div className="form-group">
                        <label>
                            Address line 1 <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" value={address1} onChange={e=>setAddress1(e.target.value)}/>
                        {addressError!==""?<span className="error-span">{addressError}</span>:""}
                    </div>
                    <div className="form-group">
                        <label>
                        Address line 2
                        </label>
                        <input type="text" placeholder="optional" className="form-control" value={address2} onChange={e=>setAddress2(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            City<sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" value={city} onChange={e=>setCity(e.target.value)}/>
                        {cityError!==""?<span className="error-span">{cityError}</span>:""}

                    </div>
                    <div className="form-group">
                        <label>
                            Country <sup>*</sup>
                        </label>
                        <Select
        //   className="basic-single"
        //   classNamePrefix="select"
          onChange={e=>setCountryId(e.value)}
        //   defaultValue={{ label: {defaultCountry}, value: {countryId} }}
          //   isClearable={true}
          isSearchable={true}
          defaultValue={countryId}
          
        //   name="color"
          options={arrayComp}
          styles={colourStyles}

        />
                        {countryIdError!==""?<span className="error-span">{countryIdError}</span>:""}
                    </div>
                    
                    <div className={"form-group"}>
                        <label>
                            State <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" value={states} onChange={e=>setStates(e.target.value)}/>
                        {stateError!==""?<span className="error-span">{stateError}</span>:""}
                    </div>
                    <div className="form-group">
                        <label>
                            Postcode <sup>*</sup>
                        </label>
                        <input type="number" placeholder="" className="form-control" value={postCode} onChange={e=>setPostCode(e.target.value)}/>
                        {postCodeError!==""?<span className="error-span">{postCodeError}</span>:""}
                        <div className="" >
                        <input type="radio" id="home" name="drone" value="Home" onClick={e=>setAddressType(0)} className="addr-input" checked={addressType===0?"checked":""}/>
                        <label for="home" className="address-custom-label">Home</label>
                    {/* </div>
                    <div className="" > */}
                        <input type="radio" id="home" name="drone"  onClick={e=>setAddressType(1)} value="Work" className="addr-input" checked={addressType===1?"checked":""}/>
                        <label for="home" className="address-custom-label">Work</label>
                    </div> 
                    </div>
                     
                    <div className="form-group submit">
                        <button className="ps-btn" type="button" onClick={e=>handleSubmit()}>Save Address</button>
                    </div>
                </div>
            </form>
        );
    // }
}

export default FormEditAddress;
