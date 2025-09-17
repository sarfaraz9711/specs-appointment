import React, { Component, useEffect } from 'react';
//import {ConnectPlugin} from '../../../connectPlugins';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { notification } from 'antd';
import { useTranslation } from '../../../../i18n'
import { colorThemeShow } from '../../../helper/colorTheme';
import OptionNameDisplay from '../../../shared/headers/modules/optionNamePar';
import Select from 'react-select';
import { countryListApi,getCODAvailableOnPincode,getDeliveryAvailableOnPincode, pinCodeApi ,getStateListApi} from '../../../../api';
import { modalSuccess,modalError } from "../../../../api/intercept";
import { zoneListApi } from '../../../../api/account/zoneList';


function FormCheckoutInformation({ cartItems, amount, productDetail, addressData, currency, fname, setFname, l1name, setL1name, email, setEmail, address, setAddress, city, setCity, postCode, setPostCode, num, setNum, addressCheck, setAddressCheck, countryId, setCountryId, countryData, setCountryData, countryName, setCountryName, countryError, setCountryError, fnameError, setFnameError, numError, setNumError, emailError, setEmailError, addressError, setAddressError, cityError, setCityError, postalError, setPostalError, address1, setAddress1, zoneData, setZoneData, zoneComp, setZoneComp, zoneId, setZoneId, zoneName, setZoneName, zoneError,setMethod, method,setLoaderActive,setPaymentValid }) {
     // const [fname,setFname]=useState("")
    // const [lname,setLname]=useState("")
    // const [email,setEmail]=useState("")
    // const [address,setAddress]=useState("")
    // const [city,setCity]=useState("")
    // const [postCode,setPostCode]=useState("")
    // const [num,setNum]=useState("")
    // const [addressCheck,setAddressCheck]=useState(0)
    // const [countryId,setCountryId]=useState("")
    // const [countryData,setCountryData]=useState([])
    // const [countryName,setCountryName] = useState("")
    // const [countryError,setCountryError]=useState("")

    const [getStateDataList, setStateDataList] = useState([])

    useEffect(() => {
        zoneListApi(setZoneData);
    }, [])
    const setDistrict = (e) => {
        const stateValue = e.target.value
        setZoneName(stateValue)
    }


    const _deliveryChecks = async (pincodeVal) => {
        console.log("checking this site",pincodeVal);
            let _r = await getDeliveryAvailableOnPincode(postCode,setMethod,method,'delhivery');
            if(_r == 1){
                 setLoaderActive(false)
            }else if(_r == 2){
             let _rd = await getDeliveryAvailableOnPincode(postCode,setMethod,method,'ecom');
                 if(_rd == 1){
                     setLoaderActive(false)
                 }else if(_rd == 2){
                     modalError('error',"Delivery not available on this pincode.");
                     setMethod("")
                     setPaymentValid("")
                     setLoaderActive(false)
                 }else{
                     modalError('error',"Delivery not available on this pincode.");
                     setMethod("")
                     setPaymentValid("")
                     setLoaderActive(false)
                 }
            }else{
                 modalError('error',"Delivery not available on this pincode.");
                 setMethod("")
                 setPaymentValid("")
                 setLoaderActive(false)
            }     
    }






   
    let arrayComp=[]
   
        if(countryData.length>0){
            var len = countryData.length;
            for (var i = 0; i < len; i++) {
                arrayComp.push({
                    value: countryData[i].countryId,
                    label: countryData[i].name,
                });
            }
        }

        const zoneCreate = (countryValueId)=> {
            setZoneName([])
            let zoneArray = zoneData;
            let zoneFilter=[];
            let  zoneFilter1=[]
          
            let zoneMainArray = [];
            if(zoneData.length !== 0 ) {
               
                zoneFilter1 =  zoneArray.filter((zone)=>zone.country != null )
               
                if(zoneFilter1.length !==0){
                    zoneFilter =  zoneFilter1.filter((zone)=>zone.country.countryId === countryValueId)
                  
            
                if(zoneFilter.length!==0) {
                    var zonelength=zoneFilter.length;
                    for (var i = 0; i < zonelength; i++) {
                        zoneMainArray.push({
                            value: zoneFilter[i].zoneId,
                            label: zoneFilter[i].name,
                        });
                    }
                    setZoneComp(zoneMainArray)
                } else {
                    setZoneComp([])
                }
            }
            }
        }
    
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)


 

    useEffect(()=>{
        apiCallFunc()
    },[])



