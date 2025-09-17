import React, { Component, useEffect } from "react";
//import {ConnectPlugin} from '../../../connectPlugins';
import { connect, useSelector } from "react-redux";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { Radio, Space } from "antd";
// import {Space} from '@ant-design/icons'
import Select from "react-select";
import Head from 'next/head'
import { useTranslation } from '../../../../i18n'
import { getPincodeApiForAddress } from "../../../../api/account/getPincodeData";
function FormAddressAddEdit({
  fname,
  setFname,
  address,
  setAddress,
  address1,
  setAddress1,
  city,
  setCity,
  mobile,
  setMobile,
  mobileAlter,
  setMobileAlter,
  postCode,
  setPostCode,
  countryData,
  zoneData,
  zoneId,
  setZoneId,
  zoneName,
  setZoneName,
  setStateCode,
  zoneComp,
  setZoneComp,
  countryId,
  setCountryId,
  countryName,
  setCountryName,
  addressType,
  setAddressType,
  fnameError,
  cityError,
  mobileError,
  mobileErrorAlter,
  countryError,
  zoneError,
  addressError,
  postalError,
  addressError1,
  submit,
  apiCallAdd,
  type,
  stateCode,
  disterror,
}) {
  const [defNation, setDefaultNation] = useState("");
  const [getState, setState] = useState("")
  const [address2, setaddress2] =useState("")
  const { t } = useTranslation('common');
  useEffect(() => {
    if (type === "edit") {
      let defaultNationTemp = "";
      if (countryData && countryData.length !== 0) {
        defaultNationTemp =
          countryData &&
          countryData.find((data) => data.countryId === countryId);
       
        setDefaultNation(defaultNationTemp?.name);
        setCountryName(defaultNationTemp?.name);
      }
    }
    pincodeFocusOut(postCode)
  }, [countryData]);

  let arrayComp = [];

  if (countryData.length>0) {
    var len = countryData.length;
    for (var i = 0; i < len; i++) {
      arrayComp.push({
        value: countryData[i].countryId,
        label: countryData[i].name,
      });
    }
  }

  useEffect(() => {
    
  }, [zoneData]);

  // let sumComp = [];

  // if (zoneData !== []) {
  //   var len = zoneData.length;
  //   for (var i = 0; i < len; i++) {
  //     sumComp.push({
  //       value: zoneData[i].zoneId,
  //       label: zoneData[i].name,
  //     });
  //   }
  // }


// useEffect(()=>{
//   setZoneName([])
//   setZoneComp([])
// },[ setZoneName])

// useEffect(()=>{
//   setZoneName([])
// }, [setZoneId])


//   const zoneCreate = (e)=> {
//     setZoneName([])
//     // setZoneComp([])
//     // let zoneArray = zoneData;
//     // let zoneFilter=[];
//     // let  zoneFilter1=[]
   
// //     let zoneMainArray = [];
// //     if(zoneData.length !== 0 ) {
       
// //         zoneFilter1 =  zoneArray.filter((zone)=>zone.country != null )
       
// //         if(zoneFilter1.length !==0){
// //             zoneFilter =  zoneFilter1.filter((zone)=>zone.country.countryId === countryValueId)
         
    
// //         if(zoneFilter.length!==0) {
// //             var zonelength=zoneFilter.length;
// //             for (var i = 0; i < zonelength; i++) {
// //                 zoneMainArray.push({
// //                     value: zoneFilter[i].zoneId,
// //                     label: zoneFilter[i].name,
// //                 });
// //             }
// //             setZoneComp(zoneMainArray)
// //         } else {
// //             setZoneComp([])
// //         }
// //     }
// //     }
// }


  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: state.isFocused ? "#fff" : "transparent",
      color: "#495057",
      // border: "1px solid",
      borderRadius: "0",
      height: "50px",
      boxShadow: state.isFocused ? 0 : 0,
      backgroundColor: "#f6f6f6",
      border: "none",
      // borderColor: state.isFocused
      // ? "#fcb800"
      // : "#ced4da",
      // '&:hover': { borderColor: 'none' }
    }),
  };

  

