import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import  Router  from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import { message, Radio,Space } from 'antd';
import FormAddressAddEdit from './modules/FormAddress';
import {countryListApi, editAddressApi, UserAddAddress,} from '../../../api';
import {zoneListApi} from '../../../api/account/zoneList';
import { useTranslation } from '../../../i18n'
import { modalError, modalWarning } from '../../../api/intercept';
function CustomAddAddress({type,addressId}){
    const [fname,setFname]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState("")
    const [address1,setAddress1]=useState("")
    const [city,setCity]=useState("")
    const [mobile,setMobile]=useState("")
    const [mobileAlter,setMobileAlter]=useState("")
    const [postCode,setPostCode]=useState("")
    const [num,setNum]=useState("")
    let currentColor=useSelector(s=>s.palette.currentColor)
    const [countryId,setCountryId]=useState(99)
    const [countryData,setCountryData]=useState([])
    const [countryName,setCountryName] = useState("")
    const [fnameError,setFnameError] =useState("")
    const [numError,setNumError]=useState("")
    const [emailError,setEmailError] = useState("")
    const [addressError,setAddressError] =useState("")
    const [addressError1,setAddressError1] =useState("")
    const [cityError,setCityError] =useState("")
    const [mobileError,setMobileError] =useState("")
    const [mobileErrorAlter,setMobileErrorAlter] =useState("")
    const [postalError,setPostalError]=useState("")
    const [countryError,setCountryError]=useState("")
    const [zoneData,setZoneData]=useState([])
 
    const [zoneId,setZoneId]=useState("")
    const [zoneName,setZoneName]=useState("")
    const [stateCode, setStateCode] = useState("");
    const [zoneError,setZoneError]=useState("")
    const [addressType,setAddressType]=useState(1)
    const [submit,setSubmit]=useState(0)
    const [zoneComp,setZoneComp]=useState([])
    const { t } = useTranslation('common');
    const editAddress =useSelector(s=>s.setting).editDetail;
    const [disterror, setDistError] = useState("")


    const apiCallFunc=()=>{
        countryListApi(setCountryData)
      const zoneAA =   zoneListApi(setZoneData)
       

    }

    
    

    useEffect(()=>{
        apiCallFunc()
        if(type==="edit") {
            if(editAddress && editAddress.address1) {
                console.log("editAddress",editAddress);
                setFname(editAddress.company)
                setAddress(editAddress.address1)
                setAddress1(editAddress.address2)
                setCity(editAddress.city)
                setMobile(editAddress.phoneNo)
                setMobileAlter(editAddress.phoneNoAlter)
                setCountryId(editAddress.countryId)
                setPostCode(editAddress.postcode)
                setZoneName(editAddress.state)
                setStateCode(editAddress.stateCode)
                setAddressType(editAddress.addressType)
            }
        } else {
            setFname("")
            setAddress("")
            setAddress1("")
            setCity("")
            setMobile("")
            setMobileAlter("")
            setCountryId(99)
            setPostCode("")
            setZoneName("")
            setStateCode("")
            setAddressType(1)
            setCountryName("")
        }
        
    },[])

   
    useEffect(()=>{
        validate()
    },[fname,address,countryId,zoneName,stateCode,postCode,city,mobile,address1])
    const validate = () => {
        var mobileReg = new RegExp("^[6,7,8,9]{1}[0-9]{9}$")
        var regex = new RegExp('^(([a-zA-Z0-9][a-zA-Z0-9 ]*)([,-@/#:().+!%][a-zA-Z0-9][a-zA-Z0-9 ]*)*)$');
        let validateObj = {fnameSub:true,addressSub:true,citySub:true,mobilesub:true,mobile:true,countryNameSub:true,postCodeSub:true,zoneNameSub:true, DistNamesub:true}
        if(fname === ""){
            setFnameError("Name is required")
            validateObj.fnameSub = false;
        }else if(fname.length> 50){
            setFnameError("only 50 character allowed")
            validateObj.fnameSub = false;
        }else if(!fname?.match(regex)){
            setFnameError("invalid name format")
            validateObj.fnameSub = false;
        }
         else {
            setFnameError("")
            validateObj.fnameSub = true;
        }
        var mobileReg = new RegExp("^[6,7,8,9]{1}[0-9]{9}$")
        var regex = new RegExp(/[a-zA-Z0-9-,/-_(.) ]$/);
        if(address===""){
            setAddressError("Address is required") 
            validateObj.addressSub = false;
        }else if(address.length< 10){
            setAddressError("Min 10 character required")
            validateObj.fnameSub = false;
        }else if(!address?.match(regex)){
            setAddressError("invalid address format")
            validateObj.fnameSub = false;
        }else if(address.length> 250){
            setAddressError("Max 250 character allowed")
            validateObj.fnameSub = false;
        }
        else {
            setAddressError("")
            validateObj.addressSub = true;
        }

       
        if(city === "") {
            setCityError("City is required")
            validateObj.citySub = false;
        } else {
            setCityError("")
            validateObj.citySub = true;
        }
       
        if(mobile === "" || mobile.length < 10 || mobile.length > 10) {
            setMobileError("Valid Mobile number is required")
            validateObj.mobilesub = false;
        } else if(!mobile.match(mobileReg)){
            setMobileError("Invalid mobile number format")
            validateObj.mobilesub = false;
        }else{
            setMobileError("")
            validateObj.mobilesub = true;
        }
       
        if(mobileAlter){
        if(mobileAlter.length < 10 || mobileAlter.length > 10) {
            setMobileErrorAlter("Valid Mobile number is required")
            validateObj.mobile = false;
        } else if(!mobile.match(mobileReg)){
            setMobileErrorAlter("Invalid mobile number format")
            validateObj.mobile = false;
        } else{
            setMobileErrorAlter("")
            validateObj.mobile = true;
        }}
        else{
            setMobileErrorAlter("")
            validateObj.mobile = true;
        }

        // if(countryName === "") {
        //     setCountryError("Country is required")
        //     validateObj.countryNameSub = false;
        // } else {
        //     setCountryError("")
        //     validateObj.countryNameSub = true;
        // }

        if(postCode === "" || postCode.length < 6 || postCode.length > 6) {
            setPostalError("Post code is required")
            validateObj.postCodeSub = false;
        } else {
            setPostalError("")
            validateObj.postCodeSub = true;
        }

        if(zoneName === "") {
            setZoneError("State is required")
            validateObj.zoneNameSub = false;
        } else {
            setZoneError("")
            validateObj.zoneNameSub = true;
        }
        if(address1 === "") {
            setDistError("District is required")
            validateObj.DistNamesub = false;
        } else {
            setDistError("")
            validateObj.DistNamesub = true;
        }

        if(validateObj.fnameSub  && validateObj.addressSub && validateObj.postCodeSub  && validateObj.zoneNameSub && validateObj.countryNameSub && validateObj.citySub && validateObj.mobilesub && validateObj.DistNamesub) {
                return true;
        } else {
            return false;
        }
    }

    
        
    
    const apiCallAdd=()=>{
        setSubmit(1);
        if(address.length <= 250 && fname.length <= 50){
        if(validate()) {
            if(type === "add") {
                UserAddAddress(address,address1,city,mobile,mobileAlter,countryId,zoneName,stateCode, postCode,Router,addressType,fname,setFname,setAddress,setAddress1,setCity,setMobile,setMobileAlter,setCountryId,setZoneName,setStateCode, setPostCode,setAddressType)
            } else {
                editAddressApi(addressId,address,address1,city,mobile,mobileAlter,countryId,zoneName,stateCode,postCode,Router,addressType,fname,setFname,setAddress,setAddress1,setCity,setMobile,setMobileAlter,setCountryId,setStateCode,setZoneName,setPostCode,setAddressType)

            }

        }
    }else {
        if(address.length > 250){
            message.error("Address only 250 character allowed")
        }
        if(fname.length > 50){
            message.error("Name only 50 character allowed")
        }
        
    }
    }


    return(
        <section className="cus-account-container">
            
            <div className="cus-account-subcontainer">
              <div className="cus-position-container">
                <AccountNav keyValue={"0"}/>
                <div className="cus-right-position">
                    <div className="aa-container">
                        <h3>{t('account.AddAddress')}</h3>
                        <FormAddressAddEdit fname={fname} setFname={setFname} address={address} setAddress={setAddress} address1={address1} setAddress1={setAddress1}
                        city={city} setCity={setCity} mobile={mobile} setMobile={setMobile} mobileAlter={mobileAlter} setMobileAlter={setMobileAlter} postCode={postCode} setPostCode={setPostCode} zoneData={zoneData} countryData={countryData} zoneId={zoneId} setZoneId={setZoneId} zoneName={zoneName} setZoneName={setZoneName} stateCode={stateCode} setStateCode={setStateCode}
                        zoneComp={zoneComp} setZoneComp={setZoneComp} setCountryId={setCountryId} countryId={countryId} countryName={countryName} setCountryName={setCountryName} addressType={addressType} setAddressType={setAddressType}
                        fnameError={fnameError} cityError={cityError} mobileError={mobileError} mobileErrorAlter={mobileErrorAlter} countryError={countryError} zoneError={zoneError} addressError={addressError} postalError={postalError} submit={submit} addressError1={addressError1} apiCallAdd={apiCallAdd} type={type} disterror={disterror}/>
                    </div>

                </div>
              </div>
            </div>
        </section>
    )
}
export default CustomAddAddress;