// class FormCheckoutInformation extends Component {
//     constructor(props) {
//         super(props);
//     }

    const addressSelect=(address)=>{
        setAddressCheck(1)
        
        setAddress(address.address1+","+address.address2)
        setCity(address.city)
        setPostCode(address.postcode)
    }
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

const colourStylesError={

    control: (styles,state) => ({ ...styles,
        // border: "1px solid",
        borderColor:"red",
        borderRadius: "0",height: "50px",
        boxShadow: state.isFocused ? 0 : 0,
       
        '&:hover': { borderColor: 'none' }
    }),
}


    const modalWarning = (type) => {
        notification[type]({
            message: 'Address is required',
            description: 'Enter the address for shipping purpose',
            duration: 3,
        });
    };

    function onSearch(val) {
       
      }
    
        const validNameFill = (value) => {
        var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
        var regex = new RegExp(roleExpression);
        var t = value;
        if (!t.match(regex)) {
          setFname(value);
        }
      };


    // render() {
    //     const { amount, cartItems, cartTotal } = this.props;
    return (
        <Form
            className="ps-form--checkout"
            initialValues={{ ["fname"]: "ddaniel" }}
        // fields={fields}
        >
           
            <div className="ps-form__content">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="ps-form__billing-info">
                            {/* <h3 className="ps-form__heading">
                                    {t("contact-info")}
                                </h3>
                                <div className="row">
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="text" placeholder="First name *" className="form-control" value={fname} onChange={e=>setFname(e.target.value)}/>
                                    {fnameError!==""?<span className="error-span">{fnameError}</span>:""}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="text" placeholder="Last name" className="form-control" value={l1name} onChange={e=>setL1name(e.target.value)}/>
                                  </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="text" placeholder="Email *" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/>
                                    {emailError!==""?<span className="error-span">{emailError}</span>:""}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="number" placeholder="Phone number *" className="form-control" value={num} onChange={e=>e.target.value.length <= 15 && setNum(e.target.value)}/>
                                    {numError!==""?<span className="error-span">{numError}</span>:""}
                                  </div>
                                </div>
                                </div> */}

                            <h3 className="ps-form__heading">
                               {t('account.ShippingAddress')}
                            </h3>
                            {addressData && addressData.length === 0 ? <div>
                                <div className={"form-group"}>
                                    <input type="text" placeholder="Name *" maxLength="30" className="form-control" value={fname} onChange={e => validNameFill(e.target.value)} style={{ borderColor: fnameError && "red" }} />
                                    {fnameError !== "" ? <span className="error-span">{fnameError}</span> : ""}
                                </div>
                                <div className={"form-group"}>
                                    <input type="text" placeholder="Address (street,apartment,suite,unit,etc) *" className="form-control" onChange={e => setAddress(e.target.value)} value={address} style={{ borderColor: addressError && "red" }} />
                                    {addressError !== "" ? <span className="error-span">{addressError}</span> : ""}
                                </div>
                                <div className={"form-group"}>
                                    <input type="text" placeholder="Apartment,suite, etc.(optional)" className="form-control" onChange={e => setAddress1(e.target.value)} value={address1}  />
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 d-none">
                                        <div className="form-group">
                                            <Select
                                              placeholder="Country *"
                                              onChange={e=>{setCountryId(e.value);setCountryName(e.label);zoneCreate(e.value);}}
                                              isSearchable={true}
                                              options={arrayComp}
                                            styles={countryError!==""?colourStylesError:colourStyles}
                                              />
                           {countryError!==""?<span className="error-span">{countryError}</span>:""}
                           
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className={"form-group"}>
                                        <select className="select-data form-control"
                                                onChange={(e) => setDistrict(e)}
                                                value={zoneName} name="state">
                                                <option value="">--Select state--</option>
                                                {zoneData.length > 0 && zoneData?.map(st => {
                                                    return (<option style={{ borderColor: zoneError && "red" }} value={st?.code}>{st?.name}</option>)
                                                })}
                                            </select>
                                        {/* {zoneComp && zoneComp.length!==0 ? <Select
                                            placeholder="Select state"
                                            onChange={e=>{setZoneId(e.value);setZoneName(e.label);
                                                
                                            }}
                                            onSearch={onSearch}
                                            isSearchable={true}
                                            showSearch
                                            options={zoneComp}
                                            value={{ label: zoneName }}
                                            styles={zoneError!==""?colourStylesError:colourStyles}
                                        />:<input type="text" placeholder="State/Province *" className="form-control"
                                         value={zoneName} onChange={e=>setZoneName(e.target.value)}style={{ borderColor: zoneError && "red" }}
                                         />} */}
                                        {zoneError!==""?<span className="error-span">{zoneError}</span>:""}
                                   
                                  </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className={"form-group"}>
                                            <input type="text" placeholder="City *" className="form-control" onChange={e => setCity(e.target.value)} value={city} style={{ borderColor: cityError && "red" }} />
                                            {cityError !== "" ? <span className="error-span">{cityError}</span> : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className={"form-group"}>
                                            <input type="number" placeholder="Zip/Postal code *" className="form-control" value={postCode} onChange={e => (JSON.stringify(e.target.value).length < 9 && setPostCode(e.target.value))} onBlur={em=>(_deliveryChecks(em.target.value))} style={{ borderColor: postalError && "red" }} />
                                            {postalError !== "" ? <span className="error-span">{postalError}</span> : ""}
                                        </div>
                                    </div>

                                </div>

                            </div> :
                                <div>
                                    {addressData && addressData.map((address, index) => {
                                        return (
                                            <div className="address-container" key={index}>
                                                <input type="radio" id={address.addressId} name="drone" onClick={e => addressSelect(address)} value={address} className="addr-input" />
                                                <label for={address.addressId} className="address-custom-label">{address.addressType === 0 ? "Home" : "Work"}</label>
                                                <p className="address-paragraph">{address && address.address1},{address.address2},{address.city},{address.state + ":" + address.postcode}</p>
                                            </div>

                                        )
                                    })}

                                    {/* <div className="address-container">
                                       <input type="radio" id="louie" name="drone" value="louie" className="addr-input"/>
                                       <label for="louie">Louie</label>
                                    </div> */}
                                </div>}
                            {/* <div className="ps-form__submit">
                                    <Link href="/account/shopping-cart">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            {t('continue-to-shopcart')}
                                        </a>
                                    </Link>
                                    <div className="ps-block__footer">
                                        <button className={`ps-btn ${currentColor}`} onClick={e=>handleLoginSubmit()}>
                                            Place Order
                                        </button>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                    {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <h3>{t('your-order')}</h3>
                                <div className="ps-block--checkout-order">
                                    <div className="ps-block__content">
                                        <figure>
                                            <figcaption>
                                                <strong>{t('product')}</strong>
                                                <strong>{t('total')}</strong>
                                            </figcaption>
                                        </figure>
                                        <figure className="ps-block__items">
                                            {cartItems &&
                                            cartItems.map(product => (
                                                <Link
                                                    href="/"
                                                    key={product.productSlug}>
                                                    <a>
                                                        <strong style={{width:"60%"}}>
                                                            {product.name}
                                                            <span>
                                                                    x
                                                                {
                                                                    product.quantity
                                                                }
                                                                </span>
                                                                <OptionNameDisplay optionName={JSON.parse(product&&product.optionName)}/>
                                                        </strong>
                                                        <small>
                                                        {'$ '}
                                                            {product.quantity *
                                                            product.initialPrice}
                                                        </small>
                                                        
                                                    </a>
                                                </Link>
                                                
                                            ))}
                                        </figure>
                                        <figure>
                                            <figcaption>
                                                <strong>{t('subtotal')}</strong>
                                                <small>{'$ '}{amount}</small>
                                            </figcaption>
                                        </figure>
    
                                    </div>
                                </div>
                            </div>
                        </div> */}
                </div>
            </div>
        </Form>
    );

}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(FormCheckoutInformation);