const colourStylesError={

control: (styles,state) => ({ ...styles,
    // border: "1px solid",
    borderColor:"red",
    borderRadius: "0",height: "50px",
    boxShadow: state.isFocused ? 0 : 0,
   
    '&:hover': { borderColor: 'none' }
}),
}
  const CancelClick = () => {
    // Router.push("/account/addresses");
    window.history.back()
  };

  const validNameFill = (value) => {
    var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
    var regex = new RegExp(roleExpression);
    var t = value;
    if (!t.match(regex)) {
      setFname(value);
    }
  };
  const validcityFill = (value) => {
    var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
    var regex = new RegExp(roleExpression);
    var t = value;
    if (!t?.match(regex)) {
      setCity(value);
    }
  };

  const validcityMobile = (value) => {
    if(value.length>10){
      return false
    }else{
      setMobile(value);
    }
    
  };

  const validcityMobileAlter = (value) => {
    if(value.length>10){
      return false
    }else{
      setMobileAlter(value);
    }
    
  };

  

  useEffect(()=>{
    setZoneName(getState?.state_name)
    setStateCode(getState?.state_code)
    //validcityFill(getState?.taluka_name)
  },[])

  const pincodeFocusOut = async (pincode) => {

    if(pincode.length==6){
   await getPincodeApiForAddress(pincode, setZoneName, setAddress1, setStateCode)
    }
  }

  return (
    // {zoneData.length >0?
    <>
      <div className="aa-subcontainer">
      <Head>
                <title> Add Address</title>
            </Head>
     
      
        <div className="aa-form-container">
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Name')}<sup>*</sup></p>
              <input
                placeholder={t('account.Name')}
                value={fname}
                onChange={(e) => validNameFill(e.target.value)}
                style={{border: submit === 1 && fnameError !== ""  && "1px solid red"}}
              />
              {submit === 1 && fnameError !== "" && (
                <span className="error-span">{fnameError}</span>
              )}
            </div>
          </div>

          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Pincode')}<sup>*</sup></p>
              <input
                placeholder={t('account.Pincode')}
                value={postCode}
                onChange={(e) =>
                  e.target.value.length <= 6 && setPostCode(e.target.value)
                  
                }
                onBlur={e => pincodeFocusOut(e.target.value)}
                style={{border: submit === 1 && postalError !== ""  && "1px solid red"}}
                type="number"
              />
              {submit === 1 && postalError !== "" && (
                <span className="error-span">{postalError}</span>
              )}
            </div>
          </div>

          <div className="aa-input-main" style={{display: "none"}}>
            <div className="aa-input-container">
              <p>{t('account.Country')}<sup>*</sup></p>
              <Select
                placeholder="Country *"
                onChange={(e) => {
                  setCountryId(e.value);
                  setDefaultNation(e.label);
                  setCountryName(e.label);
                  zoneCreate(e.value);
                }}
                isSearchable={true}
                options={arrayComp}
                // styles={colourStyles}
                styles={submit === 1 && countryError !== "" ?colourStylesError:colourStyles}
                value={{ value: countryId, label: defNation }}
              />
              {submit === 1 && countryError !== "" && (
                <span className="error-span">{countryError}</span>
              )}
            </div>
          </div>

          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.Address')}<sup>*</sup></p>
              <input
                placeholder={t('account.Address')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{border: submit === 1 && addressError !== ""  && "1px solid red"}}
              />
              {submit === 1 && addressError !== "" && (
                <span className="error-span">{addressError}</span>
              )}
            </div>
          </div>

          

          <div className="aa-input-main">
            <div className="aa-input-container">
            
              <p>{t('account.State')} <sup>*</sup></p>
              <input onChange={(e) => {setZoneName(e.target.value),setStateCode(e.target.value)} } placeholder="State" value={zoneName} name={zoneName} readOnly = {true}  style={{border: submit === 1 && zoneError !== ""  && "1px solid red"}} />
                 {/* <select className="form-control" onChange={(e) => {setZoneName(e.target.value), setStateCode(e.target.value)}} name={zoneName} value={getState?.state_code}>
                 
                    <option value="">---Select---</option>
                    {zoneData?.map(da => {
                      return (<option value={da?.code}>{da?.name}</option>)
                    })}
                  </select> */}
              {submit === 1 && zoneError !== "" && (
                <span className="error-span">{zoneError}</span>
              )}
            </div>
          </div>

          
          
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('account.District')}<sup>*</sup> </p>
              <input
                placeholder={t('account.District')}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                readOnly = {true}
                style={{border: submit === 1 && disterror !== ""  && "1px solid red"}}
                
              />
               {submit === 1 && disterror !== "" && (
                <span className="error-span">{disterror}</span>
              )}
            
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>{t('registerdetail.city')}/Area<sup>*</sup></p>
              <input
                placeholder='City/Area'
                value={city}
                onChange={(e) => validcityFill(e.target.value)}
                style={{border: submit === 1 && cityError !== ""  && "1px solid red"}}
              />
              {submit === 1 && cityError !== "" && (
                <span className="error-span">{cityError}</span>
              )}
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>Mobile Number<sup>*</sup></p>
              <input
                type="number"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => validcityMobile(e.target.value)}
                onKeyDown={(evt)=>["e", "E", ".", "-", "+"].includes(evt.key) && evt.preventDefault()}
                style={{border: submit === 1 && mobileError !== ""  && "1px solid red"}}
              />
              {submit === 1 && mobileError !== "" && (
                <span className="error-span">{mobileError}</span>
              )}
            </div>
          </div>
          <div className="aa-input-main">
            <div className="aa-input-container">
              <p>Alternate Mobile Number</p>
              <input
                type="number"
                placeholder="Alternate Mobile Number"
                value={mobileAlter}
                onChange={(e) => validcityMobileAlter(e.target.value)}
                onKeyDown={(evt)=>["e", "E", ".", "-", "+"].includes(evt.key) && evt.preventDefault()}
                style={{border: submit === 1 && mobileErrorAlter !== ""  && "1px solid red"}}
              />
              {submit === 1 && mobileErrorAlter !== "" && (
                <span className="error-span">{mobileErrorAlter}</span>
              )}
            </div>
          </div>
          <div className="aa-address-type">
            <label style={{ width: "100%" }}>{t('account.AddressType')}</label>
            <Radio.Group
              name=""
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
            >
              {/* <space direction="vertical"> */}
              <Radio value={1}>{t('Shared.Home')}</Radio>
              <Radio value={2}>{t('account.Work')}</Radio>
              {/* </space> */}
            </Radio.Group>
          </div>

         

          <div className="aa-input-button">
            <button
              className="aa-input-save-button"
              onClick={(e) => apiCallAdd()}
            >
              {t('account.SaveAddress')}
            </button>
            <button
              className="aa-input-cancel-button"
              onClick={(e) => CancelClick()}
            >
              {t('account.Cancel')}
            </button>
          </div>
        </div>
      </div> 
    </>
  );
}
export default FormAddressAddEdit;
