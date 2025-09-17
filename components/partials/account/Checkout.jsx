import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import {GiftOutlined} from '@ant-design/icons';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { useState } from 'react';
import { useEffect } from 'react';
import {verifyCouponData,verifyCouponDataCN} from "../../../api/freeProduct/freeProduct"
import { getProfileData, addressListApiData, ApplyCouponApi, checkOutApi, countryListApi, removeFromCartApi, addToCartApi, paytmCheckout, ingenicoCheckout, getLocationListApi,getCODAvailableOnPincode,getDeliveryAvailableOnPincode, pinCodeApiForDelivery, sendOtpToUser,otpVerificationApi, UserRegister, checkRegistredUser, saveIngenicoRequestPayload,savePaytmRequestPayload, cnStatusUpdate, syncInventoryBySku, checkSkuStatus} from '../../../api';
import {loyalPointApi, loyalPointValidate, loyalPointRedeem, loyalPointReverse, saveLoyaltyPoint, reverseLoyaltyPoint} from "../../../api/account/loyaltyPoint"
import { useTranslation } from '../../../i18n'
import { Collapse, Form, Input } from 'antd';
import { cartRemove, decrementQuantity, incrementQuantity } from '../../helper/cartHelper';
import { addItem, decreaseItemQty, increaseItemQty, removeItem } from '../../../store/cart/action';
import {checkOutLogin } from '../../../store/auth/action';
import { imageUrl } from '../../../api/url';
import { getPaymentApi } from '../../../api';
import { Radio } from 'antd';
import { EmailValidator, upperPresent, lowerPresent, numPresent, specialPresent } from '../../helper/emailValidator';
import { zoneListApi } from '../../../api/account/zoneList';
import FormCheckoutBilling from './modules/FormCheckoutBilling';
import FormCheckoutBillingInformation from './modules/FormCheckoutBilling';
import { editDetail } from '../../../store/setting/action';
import Router from 'next/router';
import { priceHelpFunc } from '../../helper/priceHelper';
import { Modal, Button } from 'react-bootstrap'
import { encrptData, decrptData} from '../../../utilities/common-helpers'
//import { ingenicoReturnUrl } from '../../../api/url';
import { ingenicoMerchantId, ingenicoScheme, ingenicoTestAmount, paymentEnv, paytmSetting, ingenicoReturnUrl } from '../../../utilities/app-settings';
import Image from 'next/image';
import axios from 'axios';
import { formatCurrency } from "../../../utilities/product-helper";
import SelectBoxWithImage from '../../elements/selectBoxWithImage';
import OffersPromotions from '../shop/OffersPromotions';
import moment from 'moment';
// import {modalWarning } from "../../../services";
import AuthSignIN from '../../../components/shared/headers/modules/AuthSignIN';
import getProfileInfoApi from '../../../api/home/getInfo';
const { Panel } = Collapse;
// import { SITE_KEY } from '../../../api/url';
import { modalSuccess,modalError } from "../../../api/intercept";
import parseJson from 'parse-json';
import APIServices from '../../../services'
import Slider from "react-slick";
import NextArrow from "../../../components/elements/carousel/NextArrow";
import PrevArrow from "../../../components/elements/carousel/PrevArrow";
import Product from "../../../components/elements/products/Product";
import CustomCaptcha from '../CustomCaptcha/captcha';
import DisplayImageWithS3PreSignedUrl from '../../elements/AwsS3PreSignedUrl';
import { creditNoteByEmail } from '../../../api/account/creditNote';
// import ReCAPTCHA from "react-google-recaptcha";
import * as ga from '../../../utilities/common-helpers';
import {facebookGtm} from '../../../api/data/facebook'
export async function getRecentRemovedProducts(setRecentRemovedProducts) {
    
    const result=await APIServices.getAll(`product-store/get-products-removed-from-cart`)
    
   
    if(result&&result.data&&result.data.data){
        const pids = result.data.data;
        const products =await APIServices.getAll(`list/custom-product-list?productIds=${pids}`)
        
        if(products.data.status==1){
            setRecentRemovedProducts(products.data.data)
        }
    }
}


function Checkout() {
    const [getActionValue, setActionValue] = useState({})
    const [sendActionValue, sendAction] = useState({})
    const [recentRemovedProducts, setRecentRemovedProducts] = useState([]);
    const [itemRemovedFromCart, setItemRemovedFromCart] = useState(0);
    const [cartItems, setCartItems] = useState("")
    const [details, setDetail] = useState("")
    const [totalData, setTotalData] = useState("")
    const [addressData, setAddressData] = useState([])
    const [delivaryMobile, setDelivaryMobile] = useState("")
    const [delivaryMobileAlter, setDelivaryMobileAlter] = useState(null)
    // const recaptcha = React.useRef();
    const [addressLoader, setAddressLoader] = useState(false)
    const [couponInput, setCouponInput] = useState("")
    const [couponProduct, setCouponProduct] = useState("")
    const [discountedPrice, setDiscountedPrice] = useState("")
    const [coupandata, setcoupdata] = useState("")
    const [appliedName, setAppliedName] = useState(0)
    // const [skunameadd,setskuname]=useState("")
    const [appliedProductArray, setAppliedProductArray] = useState([])
    const [paymentOption, setPaymentOption] = useState([])
    const [name, setName] = useState("")
    const [lname, setLname] = useState("")
    const [mail, setMail] = useState("")
    const [number, setNumber] = useState("")
    const [nameValid, setNameValid] = useState(null)
    const [lnameValid, setLNameValid] = useState("")
    const [mailValid, setMailValid] = useState(null)
    const [numValid, setNumValid] = useState("")
    const [nameFocus, setNameFocus] = useState(false)
    const [mailFocus, setMailFocus] = useState(false)
    const [numFocus, setNumFocus] = useState(false)
    const [lnameFocus, setLnameFocus] = useState(false)
    const [method, setMethod] = useState()
    const [skuValidation, setSkuValidation]=useState(false)
    const [skuNameValidation, setSkuNameValidation]=useState("")
    const [captchaVerifyOption, setCaptchaVerifyOption]=useState(true)
    const [gstNumber, setGstNumber] = useState("")
    const [gstNumberValid, setGstNumberValid] = useState("")
    const [gstNumberFocus, setGstNumberFocus] = useState(false)
    const [gstClick, setGstClick] = useState(false)
    const [accountPassword, setAccountPassword] = useState(false)
    const [paymentvalid, setPaymentValid] = useState("")
    const [gstvalid, setGstValid] = useState("")
    const [coupanCode, setCoupanCode] = useState("")
    const [coupanCodeCN, setCoupanCodeCN] = useState("")
    const { t } = useTranslation('common');
    const [pin, setPin] = useState("");
    const [apiCall, setApiCall] = useState(false);
    const [categoryValidation, setCategoryValidation]=useState(false)
    const [loyaltyErrorMsg, setLoyaltyErrorMsg]=useState("")
    let removeFromCart = useSelector(s => s.cart.removeproduct)
    let reloadCart = useSelector(s => s.cart.addproduct)
    let incrementLoad = useSelector(s => s.cart.increment)
    let decrementLoad = useSelector(s => s.cart.decrement)
    const [getTotalItemsPrice, setTotalItemsPrice]= useState(0)
    const dispatch = useDispatch()
const [otpResendTime, setOtpResendTime]=useState(0)
        const [otpResendBtn, setOtpResendBtn]=useState(false)
    const [fname, setFname] = useState("")
    const [l1name, setL1name] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [address1, setAddress1] = useState("")
    const [city, setCity] = useState("")
    const [postCode, setPostCode] = useState("")
    const [num, setNum] = useState("")
    let currentColor = useSelector(s => s.palette.currentColor)
    const [countryId, setCountryId] = useState("")
    const [countryData, setCountryData] = useState([])
    const [countryName, setCountryName] = useState("")
    const [fnameError, setFnameError] = useState("")
    const [numError, setNumError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [cityError, setCityError] = useState("")
    const [postalError, setPostalError] = useState("")
    const [countryError, setCountryError] = useState("")
    const [zoneData, setZoneData] = useState([])
    const [zoneComp, setZoneComp] = useState([])
    const [zoneId, setZoneId] = useState("")
    const [zoneName, setZoneName] = useState("")
    const [zoneError, setZoneError] = useState("")
const [isLoaderActive, setLoaderActive]=useState(false)
const [isPageLoader, setPageLoader]=useState(false)
    //billing address 
    const [getCouponData, setCouponData]=useState("")
    const [fname1, setFname1] = useState("")
    const [l1name1, setL1name1] = useState("")
    const [email1, setEmail1] = useState("")
    const [address111, setAddress111] = useState("")
    const [address11, setAddress11] = useState("")
    const [city1, setCity1] = useState("")
    const [postCode1, setPostCode1] = useState("")
    const [num1, setNum1] = useState("")
    // let currentColor=useSelector(s=>s.palette.currentColor)
    const [countryId1, setCountryId1] = useState("")
    const [countryData1, setCountryData1] = useState([])
    const [countryName1, setCountryName1] = useState("")
    const [fnameError1, setFnameError1] = useState("")
    const [numError1, setNumError1] = useState("")
    const [emailError1, setEmailError1] = useState("")
    const [addressError1, setAddressError1] = useState("")
    const [cityError1, setCityError1] = useState("")
    const [postalError1, setPostalError1] = useState("")
    const [countryError1, setCountryError1] = useState("")
    const [zoneData1, setZoneData1] = useState([])
    const [zoneComp1, setZoneComp1] = useState([])
    const [zoneId1, setZoneId1] = useState("")
    const [zoneName1, setZoneName1] = useState("")
    const [zoneError1, setZoneError1] = useState("")
    // const [address1,setAddress1]=useState("")
const [paymentOnline, setPaymentOnline]=useState(false)
    const [billToSame, setBillToSame] = useState(true)
    const [billToSameAddress, setBillToSameAddress] = useState(true)
    const [cpasswordFocus, setCpasswordFocus] = useState(false)
    const [cpassword, setCpassword] = useState("")
    const [cpasswordValid, setCpasswordValid] = useState([])
    const [couponApplied, setCouponApplied] = useState(false)
    const [promotionApply, setPromotionApply] = useState(false)
    const [promotionProductPrice, setPromotionProductPrice] = useState(0)
    const [couponError, setCounponError] = useState("")
    const [couponErrorMsg, setCounponErrorMsg] = useState("")
    const [couponErrorMsgCN, setCounponErrorMsgCN] = useState("")
    const [prevAddressRadio, setPrevAddressRadio] = useState(false)
    const [prevAddressRadioValid, setPrevAddressRadioValid] = useState("")
    const [prevAddressBillRadioValid, setPrevAddressBillRadioValid] = useState("")
    const [prevAddressBillRadio, setPrevAddressBillRadio] = useState(false)
    const [dummy, setDummy] = useState()
    const [buttonLoader, setButtonLoader] = useState(false)
    const [buttondisable, setbuttondisable] = useState(false)
    const [auth, setAuth] = useState(false)
    const [submit, setSubmit] = useState(0)
    const [pinError, setPinError] = useState("")
    const [paymentData, setPaymentData] = useState({});
    const [getProductDiscountSum, setProductDiscountSum]=useState(0)
    const [getTotalTax, setTotalTax]=useState(0)
    const [paytmOptions, setPaytmOptions] = useState([]);
    const [merchantDetail, setMerchantDetail] = useState({});
    const [showNetbankingBanks, setShowNetbankingBanks] = useState(false);
    const [netBankingBanks, setNetBankingBanks] = useState([]);
    const [txnToken, setTxnToken] = useState('');
    const [showBankForm, setShowBankForm] = useState(false);
    const [channelCode, setChannelCode] = useState('');
    const [showCCDDForm, setShowCCDDForm] = useState(false);
    const [cardType, setCardType] = useState('');
    const [txnInitiationData, setTxnInitiationData] = useState({})
    const [merchantId, setMerchantId] = useState('')
    const [payOps, setPayOps] = useState([]);
    const [cardInfo, setCardInfo] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardValidTillMonth, setCardValidTillMonth] = useState('')
    const [cardValidTillYear, setCardValidTillYear] = useState('')
    const [cardCvv, setCardCvv] = useState('')
    const [selectedPaymentOptionClass, setPaymentOptionClass] = useState('');
    const [cartValueDiscountFlag, setCartValueDiscountFlag] = useState(false);
    const [cartValueDiscountedAmount, setCartValueDiscountedAmount] = useState(0);
    const [cartValueDiscountFlagPercentage, setCartValueDiscountFlagPercentage] = useState(false);
    const [getDiscountPercentageValue, setDiscountPercentageValue]=useState(0)
    const [cartValueDiscountedAmountPercentage, setCartValueDiscountedAmountPercentage] = useState(0);
    const [congratsMsgToAvailFreeItems, setCongratsMsgToAvailFreeItems] = useState(false);
    const [promotionProductMessage, setPromotionProductMessage] = useState();
    const [availedProductPromoInfo, setAvailedProductPromoInfo] = useState({});
    const [availedCartBasedPromoInfo, setAvailedCartBasedPromoInfo] = useState({});
    const [getLoyaltyPointInfo, setLoyaltyPointInfo] = useState({});
    const [totalCartValue, setTotalCartValue] = useState(0);
    
    const [coupanPrice, setCoupanPrice] = useState(0)
    const [coupanPriceCN, setCoupanPriceCN] = useState(0)
    
    const [getStoreData, setStoreData] = useState([])
    const [getStorePinCode, setStorePinCode] = useState("")
    const [getFacilityCode, setFacilityCode] = useState("")
    const [availedCouponBasedPromoInfo, setAvailedCouponBasedPromoInfo] = useState({});
    const [availedCouponBasedPromoInfoCN, setAvailedCouponBasedPromoInfoCN] = useState({});
    const [delivaryResponsre, setDelivaryResponse ] = useState("");
    const [pincode, setPinCode] = useState("");
    const [delivaryTime, setDelivaryTime] = useState()
    const [delivaryTime1, setDelivaryTime1] = useState("")
    const [time, setTime] = useState(false)
    const [time1, setTime1] = useState(false)
    const [selectBillAddress, setSelectBillAddress] = useState(false)
    const [getLoyaltyPoint, setLoyaltyPoint] = useState(0)
    const [getBalanceLoyaltyPoint, setBalanceLoyaltyPoint] = useState(0)
    const [getRedeemLoyaltyPoint, setRedeemLoyaltyPoint] = useState(0)
    const [getRedeemReferenceNo, setRedeemReferenceNo]=useState("")
    const [getPointApplied, setPointApplied] = useState(false)
    const [getOtpValue, setOtpValue]=useState("")
    const [getBtnValue, setBtnValue]=useState("Apply")
    const [invalidOtp, setInvalidOtp]=useState(false)
    const [getCheckOffer,setCheckOffer]=useState([])
    const [newVal, setNewVal] = useState("")
    const [newValCN, setNewValCN] = useState("")
    const [isOrderConfirmationBoxActive, setOrderConfirmationBoxActive] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [itemRemoveProduct, setItemRemoveProduct] = useState({})
    const [shippingCharges, setShippingCharges]=useState(0)
    const [getTotalCartValueWithoutShipping, setTotalCartValueWithoutShipping]=useState(0)
    
    const [prepaidOff, setPrepaidOff]=useState(0)
    const [getCreditNoteVerify, setCreditNoteVerify]=useState(null)
    const [getCreditNoteForOrder, setCreditNoteForOrder]=useState(null)
    const [getEmployeeDiscount, setEmployeeDiscount]=useState(true)
    const [getOpenOtpPopup, setOpenOtpPopup]=useState(false)
    const [alreadyUserError, setAlreadyUserError]=useState(false)
    const [loginSuccessPopup, setloginSuccessPopup]=useState(false)
    const [getOtpMessage, setOtpMessage]=useState("")
    const [otpBtn, setOtpBtn]=useState(true)
    const [otpLogin, setOtpLogin]=useState("")
    const [enteredCaptcha, setEnteredCaptcha] = useState('');
    const [browserIdentifier, setBrowserIdentifier] = useState('');
    const [showCustomCaptcha, setShowCustomCaptcha] = useState(true);
    const [isCaptchaBlank, setCaptchaBlank] = useState(false);
    const [reloadCaptchaOnError, setReloadCaptchaOnError] = useState(false);
    const [additionalDetails, setAdditionDetails] = useState({});
    const [getCoupanData, setCoupanData]=useState([])
    const [getActCoupanData, setActCoupanData]=useState([])
    const [getCodAvailable, setCodAvailable]=useState(true)
    const [getDeliveryServiceable, setDeliveryServiceable]=useState(true)
    const [getAddressIndex, setAddressIndex]=useState(0)
    const [getAlterMethod, setAlterMethod]=useState(false)
    let authValue = useSelector(s => s.auth)
    let currency = useSelector((s) => s.setting).currency;
    let arrayComp = []
    const carouselSetting1 = {
        dots: false,
        infinite: true,
        speed:2000,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow setActionValue={setActionValue} sendActionValue={sendActionValue} />,
        prevArrow: <PrevArrow />,
        autoplay: false,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 1920,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                arrows: true,
    
            },
        },
    
          {
              breakpoint: 1366,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: false,
                  arrows: true,
    
              },
          },
          {
              breakpoint: 767,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: false,
                  arrows: true,
    
    
              },
          },
          {
              breakpoint: 578,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: false,
                  arrows: true,
              },
          },
          
      ],
      };

    if (countryData && countryData.length>0) {
        var len = countryData.length;
        for (var i = 0; i < len; i++) {
            arrayComp.push({
                value: countryData[i].countryId,
                label: countryData[i].name,
            });
        }
    }

    const apiCallFunc = () => {
        countryListApi(setCountryData)
        zoneListApi(setZoneData)
        zoneListApi(setZoneData1)
    }



    useEffect(()=>{
        // console.log(SITE_KEY)
        //      loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
        //          console.log("script loaded")
        //      });
        creditNoteByEmail(setCoupanData, setActCoupanData, setLoaderActive)
         },[])
     
         const loadScriptByURL = (id, url, callback) => {
             const isScriptExist = document.getElementById(id);
     
             if(!isScriptExist){
                 var script = document.createElement("script");
                 script.type = "text/javascript";
                 script.src = url;
                 script.id = id;
                 script.onload = function () {
                     if(callback) callback();
                 };
                 document.body.appendChild(script)
             }
             if(isScriptExist && callback) callback();
         }


    const couponSubmit = () => {

        if (couponInput == "") {
            setCounponError("Please enter the coupon code")
        } else if (!couponApplied) {
            ApplyCouponApi(couponInput, mail, couponProduct, setDiscountedPrice, setCouponApplied, setAppliedName, (totalData - promotionProductPrice), setcoupdata)
        }

        // if (!couponApplied) {
        //     ApplyCouponApi(couponInput, mail, couponProduct, setDiscountedPrice, setCouponApplied, setAppliedName, totalData,setcoupdata)
        // }

    }

    useEffect( () => {

        if (submit) {

            validate()
        }
    }, [fname, email, num, address, city, countryName, postCode, zoneName, gstNumber, fname1, address111, city1, postCode1, zoneName1, countryName, countryName1, cpassword, prevAddressRadio, prevAddressBillRadio, method])



    useEffect(() => {
        let loyaltypoint
        if (localStorage.getItem("spurtUser")) {
            setName(JSON.parse(localStorage.getItem("spurtUser")).firstName),
                setMail(JSON.parse(localStorage.getItem("spurtUser")).email),
                setNumber(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber)
            setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName)
            // loyaltypoint = loyalPointApi(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber, setLoyaltyPoint, setBalanceLoyaltyPoint);
        }
        // if(loyaltypoint){
        // const parseData = parseJson(loyaltypoint)
        // setLoyaltyPoint(Number(parseData.CUSTOMER_DETAILS[0].LoyalityPoints))
        // setBalanceLoyaltyPoint(Number(parseData.CUSTOMER_DETAILS[0].LoyalityPoints))
        // }
    }, [])


    const validate = () => {
        let validateObj = {
            fnameSub: true, numSub: true, addressSub: true, citySub: true, countryNameSub: true, postCodeSub: true, zoneNameSub: true,
            fname1Sub: true, num1Sub: true, address111Sub: true, city1Sub: true, countryName1Sub: true, postCode1Sub: true, zoneName1Sub: true, nameSub: true,
            mailSub: true, numberSub: true, methodSub: true, gstNumberSub: true, cpasswordSub: true, prevAddressRadioValidSub: true, prevAddressBillRadioValidSub: true,
        }



        if (addressData && addressData.length === 0) {
            if (fname === "") {
                setFnameError("Name is required")
                validateObj.fnameSub = false;
            } else {
                setFnameError("")
                validateObj.fnameSub = true;
            }



            if (address === "") {
                setAddressError("Address is required")
                validateObj.addressSub = false;
            }
            else {
                setAddressError("")
                validateObj.addressSub = true;
            }

            if (city === "") {
                setCityError("City is required")
                validateObj.citySub = false;
            }
            else {
                setCityError("")
                validateObj.citySub = true;
            }

            if (countryName === "") {
                setCountryError("Country is required")
                validateObj.countryNameSub = false;
            }
            else {
                setCountryError("")
                validateObj.countryNameSub = true;
            }

            if (postCode === "") {
                setPostalError("Post code is required")
                validateObj.postCodeSub = false;
            }
            else {
                setPostalError("")
                validateObj.postCodeSub = true;
            }

            if (zoneName === "") {
                setZoneError("State is required")
                validateObj.zoneNameSub = false;
            }
            else {
                setZoneError("")
                validateObj.zoneNameSub = true;
            }
        }

        if (!billToSame) {
            if (fname1 === "") {
                setFnameError1("Name is required")
                validateObj.fname1Sub = false;
            } else {
                setFnameError1("")
                validateObj.fname1Sub = true;
            }

            // if(num1 === "") {
            //     setNumError1("Number is required")
            //     validateObj.num1Sub = false;
            // }
            // else{
            //     setNumError1("")
            //     validateObj.num1Sub = true;
            // }

            if (address111 === "") {
                setAddressError1("Address is required")
                validateObj.address111Sub = false;
            }
            else {
                setAddressError1("")
                validateObj.address111Sub = true;
            }

            if (city1 === "") {
                setCityError1("City is required")
                validateObj.city1Sub = false
            }
            else {
                setCityError1("")
                validateObj.city1Sub = true
            }

            if (countryName1 === "") {
                setCountryError1("Country is required")
                validateObj.countryName1Sub = false;
            }
            else {
                setCountryError1("")
                validateObj.countryName1Sub = true;
            }

            if (postCode1 === "") {
                setPostalError1("Post code is required")
                validateObj.postCode1Sub = false;
            }
            else {
                setPostalError1("")
                validateObj.postCode1Sub = true;
            }

            if (zoneName1 === "") {
                setZoneError1("State is required")
                validateObj.zoneName1Sub = false;
            }
            else {
                setZoneError1("")
                validateObj.zoneName1Sub = true;
            }
        }

        if (name === "") {
            // setName(value)
            // if(submit) {
            if (name.length < 3 && name.length !== 0) {
                setNameValid("Minimum of 3 characters")
                validateObj.nameSub = false;
            }
            else if (name.length === 0) {
                setNameValid("First name is required")
                validateObj.nameSub = false;
            }
            else {
                setNameValid("")
                validateObj.nameSub = true;
            }
            // }
        }

        // if(name === "lastname") {
        //     setLname(value)
        // }

        if (mail === "") {
            if (mail) {
                let emailCheck = EmailValidator(mail)
                if (emailCheck) {
                    setMailValid("")
                    validateObj.mailSub = true;
                }
                else {
                    setMailValid("Invalid email address")
                    validateObj.mailSub = false;
                }
            }
            else {
                setMailValid("Email is required")
                validateObj.mailSub = false;
            }
        }

        if (number === "") {
            if (number) {
                setNumValid("")
                validateObj.numberSub = true;
            }
            else {
                setNumValid("Number is required")
                validateObj.numberSub = false;
            }
        }

        if (method === undefined) {
            setPaymentValid("Select one of these payment method.")
            validateObj.methodSub = false;
            modalError('error',"Select one of these payment method.")
        } else {
            setPaymentValid("")
            validateObj.methodSub = true;
        }

        if (gstClick && gstNumber === "") {
            setGstValid("GST number is required")
            validateObj.gstNumberSub = false;
        } else {
            setGstValid("")
            validateObj.gstNumberSub = true;
        }

        if (accountPassword && cpassword.length === 0) {
            setCpasswordValid(["Password is required"])
            validateObj.cpasswordSub = true;
        }
        //  else if (!authValue.isLoggedIn && accountPassword && cpassword.length <= 8) {
        //     setCpasswordValid([" Password isn't long enough, minimum of 8 characters"])
        //     validateObj.cpasswordSub = false;
        // }
        else {
            let arrayValue = []
            if (!upperPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 in Capital Case!")
            }
            if (!numPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must have at least 1 Number")
            }
            if (!lowerPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 Lower Case!")
            }
            if (!specialPresent(!authValue.isLoggedIn && accountPassword && cpassword)) {
                arrayValue.push("Must contain at least 1 Special characters!")
            }
            if (!authValue.isLoggedIn && accountPassword && cpassword.length < 8) {
                arrayValue.push("Must be at least 8 characters!")
            }
            if (arrayValue.length > 0) {
                validateObj.cpasswordSub = false
            } else {
                validateObj.cpasswordSub = true
            }
            validateObj.cpasswordSub = true
            setCpasswordValid(arrayValue)

            // setCpasswordValid("")
            // validateObj.cpasswordSub = true;

        }


        if (authValue.isLoggedIn && !prevAddressRadio) {
            setPrevAddressRadioValid("Select one of these address.")
            modalError('error',"Select one of these address.");
            validateObj.prevAddressRadioValidSub = false;
        } else {
            setPrevAddressRadioValid("")
            validateObj.prevAddressRadioValidSub = false;

        }

        if (authValue.isLoggedIn && !billToSameAddress && !prevAddressBillRadio) {
            setPrevAddressBillRadioValid("Select one of these address.")
            validateObj.prevAddressBillRadioValidSub = false;
        } else {
            setPrevAddressBillRadioValid("")
            validateObj.prevAddressBillRadioValidSub = true;
        }

        if (validateObj.fnameSub && validateObj.fname1Sub && validateObj.numSub && validateObj.num1Sub && validateObj.addressSub && validateObj.postCodeSub && validateObj.postCode1Sub && validateObj.zoneNameSub && validateObj.zoneName1Sub && validateObj.address111Sub && validateObj.countryNameSub && validateObj.countryName1Sub && validateObj.nameSub && validateObj.mailSub && validateObj.methodSub &&
            validateObj.gstNumberSub && validateObj.cpasswordSub && validateObj.prevAddressRadioValidSub && validateObj.prevAddressBillRadioValidSub && validateObj.citySub && validateObj.city1Sub) {

            return true;
        } else {
            return false;
        }

        // if( fnameError=== "" && numError === "" && emailError === "" && addressError === "" && cityError === "" && postalError === "" && countryError === "" && zoneError === "" && fnameError1 === "" && numError1 === "" &&  emailError1 === "" && addressError1 === "" && 
        // cityError1 === "" && postalError1 === "" && countryError1 === "" && zoneError1 === "" && cpasswordValid === "" && prevAddressRadioValid === "" && prevAddressBillRadioValid === "" && nameValid === "" && mailValid === "" && numValid === "" && paymentvalid === "") {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    const addressSelect =async (address, totalCartAmount,index) => {
        console.log("address",address)
        setAddressIndex(index)
        const selactAddress = address[index]
        setPrevAddressRadioValid("")
        setPrevAddressRadio(true)
        setAddress(selactAddress.address1)
        setAddress1(selactAddress.address2)
        setCity(selactAddress.city)
        setDelivaryMobile(selactAddress.phoneNo)
        setDelivaryMobileAlter(selactAddress.phoneNoAlter)
        setPostCode(selactAddress.postcode);
        setCountryId(selactAddress.countryId)
        setZoneName(selactAddress.stateCode)
        setFname(selactAddress.company)
        setFacilityCode("")
        setSelectBillAddress(false)
        const cartLocale = JSON.parse(localStorage.getItem("cartItem"))
        let beginCheckoutStorage=[]
        if(localStorage.getItem("begin_checkout")){
             beginCheckoutStorage = JSON.parse(localStorage.getItem("begin_checkout"))
        }
        let items=[]
        let beginCheckout=false
        let fbItems=[]
        cartLocale.forEach(item => {
            fbItems.push({
                "currency": "INR",
                "content_ids": item.skuName,
                "content_name": item.name,
                "price": item.productSellingPrice
            })
            items.push({
                item_id: item.skuName,
                item_name: item.name
                }) 
                if((beginCheckoutStorage.length==0) || (!beginCheckoutStorage.some(itm=>itm.item_id==item.skuName) || (beginCheckoutStorage.length!=cartLocale.length))){
                    beginCheckout=true
                }
        });
        localStorage.setItem('begin_checkout',JSON.stringify(items))
        if(items.length>0 && beginCheckout){
        let data = {
            event: "begin_checkout",
            ecommerce: {
                value: totalCartAmount,
                currency: "INR",
                items: items
            }
          }
          facebookGtm(fbItems, 'InitiateCheckout')
          ga.pushToDataLayer(data);
        }
        if (billToSameAddress) {

            setPrevAddressBillRadio(true)
            setAddress11(selactAddress.address1)
            setAddress111(selactAddress.address2)
            setCity1(selactAddress.city)
            setPostCode1(selactAddress.postcode)
            setCountryId1(selactAddress.countryId)
            setZoneName1(selactAddress.stateCode)
            setFname1(selactAddress.company)
        }

       
        //do api call here

        if(selactAddress.postcode){
            handleData(selactAddress.postcode, 1)
        }
    }

    const handleData = async  (pinCode, checkData) => {
        console.log("pinCode",pinCode)
        if(pinCode !== ""){
            await pinCodeApiForDelivery(pinCode).then(async (res)=>{
                    if(res.status==200){
                        if(checkData==1){
                        setDeliveryServiceable(true)
                        const payment = await getPaymentApi()
                        if(res.data.pre_paid=='N' || res.data.cod=='N'){
                            setMethod("")
                        }
                        const setFlagPayment = payment.map(item=>{
                            if(item.id==2){ 
                                return  Object.assign(item,{isAvailable:res.data.cod})
                            }else{
                                return  Object.assign(item,{isAvailable:res.data.pre_paid})
                            }
                        })
                        setPaymentOption(setFlagPayment) 
                    }else{
                        setTime1(true)
                        setDelivaryTime(res.message)
                    }
                    }else{
                        if(checkData==1){
                        setDeliveryServiceable(false)
                        }else{
                        setTime1(true)
                        setDelivaryTime(res.message)
                        }
                    }
            },err=>{
                setDeliveryServiceable(false)
            })
        }else{
            console.log(11111111)
        }
    }

   

    const billAddressSelect = (e, billAddress) => {
        setPrevAddressBillRadio(true)
        setAddress11(billAddress.address1)
        setAddress111(billAddress.address2)
        setCity1(billAddress.city)
        setPostCode1(billAddress.postcode)
        setCountryId1(billAddress.countryId)
        setZoneName1(billAddress.stateCode)
        setFname1(billAddress.company)
    }


    const handleChangePaymentMethod = async (id) => {
        if(id == 2){
            if(prevAddressRadio  || !localStorage.getItem("spurtUser")){
                setMethod(id)
                setPaymentValid("")
        }else{
            modalError('error',"Please select address"); 
        }
        setPaymentOnline(false)
       }else{
        setMethod(id)
        setPaymentValid("")
        setPaymentOnline(true)
       }
    };

    const detailCart = () => {

        let cartLocale = JSON.parse(localStorage.getItem("cartItem"))
        let cartFinal = {}
        let cartArray = []
if(cartLocale){
        cartLocale.forEach((product) => {
            // cartFinal.productId=product.productId
            // cartFinal.productPrice=product.price
            // cartFinal.quantity=product.quantity
            // cartFinal.total=product.price*product.quantity

            cartFinal = { productId: product.productId, productPrice: product.price, quantity: product.quantity, skuName: product.skuName, total: (totalData - promotionProductPrice) }

            cartArray.push(cartFinal)
            setCouponProduct(cartArray)



        }
       
        )
    }

    }

    const getActivePromos = async () => {
        // let activePromotions = {
        //     cartValueBased: {
        //         percentageBased: [
        //             {
        //                 minCartTotalAmount: 1000,
        //                 maxCartTotalAmount: 2000,
        //                 discountValue: 20,
        //                 active: true
        //             },
        //             {
        //                 minCartTotalAmount: 3000,
        //                 maxCartTotalAmount: 4000,
        //                 discountValue: 10,
        //                 active: false
        //             }],
        //         freeItemsBased: [
        //             {
        //                 minCartTotalAmount: 5000,
        //                 maxCartTotalAmount: 6000,
        //                 freeProducts: [{ productId: 556, ProductSlug: "beevee-mens-100-cotton-solid-khaki-fixed-waist-turn-ups-and-detachable-cargo-with-belt" }],
        //                 active: true
        //             },
        //             {
        //                 minCartTotalAmount: 80000,
        //                 maxCartTotalAmount: 100000,
        //                 freeProducts: [
        //                     {
        //                         productId: 555,
        //                         ProductSlug: "beevee-mens-100-cotton-solid-khaki-fixed-waist-turn-ups-and-detachable-cargo-with-belt"
        //                     },
        //                     {
        //                         productId: 554,
        //                         ProductSlug: "beevee-mens-100-cotton-solid-khaki-fixed-waist-turn-ups-and-detachable-cargo-with-belt"
        //                     }
        //                 ],
        //                 active: true
        //             }]
        //     },

        //     couponBased: {

        //     },
        //     xyzBased: {

        //     }
        // }

        var activePromotions = localStorage.getItem("activeOffers");
        return activePromotions;
    }

    const totalInCart = async () => {
        const locale = JSON.parse(localStorage.getItem("cartItem"))
        console.log("localelocale",locale)
        var len = locale && locale.length;
        let detailArray = []
        let productDiscount = []
        let taxArray=[]
        let itemPriceArray=[]
        console.log(locale)
        for (var i = 0; i < len; i++) {
            const quantity = locale[i].quantity

            let itemSum = locale[i].pricerefer!==""?locale[i].pricerefer:locale[i].initialPrice

            itemSum=itemSum?itemSum:locale[i].price


            const actItemPrice = priceHelpFunc(locale[i].initialPrice?locale[i].initialPrice:locale[i].price,locale[i].taxType,locale[i].taxValue,0)*quantity


const ttp = actItemPrice*100
const tx =  locale[i].taxValue+100
const ItemPriceBtax = ttp/tx


            const totalSum = priceHelpFunc(itemSum,locale[i].taxType,locale[i].taxValue,0) * quantity
            detailArray.push(totalSum)


            const discount = (actItemPrice-totalSum)


            productDiscount.push(discount)

            const totalBasePrice = itemSum*quantity

          const  totalTax = actItemPrice-ItemPriceBtax;
            


            taxArray.push(totalTax)
            itemPriceArray.push(ItemPriceBtax)
        }





        var sum = detailArray.reduce(function (a, b) {
            return a + b;
        }, 0);

        let taxSum=0
        if(taxArray.length>0){
            taxSum= taxArray.reduce((a,b)=>{
            return a+b
        })
    }
        setTotalTax(Math.round(taxSum))
        let itemPriceSum=0
        if(itemPriceArray.length>0){
            itemPriceSum= itemPriceArray.reduce((a,b)=>{
            return a+b
        })
    }
        setTotalItemsPrice(Math.round(itemPriceSum)+Math.round(taxSum))

        let productDiscountSum=0
        if(productDiscount.length>0){
        productDiscountSum = productDiscount.reduce((a,b)=>{
            return a+b
        })
    }
    
        setProductDiscountSum(productDiscountSum)
        setTotalData(sum)

        let allActivePromosString = await getActivePromos();
        let allActivePromos = JSON.parse(allActivePromosString)
        let availedItemIdsInCart = 0;
        let appliedDiscountPerProd = 0;
        let cartTotalCal=0
        if(allActivePromos){
if(allActivePromos!="No record Found"){

        const cartValuePercentageBasedOffers = allActivePromos.cartValueBased.percentageBased;
        const cartValueFreeItemBasedOffers = allActivePromos.cartValueBased.freeItemsBased;
        let availedOffers = []
        cartValuePercentageBasedOffers.length > 0 && cartValuePercentageBasedOffers.forEach(element => {

            if ((element.minCartTotalAmount <= sum) && (sum < element.maxCartTotalAmount)) {

                const discountedAmount = Math.round(sum * (element.discountValue / 100));
                console.log(discountedAmount, "Nero discountedAmount");
                setCartValueDiscountedAmountPercentage(discountedAmount);
                setCartValueDiscountFlagPercentage(true);
                setDiscountPercentageValue(element.discountValue)

                availedOffers.push({ promoId: element.promoId, discountAmount: discountedAmount, freeProductIds: '', discountType: "Percentage" })


            }else{
                setCartValueDiscountedAmountPercentage(0);
                setCartValueDiscountFlagPercentage(false);
                setDiscountPercentageValue(0)
                availedOffers=[]
            }
            
        });

        let freeItemsIds = [];
        cartValueFreeItemBasedOffers.length > 0 && cartValueFreeItemBasedOffers.forEach(element => {
                element.freeProducts.forEach(item => {
                    let sumAfterFreeProduct
                    if(false && locale.some(item1 => item1.productId == item.productId)){
                        sumAfterFreeProduct =sum-item.productPrice
                    }else{
                        sumAfterFreeProduct=sum
                    }
                    console.log(sumAfterFreeProduct, element.minCartTotalAmount, element.maxCartTotalAmount)
                    if (((sumAfterFreeProduct>=element.minCartTotalAmount) && (sumAfterFreeProduct<=element.maxCartTotalAmount ))) {
                    freeItemsIds.push({promoId:element.promoId, productId:item.productId});
                    }
                })

        });



        const offerProduct = locale.filter(item1 => freeItemsIds.some(item2 => (item2.productId == item1.productId)));

        if(offerProduct.length>0){
        offerProduct.forEach(element => {
            availedItemIdsInCart++
            console.log("elementelementelement",element)
            appliedDiscountPerProd+= priceHelpFunc(element.initialPrice?element.initialPrice:element.price, element.taxType,element.taxValue,0)
            let findPromoId = freeItemsIds.filter(item=>item.productId==element.productId)
            availedOffers.push({ promoId: findPromoId[0].promoId, discountAmount: appliedDiscountPerProd, freeProductIds: element.productId, discountType: "Free Products" })
        });
    }else{
        setCartValueDiscountFlag(false);
        setCartValueDiscountedAmount(0);
    }
console.log(appliedDiscountPerProd)
        if (appliedDiscountPerProd > 0) {
            setCartValueDiscountFlag(true);
            setCartValueDiscountedAmount(appliedDiscountPerProd);
        }else{
            setCartValueDiscountFlag(false);
            setCartValueDiscountedAmount(0);
        }
        if (availedItemIdsInCart < freeItemsIds.length) {
            setCongratsMsgToAvailFreeItems(true);
        }else{
            setCongratsMsgToAvailFreeItems(false);
        }
        setAvailedCartBasedPromoInfo({ promotionType: "CartValueBased", promoAvailedInfo: availedOffers })
    }
    cartTotalCal = ((sum - (appliedDiscountPerProd + appliedName + coupanPrice + coupanPriceCN+promotionProductPrice +getRedeemLoyaltyPoint+cartValueDiscountedAmountPercentage)).toFixed(0))
 
    }else{
        cartTotalCal = ((sum - (appliedDiscountPerProd + appliedName + coupanPrice + coupanPriceCN+promotionProductPrice +getRedeemLoyaltyPoint+cartValueDiscountedAmountPercentage)).toFixed(0))
    }    

setAdditionDetails({appliedDiscountPerProd, appliedName, coupanPrice, coupanPriceCN, promotionProductPrice, getRedeemLoyaltyPoint, cartValueDiscountedAmountPercentage})

    prepaidOrderFunc(+cartTotalCal)
    
    
}

const prepaidOrderFunc = (totalCartValue)=>{
    console.log(totalCartValue, paymentOnline)
    let prepaidOffPromotion=(totalCartValue>999 && paymentOnline)?100:0
    let shippingChargesCal=0
    console.log(coupanPriceCN==0, !getCouponData.orderId)
    shippingChargesCal=(totalCartValue-prepaidOffPromotion)<1000?60:0
    if(getCouponData.couponValue>1059){
        shippingChargesCal=0
    }
    if(coupanPriceCN>1059){
        shippingChargesCal=0
    }
    
    
    setShippingCharges(shippingChargesCal)
    setTotalCartValueWithoutShipping(totalCartValue)
    setTotalCartValue((totalCartValue+shippingChargesCal)-prepaidOffPromotion)
    if(totalCartValue>0){
    addressList((totalCartValue+shippingChargesCal)-prepaidOffPromotion)
    }
    setPrepaidOff(prepaidOffPromotion)
    if((totalCartValue+shippingChargesCal)==0){
        handleChangePaymentMethod(2)
    }
}
    const addressList = async (totalCartAmount) => {
        const resultData = await addressListApiData(setAddressData, setAddressLoader)
        console.log(resultData)
        if(resultData && resultData.length>0){
        addressSelect(resultData,totalCartAmount,getAddressIndex)
        setAddressData(resultData)
        setAddressLoader(false)
        }else{
            const payment = await getPaymentApi()
                        setPaymentOption(payment) 
        }
    }


    useEffect(  () => {
        detailCart()
        apiCallFunc()
    }, [discountedPrice, totalData, coupandata])

    const radioStyle = {
        // display: 'block',
        // height: '70px',
        // lineHeight: '100px',
    };

    const arrayCreate = () => {
        const locale = JSON.parse(localStorage.getItem("cartItem"))
        var len = locale && locale.length;

        let detailArray = []
        for (var i = 0; i < len; i++) {
            let vendorids = locale[i].vendorId && locale[i].vendorId ? locale[i].vendorId : 0

            // setskuname(locale[i].skuName)
let skuName=""
locale[i].productvarientList && locale[i].productvarientList.length>0 && locale[i].productvarientList.forEach(element => {
    if(locale[i].variantId==element.id){
        skuName=element.skuName
    }
}); 
            detailArray.push({
                productId: locale[i].productId,
                quantity: locale[i].quantity,
                price: locale[i].pricerefer?locale[i].pricerefer:locale[i].price,
                basePrice: locale[i].pricerefer?locale[i].pricerefer:locale[i].price,
                model: locale[i].name,
                name: locale[i].name + `(${locale[i].variantName})`,
                productVarientOptionId: "",
                taxType: null,
                taxValue: locale[i].taxValue,
                varientName: locale[i].varientName,
                skuName: skuName,
                vendorId: vendorids
            });


        }
        setDetail(detailArray)

    }
    useEffect( () => {
        if (localStorage.getItem("spurtToken")) {
            setAuth(true);
        }
    }, []);

    const addPromotionProduct = () => {
let cartItems = JSON.parse(localStorage.getItem("cartItem"))
if(cartItems){
cartItems = cartItems.map(data => {
    Object.assign(data, { offerApplied: true});
    return data;
  });
}
  localStorage.setItem("cartItem",JSON.stringify(cartItems))
setCartItems(cartItems)
let setOfferProductData=[]
let offerProductQuantity
let freeProductQuantity
let productDiscount = 0
let buyFourProductList=[]
let cartProductQuantity = countValuesByKey(cartItems, "productId", "quantity")
let promotionDetail=[]
let promotionType1 =["buy_x_and_get_x_free", "buy_x_and_get_x_percent", "buy_2x_and_get_2y_free"]
let promotionType2 =["buy_2x_and_get_x_free", "buy_2x_and_get_x_percent"]
let promotionType3 =["buy_2x_and_get_2x_free", "buy_4x_and_get_x_amount", "buy_4x_and_get_x_percent"]
let promotionType4 =["buy_x_and_get_y_free","buy_x_and_get_y_percent"]
let promotionType5 =["buy_2x_and_get_y_free","buy_2x_and_get_y_percent"]
let promotionType6 =["buy_4_any_and_get_x_amount", "buy_4_any_and_get_x_percent"]
let quantityCheckBuyXgetX  = {1:0, 2:1, 3:1, 4:2, 5:2, 6:3, 7:3, 8:4, 9:4, 10:5, 11:5, 12:6, 13:6, 14:7, 15:7, 16:8, 17:8, 18:9, 19:9, 20:10, 21:10}
let quantityCheckBuy2XgetX  = {1:0, 2:0, 3:1, 4:1, 5:1, 6:2, 7:2, 8:2, 9:3, 10:3, 11:3, 12:4, 13:4, 14:4, 15:5, 16:5, 17:5, 18:6, 19:6, 20:6, 21:7}
let quantityCheckBuy2Xget2X  = {1:0, 2:0, 3:0, 4:1, 5:1, 6:1, 7:1, 8:2, 9:2, 10:2, 11:2, 12:3, 13:3, 14:3, 15:3, 16:4, 17:4, 18:4, 19:4, 20:5, 21:5}
let quantityCheckBuyXgetY = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

cartItems && cartItems.length > 0 && cartItems.forEach(element => {
    if(promotionType1.includes(element.promotionType)){
        offerProductQuantity=2
        freeProductQuantity=2
    }else if(promotionType2.includes(element.promotionType)){
        offerProductQuantity=3
        freeProductQuantity=3
    }else if(promotionType3.includes(element.promotionType)){
        offerProductQuantity=4
        freeProductQuantity=4
    }else if(promotionType4.includes(element.promotionType)){
        offerProductQuantity=1
        freeProductQuantity=1
    }else if(promotionType5.includes(element.promotionType)){
        offerProductQuantity=2
        freeProductQuantity=1
    }else if(promotionType6.includes(element.promotionType)){
        offerProductQuantity=1
        freeProductQuantity=1
        buyFourProductList.push({"productId": element.productId})
    }
    if((setOfferProductData.length==0 || (setOfferProductData.some(e=> e.offerProductId!=element.productId))) && element.promotionProductYid!=null){
    setOfferProductData.push({"promotionId":element.promotionId, "offerType":element.promotionType, "offerProductId":element.productId, "offerProductQuantity":offerProductQuantity, "freeProductId":element.promotionProductYid, "freeProductQuantity":freeProductQuantity, "freeProductPrice": element.promotionFreeProductPrice})
    }
})

const results = cartItems && cartItems.length > 0 && cartItems.filter(({ productId: id1 }) => buyFourProductList.some(({ productId: id2 }) => {
    console.log(id2, id1)
    return id2 == id1
}));

        setOfferProductData.forEach((element) => {
            if (element.offerType == "buy_4_any_and_get_x_amount" && buyFourProductList.length >= 4) {
                promotionDetail.push({ "promoId": element.promotionId, "discountAmount": element.freeProductPrice })
                productDiscount += (results[0].promotionFreeProductPrice / buyFourProductList.length)
                productPromotionApply(promotionDetail, productDiscount)
                offerMessageCheck(element)
            } else if ((element.offerType=="buy_x_and_get_x_free" || element.offerType=="buy_2x_and_get_x_free" || element.offerType=="buy_2x_and_get_2x_free") && cartProductQuantity[element.offerProductId] >= element.offerProductQuantity && cartProductQuantity[element.freeProductId] >= element.freeProductQuantity) {
                promotionDetail.push({ "promoId": element.promotionId, "discountAmount": element.freeProductPrice })
                let quantity={}
                if(element.offerType=="buy_x_and_get_x_free"){
                    quantity=quantityCheckBuyXgetX
                }if(element.offerType=="buy_2x_and_get_x_free"){
                    quantity=quantityCheckBuy2XgetX
                }if(element.offerType=="buy_2x_and_get_2x_free"){
                    quantity=quantityCheckBuy2Xget2X
                }
                
                productDiscount += element.freeProductPrice * (quantity[cartProductQuantity[element.freeProductId]])
                productPromotionApply(promotionDetail, productDiscount)
                offerMessageCheck(element)
            } else if ((element.offerType=="buy_x_and_get_y_free" || element.offerType=="buy_2x_and_get_y_free" || element.offerType=="buy_2x_and_get_2y_free") && cartProductQuantity[element.offerProductId] >= element.offerProductQuantity && cartProductQuantity[element.freeProductId] >= element.freeProductQuantity) {
                promotionDetail.push({ "promoId": element.promotionId, "discountAmount": element.freeProductPrice })
                let quantity=0

                quantityCheckBuyXgetY.forEach(item => {
                    if(cartProductQuantity[element.offerProductId]==item){
                        if(element.offerType=="buy_x_and_get_y_free"){
                        if(cartProductQuantity[element.freeProductId]>=cartProductQuantity[element.offerProductId]){
                            quantity=item
                        }else{
                            quantity=cartProductQuantity[element.freeProductId]
                        }
                    }else if(element.offerType=="buy_2x_and_get_y_free"){
                        const offerQuantity = (cartProductQuantity[element.offerProductId]/2).toString().substring(0,1)
                        if(offerQuantity<=cartProductQuantity[element.freeProductId]){
                            quantity=offerQuantity
                        }else{
                            quantity=cartProductQuantity[element.freeProductId]
                        }
                    }else{
                        const offerQuantity = (cartProductQuantity[element.offerProductId]/2).toString().substring(0,1)
                        const freeQuantity = (cartProductQuantity[element.freeProductId]/2).toString().substring(0,1)
                        if(offerQuantity<freeQuantity){
                            quantity=offerQuantity
                        }else{
                            quantity= freeQuantity
                        }
                    }
                    }
                });
                productDiscount += element.freeProductPrice*quantity
                productPromotionApply(promotionDetail, productDiscount)
                offerMessageCheck(element)
            } else if (element.offerType!="buy_x_and_get_x_free" && element.offerType!="buy_2x_and_get_x_free" && element.offerType!="buy_2x_and_get_2x_free" && element.offerType!="buy_x_and_get_y_free" && element.offerType!="buy_2x_and_get_y_free" && element.offerType!="buy_2x_and_get_2y_free" &&  element.offerType != "buy_4_any_and_get_x_amount" && cartProductQuantity[element.offerProductId] >= element.offerProductQuantity && cartProductQuantity[element.freeProductId] >= element.freeProductQuantity) {
                promotionDetail.push({ "promoId": element.promotionId, "discountAmount": element.freeProductPrice })
                productDiscount += element.freeProductPrice
                productPromotionApply(promotionDetail, productDiscount)
                offerMessageCheck(element)
            } else {
                productDiscount += 0
                productPromotionApply(promotionDetail, productDiscount)
            }
            console.log("productDiscount",productDiscount)
        });
  console.log(promotionDetail)
  console.log(setOfferProductData)
  console.log(cartProductQuantity)
  if(promotionDetail.length==0){
    setPromotionApply(false)
    setPromotionProductPrice(0)
  }
    }

   const productPromotionApply = (promotionDetail, productDiscountPrice)=>{
    let flag=productDiscountPrice>0?true:false
        setPromotionApply(flag)
        setPromotionProductPrice(productDiscountPrice)
        if(flag){
            const arrayUniqueByKey = [...new Map(promotionDetail.map(item =>[item["promoId"], item])).values()];
            setAvailedProductPromoInfo({
            promotionType: "ProductBased",
            promoAvailedInfo: arrayUniqueByKey
        })  
        }
        }

    const countValuesByKey = (arr, key, key2) => arr && arr.length >0 && arr.reduce((r, c) => {
        r[c[key]] = (r[c[key]] || 0) + c[key2]
        return r
    }, {})

const offerMessageCheck = (element)=>{
    let cartItems = JSON.parse(localStorage.getItem("cartItem"))
    cartItems = cartItems.map(data => {
        if(data.promotionFlag==1 && data.productId==element.offerProductId){
        Object.assign(data, { offerApplied: false });
        }
        return data;
      });
      localStorage.setItem("cartItem",JSON.stringify(cartItems))
      setCartItems(cartItems)
}

    useEffect( () => {
        addPromotionProduct()
    }, [])

    useEffect(()=>{
        console.log(totalCartValue, shippingCharges)
        prepaidOrderFunc(totalCartValue)
    },[paymentOnline])

    // useEffect(()=>{
    //     setMethod(2)
    // },[totalCartValue])
    

    useEffect( () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItem"))
        setCartItems(cartItems)

        totalInCart()
        setPromotionProductMessage(
            {
                "buy_x_and_get_x_free":'Buy one get one free',
                "buy_x_and_get_y_free":'Buy one get one free', 
                "buy_2x_and_get_x_free":'Buy two get one free', 
                "buy_2x_and_get_y_free":'Buy two get one free', 
                "buy_2x_and_get_2x_free":'Buy two get two free', 
                "buy_2x_and_get_2y_free":'Buy two get two free', 
                "buy_x_and_get_x_percent":'Buy two get discount on cart', 
                "buy_x_and_get_y_percent":'Buy two get discount on cart', 
                "buy_2x_and_get_x_percent":'Buy three get discount on cart', 
                "buy_2x_and_get_y_percent":'Buy three get discount on cart', 
                "buy_4x_and_get_x_percent":'Buy four get discount on cart', 
                "buy_4x_and_get_x_amount":'Buy four get discount on cart', 
                "buy_4_any_and_get_x_percent":'Buy four get discount on cart', 
                "buy_4_any_and_get_x_amount":'Buy four get discount on cart'
            }
            )
            let otherCategory=false
            const filterResult = cartItems && cartItems.length>0 && cartItems.filter((data) => new String(data.keywords).toUpperCase().indexOf(new String('ACCESSORIES').toUpperCase()) >= 0);
            if(filterResult && filterResult.length>0){
                otherCategory=true 
            }
            setCategoryValidation(otherCategory)
            setLoyaltyErrorMsg("")
    }, [reloadCart, removeFromCart, incrementLoad, decrementLoad, coupanPrice, coupanPriceCN, getRedeemLoyaltyPoint, paymentOnline])

    const handleIncreaseItemQty = (product) => {

        incrementQuantity(product)
        dispatch(increaseItemQty(product));
        dispatch(addItem(1))
        setCouponApplied(false)
        setDiscountedPrice("")
        setCouponInput("")
        addPromotionProduct()
        loyaltyPointApply(2, 0)
        couponCancel()
        couponCancelCN()
        console.log(product, 'reeew');
        if (product.maxQuantityAllowedCart === product.quantity) {
            return false
        }

        if (auth) {
            const localCart = JSON.parse(localStorage.getItem('cartItem'))

            let currentProduct = localCart.find((current) => {
                return current.productId === product.productId
            })
            if (product.flag === "") {
                addToCartApi(product.productId, priceHelpFunc(product.price, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName)
            }
            else {

                addToCartApi(product.productId, priceHelpFunc(product.pricerefer, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName)

            }
        }
    }

    const handleDecreaseItemQty = (product) => {
        console.log(product)
        if (product.quantity !== 1) {
            setCouponApplied(false)
            setDiscountedPrice("")
            setCouponInput("")
            decrementQuantity(product)
            dispatch(decreaseItemQty(product));
            dispatch(addItem(1))
            loyaltyPointApply(2, 0)
            couponCancel()
            couponCancelCN()
            if (auth) {
                const localCart = JSON.parse(localStorage.getItem('cartItem'))
                let currentProduct = localCart.find((current) => {
                    return current.productId === product.productId
                })
                if (product.flag === "") {
                    addToCartApi(product.productId, priceHelpFunc(product.price, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName)
                }
                else {
                    addToCartApi(product.productId, priceHelpFunc(product.pricerefer, product.taxType, product.taxValue, ""), currentProduct.quantity, "", "", setDummy, product.skuName, "", product.variantId, product.variantName)
                }
            }
        } else {
            setItemRemoveProduct(product)
console.log(111111111111111);
            setIsModalOpen(true)
            // removeFromCartApi(product.productId, product.price, "", product.skuName)
            // cartRemove(product)
            // dispatch(removeItem(product))

        }
        console.log(product.promotionType, product.quantity, product.promotionFlag)

        addPromotionProduct()

    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = () => {
        setIsModalOpen(false)
        handleRemoveFromCart(itemRemoveProduct)
    }
    // const validNameFill = (value) => {
    //     var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
    //     var regex = new RegExp(roleExpression);
    //     var t = value;
    //     if (!t.match(regex)) {
    //       setFname(value);
    //     }
    //   };


    const registerOnChange = async (e, val) => {
        const { name, value } = e.target;

        if (name === "fullname") {
            var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                setName(value)
            }


            // if(submit) {
            if (value.length < 3 && value.length !== 0) {
                setNameValid("Minimum of 3 characters")
            }
            else if (value.length === 0) {
                setNameValid("Full name is required")
            }
            else {
                setNameValid(null)
            }
            // }
        }

        if (name === "lastname") {
            var roleExpression = /[-!$@#%^&*1234567890()_+|~=`{}\[\]:";'<>?,.\/]/;
            var regex = new RegExp(roleExpression);
            var t = value;
            if (!t.match(regex)) {
                setLname(value)
            }
            if (value.length < 3 && value.length !== 0) {
                setLNameValid("Minimum of 3 characters")
            }
            else if (value.length === 0) {
                setLNameValid("Last name is required")
            }
            else {
                setLNameValid("")
            }

        }

        if (name === "email") {
            setMail(value)
            // if(submit) {
            if (value) {
                let emailCheck = EmailValidator(value)
                if (emailCheck) {
                    setMailValid(null)
                }
                else {
                    setMailValid("Invalid email address")
                }
            }
            else {
                setMailValid("Email is required")
            }

        }

        if (name === "number") {
            value.length <= 10 && setNumber(e.target.value)
            // if(submit) {
            if (value) {
                setNumValid("")
                setDelivaryMobile(e.target.value)
                if(value.length == 10 && val==2 && !authValue.isLoggedIn){
                    sendOtpUser(value)
                }
            }
            else {
                setNumValid("Phone number is required")
                setDelivaryMobile("")
            }
            
            // }
        }
        if (name === "cpassname") {
            if (value === "") {
                setCpasswordValid([" password is required"])
                setCpassword(value)
            }
            else {

                setCpassword(value)
                let arrayValue = []
                if (!upperPresent(value)) {
                    arrayValue.push("Must contain at least 1 in capital case!")
                }
                if (!numPresent(value)) {
                    arrayValue.push("Must have at least 1 Number")
                }
                if (!lowerPresent(value)) {
                    arrayValue.push("Must contain at least 1 lower case!")
                }
                if (!specialPresent(value)) {
                    arrayValue.push("Must contain at least 1 special characters!")
                }
                if (value.length < 8) {
                    arrayValue.push("Must be at least 8 characters!")
                }
                if (arrayValue.length > 0) {
                    setCpasswordValid(arrayValue)

                } else {

                    setCpasswordValid([])
                }
            }
        }
    }

    const otpPopupClose = ()=>{
        setEnteredCaptcha("");
        setOpenOtpPopup(false)
        setOtpBtn(true)
        setCaptchaVerifyOption(true)
    }
    const emailFocuOut = ()=>{
        if(delivaryMobile.length==10 && !authValue.isLoggedIn){
            sendOtpUser(delivaryMobile)
        }
    }


    const sendOtpUser= async (mobile)=>{
        if(name.length>0 && !nameValid && mail.length>0 && !mailValid){
            const isUserRegistred = await checkRegistredUser(mobile, mail)
            if(isUserRegistred.status==200){
                setOtpBtn(true)
                setOpenOtpPopup(true)
        }else{
            setAlreadyUserError(true)
        }
        }

    }

const captchaVerify = async ()=>{
    //const token = recaptcha.current.getValue()
    if(enteredCaptcha==""){
        setCaptchaBlank(true);
        return false;
    }else{
        setCaptchaBlank(false);
    }
    const result = await sendOtpToUser(delivaryMobile, enteredCaptcha, browserIdentifier)
    if(result.status==200){
    setOtpBtn(true)
    setOpenOtpPopup(true)
    setCaptchaVerifyOption(false)
    }else{
        setReloadCaptchaOnError(!reloadCaptchaOnError)
        setEnteredCaptcha("")
        setCaptchaVerifyOption(true)
        modalError("error", result.message)
    }
}


    const verifyOtp = async ()=>{
        const result = await otpVerificationApi(delivaryMobile, otpLogin)
        if(result.status==200){
        setOpenOtpPopup(false)
        setCaptchaVerifyOption(true)
            dispatch(checkOutLogin({isLoggedIN:true}))
            setloginSuccessPopup(true)
            const register = await UserRegister(name.trim(), lname.trim(), mail, 'MigUserRedchief@2023', 'MigUserRedchief@2023', delivaryMobile, '/account/checkout')
            console.log("register",register)
            localStorage.setItem("spurtToken", register.token);
            getProfileInfoApi(dispatch)
            //localStorage.setItem("spurtToken", register?.data?.token);
            const cartItems = JSON.parse(localStorage.getItem("cartItem"))
            const productJson=[]
            cartItems.forEach(element => {
                productJson.push({
                    productId:element.productId,
                    price:element.flag === ""?element.price:element.pricerefer,
                    taxType:element.taxType,
                    taxValue:element.taxValue,
                    quantity:element.quantity,
                    skuName:element.skuName,
                    variantId:element.variantId,
                    variantName:element.variantName
                })
            });
    
            productJson.forEach(async (element) => {
                await addToCartApi(element.productId, priceHelpFunc(element.price, element.taxType, element.taxValue, ""), element.quantity, "", "", setDummy,element.skuName, "", element.variantId, element.variantName) 
            });
    
            setTimeout(() => {
                setloginSuccessPopup(false)
            }, 1000);
        }else{
            setOtpMessage("Please enter correct OTP")
            setTimeout(() => {
                setOtpMessage("")
            }, 3000);
        }
    }

    const checkAlreadyUserError = (e)=>{
        setAlreadyUserError(false)
    }

    const checkAlreadyUserSuccess = (e)=>{
        setloginSuccessPopup(false)
    }
        
    const otpAgreement =(e) =>{
        if(e.target.checked){
        setOtpBtn(false)
        }else{
            setOtpBtn(true)
        }
    }
    const otpValueLogin = (value)=>{
        setOtpLogin(value)
    }
    const cancelCoupon = () => {
        setCouponApplied(false)
        setDiscountedPrice("")
    }



    const EditAddress = (detail) => {

        dispatch(editDetail(detail));
        Router.push('/account/addaddresses_edit/[eaid]', `/account/addaddresses_edit/${detail.addressId}`)

    }

const itemRemoveConfirmation = (product)=>{
    setItemRemoveProduct(product)
    setIsModalOpen(true)
}

    const handleRemoveFromCart = (product) => {
        setCouponApplied(false)
        setDiscountedPrice("")
        setCouponInput("")
        removeFromCartApi(product.productId, product.price, "", product.skuName, product.variantId, product.variantName, setItemRemovedFromCart)
        cartRemove(product)
        dispatch(removeItem(product))
        addPromotionProduct()
        couponCancel()
        couponCancelCN()
    }

    const CouponOnchange = (e) => {
        setCouponInput(e.target.value)
        setCounponError("")
    }

    const handleResponse = (res) => {
        console.log(res, "Nero HDFC")
    }

    const proceedAfterOrderConfirmation = async() => {
        setOrderConfirmationBoxActive(false)
        setLoaderActive(true)
        if (method == 8) {
            console.log("singh", method)
            //setLoaderActive(true)
            let _dataOpt = await paytmCheckout(fname, lname, address, delivaryMobile, delivaryMobileAlter, city, postCode, mail, details, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountedPrice, couponInput, name, address1, setButtonLoader, coupandata, buttonLoader, cpassword, setbuttondisable, availedProductPromoInfo, availedCartBasedPromoInfo, availedCouponBasedPromoInfo, totalCartValue, getFacilityCode, getLoyaltyPointInfo, getProductDiscountSum, getTotalTax, getTotalItemsPrice, shippingCharges,getCreditNoteForOrder, prepaidOff, additionalDetails);
                
            if (_dataOpt.status != 0) {
                console.log(_dataOpt, "Nero dsfsdf ++++++++++++++++++++++++++")
                let _d = _dataOpt.tokenisedData;
                console.log('Hello Nero paytm');
                    var config = {
                    "root": "",
                    "flow": "DEFAULT",
                    "data": {
                    "orderId": _d._token, /* update order id */
                    "token": _d.txnToken, /* update token value */
                    "tokenType": "TXN_TOKEN",
                    "amount": _d.orderAmount /* update amount */
                    },
                    "handler": {
                    "notifyMerchant": function(eventName,data){
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ",eventName);
                    console.log("data => ",data);
                    if(eventName=='APP_CLOSED' && data.message=='App closed from the header icon'){
                        console.log("configconfigconfig",config)
                        cnStatusUpdate(_dataOpt.orderId)
                    }
                    }
                    }
                    };
                    console.log("configconfigconfig",config)
                 

                    await savePaytmRequestPayload(config, _d._token);
                    console.log(window, "Nero WIndow Paytm")
                    if(window.Paytm && window.Paytm.CheckoutJS){
                    
                    // initialze configuration using init method
                    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                    // after successfully updating configuration, invoke JS Checkout
                    window.Paytm.CheckoutJS.invoke();
                    setLoaderActive(false)
                    }).catch(function onError(error){
                    console.log("error => ",error);
                    setLoaderActive(false)
                    });
                    
                    }else{
                        console.log("Nero Js not found in Window");
                    }
                    
            } else {
                setLoaderActive(false)
                setButtonLoader(false);
                invokeModal(false);
                modalError("error", _dataOpt.message)
            }
            
            

        } else if (method == 9) { // Ingenico Payment Method
          //  setLoaderActive(true)
            let _dataOpt = await ingenicoCheckout(fname, lname, address, delivaryMobile, delivaryMobileAlter, city, postCode, mail, details, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountedPrice, couponInput, name, address1, setButtonLoader, coupandata, buttonLoader, cpassword, setbuttondisable, availedProductPromoInfo, availedCartBasedPromoInfo, availedCouponBasedPromoInfo, totalCartValue, getFacilityCode, getLoyaltyPointInfo, getProductDiscountSum, getTotalTax, getTotalItemsPrice, shippingCharges,getCreditNoteForOrder, prepaidOff, additionalDetails);
            if (_dataOpt && _dataOpt.status == 200) {
                


                let returnUrl = ingenicoReturnUrl;
                let configJson = {
                    'tarCall': false,
                    'features': {
                        'showPGResponseMsg': true,
                        'enableAbortResponse': true,
                        'enableExpressPay': true,
                        'enableNewWindowFlow': true    //for hybrid applications please disable this by passing false
                    },
                    'consumerData': {
                        'deviceId': 'WEBSH1',	//possible values 'WEBSH1' or 'WEBSH2'
                        //'token': 'aad87d372ef5c03ed76bbce837daea4d67286c7d132b198d05807d1343c255f3e249856024664c7ab76442ed2c07f523a4b12e6a25805238ff64902954c2161f',
                        'token': _dataOpt.tokenisedData,
                        'returnUrl': returnUrl,    //merchant response page URL
                        // 'responseHandler': "handleResponse",
                        'paymentMode': 'all',
                        'merchantLogoUrl': 'https://www.paynimo.com/CompanyDocs/company-logo-vertical-light.png',  //provided merchant logo will be displayed
                        'merchantId': ingenicoMerchantId,
                        'currency': 'INR',
                        'consumerMobileNo': _dataOpt.data.telephone,
                        'consumerEmailId': _dataOpt.data.email,
                        'txnId': _dataOpt.data.orderPrefixId,   //Unique merchant transaction ID
                        'items': [{
                            'itemId': ingenicoScheme,
                            'amount': _dataOpt.data.total,
                            // 'amount': paymentEnv == "dev" ? ingenicoTestAmount : _dataOpt.data.total,
                            'comAmt': '0'
                        }],
                        'customStyle': {
                            'PRIMARY_COLOR_CODE': '#45beaa',   //merchant primary color code
                            'SECONDARY_COLOR_CODE': '#FFFFFF',   //provide merchant's suitable color code
                            'BUTTON_COLOR_CODE_1': '#2d8c8c',   //merchant's button background color code
                            'BUTTON_COLOR_CODE_2': '#FFFFFF'   //provide merchant's suitable color code for button text
                        }
                    }
                }

                await saveIngenicoRequestPayload(configJson, _dataOpt.data.orderPrefixId);
                var checkoutLoop = setInterval(function () {
                    if (typeof $["pnCheckout"] != 'undefined') {
                        $["pnCheckout"](configJson);
                        if (configJson.features.enableNewWindowFlow) {
                            window["pnCheckoutShared"].openNewWindow();
                        }
                        clearInterval(checkoutLoop);
                    }
                }, 500);
            }else{
                modalError("error", _dataOpt.message)
                setLoaderActive(false)
            }
        }else {
                await checkOutApi(fname, lname, address, delivaryMobile, delivaryMobileAlter, city, postCode, mail, details, method, address11, address111, postCode1, email1, city1, countryId1, countryId, zoneName1, zoneName, fname1, discountedPrice, couponInput, name, address1, setButtonLoader, coupandata, buttonLoader, cpassword, setbuttondisable, availedProductPromoInfo, availedCartBasedPromoInfo, availedCouponBasedPromoInfo, totalCartValue, getFacilityCode, getLoyaltyPointInfo, getProductDiscountSum, getTotalTax, getTotalItemsPrice, shippingCharges,getCreditNoteForOrder, prepaidOff, additionalDetails);
                setLoaderActive(false)
        
        }
    }

    const onCheckoutApiCall = async (validateObj) => {
        console.log("methodmethodmethod",method)
        

        if(!method){
            setAlterMethod(true)
        }else{
            setAlterMethod(false)
        setLoaderActive(false)
        setButtonLoader(false);
         validate();
         arrayCreate()
         let isLoggedIN = localStorage.getItem('spurtToken');
        console.log("singh1",isLoggedIN, fname, address, number, mail, city, postCode, zoneName)
        if ((method === undefined  || !prevAddressBillRadio) && isLoggedIN ) {
            validateObj.methodSub = false;
        }else if(!isLoggedIN && (fname=='' || address=='' || number=='' || mail=='' || city=='' || postCode=='' || zoneName=='')){
            modalError('error', "Please provide address");
        }else {
            const locale = JSON.parse(localStorage.getItem("cartItem"))
            let skuList=[]
            locale.forEach(element => {
                element.productvarientList && element.productvarientList.forEach(item => {
                    if(element.variantId==item.id){
                        skuList.push(item.skuName)     
                    }    
                });
            });
            const result = await  checkSkuStatus(skuList)
            console.log("result",result)
            let filterResult=[]
            if(result.status==200){
                filterResult = result.data.filter(item=>(item.skuStatus==0 || item.quantity==0 || item.productStatus==0))
            }

            console.log("filterResult",filterResult)
            if(filterResult.length==0){
            setPageLoader(true)
            setLoaderActive(true)
            setOrderConfirmationBoxActive(true);
            setPageLoader(false)
            setLoaderActive(false)
            }else{
            setSkuValidation(true)
            const allSku = filterResult.map(item => item.sku).join(', ');

            setSkuNameValidation(allSku)
            }      
        }
    }
    }

    const handleClickToShowNetbankingOptions = (row) => {

        setPaymentOptionClass(row.displayName);
        if (row && row.paymentMode === "NET_BANKING") {

            let allEnabledBanks = row && row.payChannelOptions.length > 0 && row.payChannelOptions.filter((item) => item.isDisabled.status === "false")

            setNetBankingBanks(allEnabledBanks);
            setShowNetbankingBanks(true);
            setShowCCDDForm(false);


        } else if (row && row.paymentMode === "CREDIT_CARD") {

            setShowBankForm(false);
            setShowNetbankingBanks(false);
            setShowCCDDForm(true);
            setCardType("CREDIT_CARD");


        } else if (row && row.paymentMode === "DEBIT_CARD") {
            setShowBankForm(false);
            setShowNetbankingBanks(false);
            setShowCCDDForm(true);
            setCardType("DEBIT_CARD");



        }
    }

    const handleClickForBank = async (channelCode) => {

        setChannelCode(channelCode);


    }

    const [isShow, invokeModal] = useState(false)

    const initModal = () => {
        setShowCCDDForm(false);
        setShowBankForm(false);
        setPaymentOptionClass('');
        setShowNetbankingBanks(false);
        invokeModal(!isShow)
    }

    const closeOrderConfirmationBox = () => {
        setOrderConfirmationBoxActive(!isOrderConfirmationBoxActive)
    }
    
    const closeSkuValidation = () => {
        setSkuValidation(false)
    }

    

const getCoupanValue = (e)=>{
setCoupanCode(e.target.value)
setCounponErrorMsg("")
setAvailedCouponBasedPromoInfo({})
}


const getCoupanValueCN = (e)=>{
    setCoupanCodeCN(e.target.value)
    setCounponErrorMsgCN("")
    setAvailedCouponBasedPromoInfoCN({})
    }


    const applyCoupon = async (val)=> {
        console.log(coupanCode)
        let coupanCodeText 
        if(val==1){
            coupanCodeText = coupanCode
        }else{
            coupanCodeText = val
        }
        setCoupanCode(coupanCodeText)
        if(coupanCodeText!=""){
            let couponJson = {
                "couponCode":coupanCodeText,
                "couponValue":((totalData+shippingCharges) - (cartValueDiscountedAmount + appliedName + coupanPrice + promotionProductPrice+getRedeemLoyaltyPoint + cartValueDiscountedAmountPercentage+prepaidOff)).toFixed(0),
                "emailRestrictions":mail
                }
                
            const couponData = await verifyCouponData(couponJson)
            console.log("couponData.data",couponData.data)
            const totalCartValue = +((totalData+shippingCharges) - (cartValueDiscountedAmount + appliedName + coupanPrice + coupanPriceCN + promotionProductPrice+getRedeemLoyaltyPoint + cartValueDiscountedAmountPercentage+prepaidOff)).toFixed(0)
            if(couponData.data && couponData.data.couponValue>totalCartValue && coupanPriceCN>0){
                couponData.data.couponValue=totalCartValue
            }
            if(couponData.data && !couponData.data.orderId && (promotionApply || cartValueDiscountFlag)){
                setCounponErrorMsg("Free product promotion applied. Please use coupon without promotion")
                return false
            }
            if(couponData && couponData?.status==200 && couponData.data.isActive==1 && couponData.data.couponPromotionType=="employeesOnly"){
                const employeeProfile = await getProfileData()
                if(employeeProfile.data.status==200){
                let coupanDiscount=0
                const cartItem = JSON.parse(localStorage.getItem("cartItem"))
                cartItem.forEach((element) => {
                    const productMrp = Math.round(+element.price+((element.price*element.taxValue)/100))
                    const discount = element.discount<=25?(30-element.discount):10
                    console.log(productMrp, discount, element.quantity)
                    coupanDiscount+=((Math.round((productMrp*discount)/100))*element.quantity)
                });
                setCoupanPrice(coupanDiscount)
                setCounponErrorMsg("")
                setAvailedCouponBasedPromoInfo(
                {promotionType: "employeeCoupon",
                    promoAvailedInfo: [{promoId: couponData.data.couponId, discountAmount: coupanDiscount}]
                })
            }else{
                setCounponErrorMsg("This coupon is only applicable for RSPL group employees")
            }
            }else if(couponData && couponData?.status==200 && couponData.data.isActive==1){
                let coupanDiscount=0
                if(couponData.data.couponType==1){
                    coupanDiscount=couponJson.couponValue*couponData.data.couponValue/100
                    setNewVal(couponData.data.couponValue)
                }else{
                    setNewVal("")
                    coupanDiscount=couponData.data.couponValue
                }
                setCoupanPrice(coupanDiscount)
                setCouponData(couponData.data)
                setCounponErrorMsg("")
                setAvailedCouponBasedPromoInfo(
                {promotionType: "CouponBased",
                    promoAvailedInfo: [{promoId: couponData.data.couponId, discountAmount: coupanDiscount}]
                })
            }else{
                setAvailedCouponBasedPromoInfo({})
                setCounponErrorMsg(couponData.message)
            }
        }else{
            setAvailedCouponBasedPromoInfo({})
            setCounponErrorMsg("Please enter Coupan Code")
        }
    
    }

    const applyCouponCN = async ()=> {
        console.log(coupanCodeCN)
        if(coupanCodeCN!=""){
            let couponJsonCN = {
                "couponCodeCN":coupanCodeCN,
                "couponValueCN":((totalData+shippingCharges) - (cartValueDiscountedAmount + appliedName + coupanPriceCN + promotionProductPrice+getRedeemLoyaltyPoint + cartValueDiscountedAmountPercentage+prepaidOff)).toFixed(0)
                }
            const couponDataCN = await verifyCouponDataCN(couponJsonCN.couponCodeCN, couponJsonCN.couponValueCN)
            if(couponDataCN?.status==1){
                setCoupanPriceCN(+couponDataCN.data.cnAmount)
                setCounponErrorMsgCN("")
                setCreditNoteForOrder(couponDataCN.data.cnCode)
                setAvailedCouponBasedPromoInfoCN(
                    {promotionType: "CreditNote",
                        promoAvailedInfo: [{promoId: couponDataCN.data.cnCode, discountAmount: couponDataCN.data.cnAmount}]
                    })
                    setCouponApplied(false)
                    setDiscountedPrice("")
                    setCouponInput("")
                    couponCancel()
            }else{
                setCoupanCodeCN("")
                setAvailedCouponBasedPromoInfoCN({})
                setCounponErrorMsgCN(couponDataCN.message)
            }
        }else{
            setCoupanCodeCN("") 
            setAvailedCouponBasedPromoInfoCN({})
            setCounponErrorMsgCN("Please enter valid credit note")
        }
    
    }
const couponCancel = ()=> {
    setCoupanPrice(0)
    setCoupanCode("")
    setCounponErrorMsg("")
}


const couponCancelCN = ()=> {
    setCoupanPriceCN(0)
    setCoupanCodeCN("")
    setCounponErrorMsgCN("")
}

const storePinCode = (e)=>{
    setStorePinCode(e.target.value)
}

// const searchStoreByPin = async ()=>{
//     if(getStorePinCode!=""){
//         let pinCodeJson ={
//             cityId:1,
//             pincode:getStorePinCode
//         }
//             getLocationListApi(pinCodeJson, dispatch)
//     }else{
//         modalWarning('error',"Data not available on this Pin Code");
//     }
// }

const addressList1 =  useSelector(state => state.setting.locList);
//setStoreData(storeData)
const selectAddress = (address)=>{
setPrevAddressRadioValid("")
setPrevAddressRadio(true)
setAddress(address.address)
setAddress1(address.address2)
setCity(address.storeCity)
setPostCode(address.pincode)
setDelivaryMobile(address.phoneNo)
setDelivaryMobileAlter(address.phoneNoAlter)
setCountryId(99)
setZoneName(address.stateCode)
setFname(address.shopName)
setFacilityCode(address.facilityCode)
setSelectBillAddress(true)
setBillToSameAddress(false)
}
const handleSubmit = (e) => {
    setSubmit(1)
    if (pin !== "") {
        var data = {
            cityId: "1",
            pincode: pin
        }
        getLocationListApi(data, dispatch)
        console.log(data, "cvjvj")
    }else {
       if( pin == ""){
        setPinError("Pincode required")
       }
    }
}

const handleValue = () => {
    Router.push('/')
}

const handlePress = () => {
    if(gstNumber.length == 15){
        return false;
    }
}

const checkDelivery = (e)=>{
    if((e.target.value).length<7){
    setPinCode(e.target.value)
    }else{
     return false   
    }
}

const loyaltyPointApply= async (val, count)=>{
    return false
    let validatePoint
    if(categoryValidation){
        setLoyaltyErrorMsg("Loyalty point is not applicable on accessories")
        return false
    }else{
        setLoyaltyErrorMsg("")
    }
    let redeemPointCal
    if(getLoyaltyPoint>(totalData - promotionProductPrice)){
        redeemPointCal=totalData - promotionProductPrice
    }else{
        redeemPointCal=getLoyaltyPoint
    } 
    if(val=="Verify"){
        const redeemJson = {
            "objClass": {
                "customer_mobile": number,
                "customer_points": getBalanceLoyaltyPoint<300?getBalanceLoyaltyPoint:"300",
                "passcode": getOtpValue,
                "ref_bill_no": "Test-01",
                "store_code": "ONLINE"
            }  
        }

        const redeemPoint = await loyalPointRedeem(redeemJson)
        if(redeemPoint?.Success){
            const savePointJson={
                    "balancePoints": redeemPoint.output.balance_points,
                    "pointsValue": Number(redeemPoint.output.points_value),
                    "redeemPoints": redeemPoint.output.redeem_points,
                    "referenceNo": redeemPoint.output.referenceNo,
                    "mobileNo":number,
                    "orderId": "",
                    "status": "Pending"
            }
            await saveLoyaltyPoint(savePointJson)
            setPointApplied(true)
            setBalanceLoyaltyPoint(redeemPoint.output.balance_points)
            setRedeemLoyaltyPoint(Number(redeemPoint.output.points_value))
            setRedeemReferenceNo(redeemPoint.output.referenceNo)
           setInvalidOtp(false)
    setLoyaltyPointInfo({promotionType: "loyaltyPoint",
    promoAvailedInfo: {
        "discountAmount": Number(redeemPoint.output.points_value),
        "customer_mobile": number,
        "customer_points": redeemPoint.output.balance_points,
        "referenceNo": redeemPoint.output.referenceNo,
    }})
    }else{
        setInvalidOtp(true)
        setRedeemLoyaltyPoint(0)
    }

    }else if(val=="Apply"){
        setOtpResendBtn(false)
        let a = 60+count
        const b = 1
        const x = setInterval(() => {
          const  c = a-b
            a=c
            if (a == 0) {
                setOtpResendBtn(true)
                clearInterval(x);
              }
              setOtpResendTime(a)
        }, 1000);
        let validateJson={
            "objClass": {
                "customer_mobile": number,
                "customer_points":getBalanceLoyaltyPoint<300?getBalanceLoyaltyPoint:"300",
                "store_code":"ONLINE"
            }
        }    
        validatePoint = await loyalPointValidate(validateJson)
        if(validatePoint.Success){
            setBtnValue("Verify")
        }
    }else{
        let reversePointJson ={
            "objClass": {
                "transaction_id": getRedeemReferenceNo
            }
        }
        setPointApplied(false)
        setBtnValue("Apply")
        setBalanceLoyaltyPoint(getLoyaltyPoint)
        setRedeemLoyaltyPoint(0)
        const reversePoint = await loyalPointReverse(reversePointJson)
        if(reversePoint.Success){
            setBalanceLoyaltyPoint(reversePoint.output.balance_points)
            await reverseLoyaltyPoint(getRedeemReferenceNo)
        }
    }
}
useEffect(()=>{
    getRecentRemovedProducts(setRecentRemovedProducts);
  },[itemRemovedFromCart])
    

    return (
        
        <div className="cart-container">

            <div className="checkout-contaoner">
                <div className="custom-checkout-form">
                    <div className="custom-checkout-form-left">
                        <h2>{t('checkouts.FillYourInfo')}</h2>
                        <div className="custom-checkout-form-contact">
                            {/* <div className="custom-checkout-form-contact"> */}
                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" maxLength="30" placeholder={t('checkouts.FirstName')} name="fullname" value={name} onFocus={e => setNameFocus(true)} onBlur={e => { setNameFocus(false); registerOnChange(e, 1) }}
                                    onChange={e => registerOnChange(e, 2)} style={{ borderColor: nameValid && "red" }} />
                                {/* <label className={nameFocus || name !== "" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"} style={{color:nameValid && "red"}}>First Name *</label> */}
                                {nameValid !== "" && <span className='custom-field-error' style={{}}>{nameValid}</span>}
                            </div>
                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" name="lastname" value={lname} placeholder={t('authentication.LastName')}
                                    onChange={e => registerOnChange(e, 2)} onFocus={e => setLnameFocus(true)} onBlur={e => { setLnameFocus(false); registerOnChange(e, 1) }} />
                                {/* <label className={lnameFocus || lname !=="" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"}>Last Name</label> */}
                                {lnameValid !== "" && <span className='custom-field-error' style={{}}>{lnameValid}</span>}
                            </div>

                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" type='email' placeholder='Email *' value={mail} name="email" onChange={e => registerOnChange(e,2)} onFocus={e => setMailFocus(true)} onBlur={e => {setMailFocus(false),emailFocuOut()}} style={{ borderColor: mailValid && "red" }}  />
                                {/* <label className={mailFocus || mail !=="" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"} style={{color:mailValid && "red"}}>Email ID *</label>  */}
                                {mailValid !== "" && <span className='custom-field-error' style={{}}>{mailValid}</span>}
                            </div>

                            <div className='custom-field-row'>
                                <input className="vendor-sign-input" type="number" name="number" placeholder={t('contact.Phone')} value={number} onChange={e => registerOnChange(e,2)} onFocus={e => setNumFocus(true)} onBlur={e => { setNumFocus(false); registerOnChange(e,1) }} style={{ borderColor: numValid && "red" }} maxLength="10" minLength="10" onKeyDown={(evt)=>["e", "E", ".", "-"].includes(evt.key) && evt.preventDefault()}/>
                                {/* <label className={numFocus || number !=="" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"} style={{color:numValid && "red"}}>Mobile Number *</label> */}
                                {numValid !== "" && <span className='custom-field-error' style={{}}>{numValid}</span>}
                                {/* </div> */}
                            </div>

                            {/* <div className="add-gst-number-container">
                                <div className="add-gst-number-subcontainer">
                                    <input  type="checkbox" onClick={e => setGstClick(e.target.checked)} />
                                    <span>{t('checkouts.AddGstNumber')}</span>
                                </div>
                                {gstClick && <div className='agns-input'>
                                    <input className="vendor-sign-input" placeholder="GST Number *" name="gstnumber" style={{ borderColor: gstvalid && "red", textTransform: "uppercase" }} value={gstNumber} onChange={e => setGstNumber(e.target.value)} onBlur={e => setGstNumberFocus(false)} onFocus={e => setGstNumberFocus(true)} onkeypress="if(this.value.length==15) return false" />
                                    {gstvalid !== "" ? <span className="error-span">{gstvalid}</span> : ""}
                                </div>}
                            </div> */}
                            {!authValue.isLoggedIn && <div className="add-gst-number-container d-none">
                                <div className="add-gst-number-subcontainer">
                                    <input type="checkbox" onClick={e => setAccountPassword(e.target.checked)} />
                                    <span>{t('checkouts.createAccount')}</span>
                                </div>
                                {accountPassword && <div className='agns-input'>
                                    <input className="vendor-sign-input" placeholder='create account password *' name="cpassname" value={cpassword} type="password"
                                        onChange={e => registerOnChange(e)} onFocus={e => setCpasswordFocus(true)} onBlur={e => { setCpasswordFocus(false) }} />
                                    {/* <label className={cpasswordFocus || cpassword !== "" ? "vendor-sign-label-focus checkout-form-label" :"vendor-sign-label checkout-form-label"}>create account password *</label> */}
                                    {cpasswordValid !== "" ? <>

                                        {cpasswordValid.map((error) => (
                                            <span className="error-span" style={{}}>{error}<br></br></span>
                                        ))}
                                    </> : ""}
                                </div>}

                                {/* {accountPassword && <div>
                                        <input className="vendor-sign-input" name="gstnumber" style={{width:"180px"}} value={gstNumber} onBlur={e=>setGstNumberFocus(false)} onFocus={e=>setGstNumberFocus(true)}/>
                                    </div>} */}
                            </div>}

                            {authValue.isLoggedIn && addressData.length === 0 ? <>
                                <div className="checkout-add-shipping-address">
                                    <Link href="/account/addaddress"><a>+ Add Shipping Address</a></Link>
                                </div>
                                {prevAddressRadioValid !== "" ? <span className="error-span">{prevAddressRadioValid}</span> : ""}
                                <div className="checkout-add-shipping-address">
                                    <Link href="/account/addaddress"><a>+ Add Billing Address</a></Link>

                                </div>

                            </> : <>
                                {authValue.isLoggedIn &&
                                    <>
                                        <h2 className="add-select-address">{t('account.ShippingAddress')} <Link href="/account/addaddress"><a>+ {t('account.AddNewAddress')}</a></Link>
                                        </h2>

                                        {addressData && addressData.map((address, index) => {

                                            return (

                                                <div className="address-container">

                                                    <input defaultChecked={index==0} type="radio" name="address-radio" className="addr-input" id={address.addressId} onClick={e => addressSelect( addressData,totalCartValue,index)} value={address} />
                                                    <label className="address-custom-label" for={address.addressId}>{address.addressType=== 1? "Home":"Work"}
                                                    
                                                        <a className="edit-address" onClick={e => EditAddress(address)}>{t('checkouts.Edit')}</a>
                                                    </label>
                                                    <p className="address-paragraph">{address.company}, {address && address.address1}, {address.city}, {address.address2}, {address.state + " : " + address.postcode}, {address.phoneNo}{address.phoneNoAlter?',':''} {address.phoneNoAlter}</p>
                                                </div>)
                                        })}
                                        {prevAddressRadioValid !== "" ? <span className="error-span">{prevAddressRadioValid}</span> : ""}

                                        {delivaryTime1 &&  (
                                 
                                 <span>{delivaryTime1}</span>
                            
                            )}
                               
                                        <div className="add-gst-number-subcontainer" style={{ marginBottom: "20px", marginLeft: "12px" }}>
                                            <input type="checkbox" onClick={e => setBillToSameAddress(e.target.checked)} disabled={selectBillAddress} checked={billToSameAddress} />
                                            <span>{t('checkouts.BillToSame')}</span>
                                        </div>
                                        {!billToSameAddress &&
                                            <>
                                                <h2 className="add-select-address">Select a billing address
                                                </h2>
                                                {addressData && addressData.map((address, index) => {
                                                    return (
                                                        <div className="address-container">
                                                            <input type="radio" className="addr-input" id={address.addressId} onClick={e => billAddressSelect(e, address)} value={address} />
                                                            <label className="address-custom-label">{address.addressType === 0 ? "Work" : "Home"}</label>
                                                            <p className="address-paragraph">{address && address.address1}, {address.address2}, {address.city}, {address.state + " : " + address.postcode}</p>
                                                        </div>)
                                                })}
                                                {prevAddressBillRadioValid !== "" ? <span className="error-span">{prevAddressBillRadioValid}</span> : ""}
                                            </>}
                                    </>}
                            </>
                            }

                            {false && !authValue.isLoggedIn &&
                                <>
                                    <FormCheckoutInformation
                                        // amount={amount}
                                        // cartTotal={cartTotal}
                                        cartItems={cartItems}
                                        productDetail={details}
                                        amount={totalData}
                                        addressData={addressData}
                                        fname={fname}
                                        setFname={setFname}
                                        l1name={l1name}
                                        setL1name={setL1name}
                                        email={email}
                                        setEmail={setEmail}
                                        address={address}
                                        setAddress={setAddress}
                                        address1={address1}
                                        setAddress1={setAddress1}
                                        city={city}
                                        setCity={setCity}
                                        postCode={postCode}
                                        setPostCode={setPostCode}
                                        num={num}
                                        setNum={setNum}
                                        countryId={99}
                                        setCountryId={99}
                                        countryData={countryData}
                                        setCountryData={setCountryData}
                                        countryName={countryName}
                                        setCountryName={setCountryName}
                                        fnameError={fnameError}
                                        setFnameError={setFnameError}
                                        numError={numError}
                                        setNumError={setNumError}
                                        emailError={emailError}
                                        setEmailError={setEmailError}
                                        addressError={addressError}
                                        setAddressError={setAddressError}
                                        cityError={cityError}
                                        setCityError={setCityError}
                                        postalError={postalError}
                                        setPostalError={setPostalError}
                                        countryError={countryError}
                                        setCountryError={setCountryError}
                                        submit={submit}
                                        setSubmit={setSubmit}

                                        zoneData={zoneData}
                                        setZoneData={setZoneData}
                                        zoneComp={zoneComp}
                                        setZoneComp={setZoneComp}
                                        zoneId={zoneId}
                                        setZoneId={setZoneId}
                                        zoneName={zoneName}
                                        setZoneName={setZoneName}
                                        zoneError={zoneError}
                                        setMethod={setMethod}
                                        method={method}
                                        setLoaderActive={setLoaderActive}
                                        setPaymentValid = {setPaymentValid}
                                    // handleLoginSubmit={handleLoginSubmit}
                                    />
                                    <div className="add-gst-number-subcontainer" style={{ marginBottom: "20px" }}>
                                        <input type="checkbox" onClick={e => setBillToSame(e.target.checked)} checked={billToSame} />
                                        <span>{t('checkouts.BillToSame')} </span>
                                    </div>
                                    {!billToSame && <FormCheckoutBillingInformation
                                        cartItems={cartItems}
                                        productDetail={details}
                                        amount={totalData}
                                        addressData={addressData}
                                        fname={fname1}
                                        setFname={setFname1}
                                        l1name={l1name1}
                                        setL1name={setL1name1}
                                        email={email1}
                                        setEmail={setEmail1}
                                        address={address111}
                                        setAddress={setAddress111}
                                        address1={address11}
                                        setAddress1={setAddress11}
                                        city={city1}
                                        setCity={setCity1}
                                        postCode={postCode1}
                                        setPostCode={setPostCode1}
                                        num={num1}
                                        setNum={setNum1}
                                        countryId={99}
                                        setCountryId={99}
                                        countryData={countryData1}
                                        setCountryData={setCountryData1}
                                        countryName={countryName1}
                                        setCountryName={setCountryName1}
                                        fnameError={fnameError1}
                                        setFnameError={setFnameError1}
                                        numError={numError1}
                                        setNumError={setNumError1}
                                        emailError={emailError1}
                                        setEmailError={setEmailError1}
                                        addressError={addressError1}
                                        setAddressError={setAddressError1}
                                        cityError={cityError1}
                                        setCityError={setCityError1}
                                        postalError={postalError1}
                                        setPostalError={setPostalError1}
                                        countryError={countryError1}
                                        setCountryError={setCountryError1}
                                        submit={submit}
                                        setSubmit={setSubmit}
                                        zoneData={zoneData1}
                                        setZoneData={setZoneData1}
                                        zoneComp={zoneComp1}
                                        setZoneComp={setZoneComp1}
                                        zoneId={zoneId1}
                                        setZoneId={setZoneId1}
                                        zoneName={zoneName1}
                                        setZoneName={setZoneName1}
                                        zoneError={zoneError1}
                                    />}
                                </>}

                                
                           

                                {totalCartValue!=0 && <div className="payment-new-screen mobile-menu-div">
                                    <p>{t('checkouts.SelectPaymentMode')}</p>
                                    <div className="payment-main-grid" style={{ width: "calc(100% - 0px)", fontSize: "18px" }}>
                                        <Radio.Group
                                            onChange={e => handleChangePaymentMethod(e.target.value)
                                            }
                                            value={method} size="small">
                                            <div className="payment-main-grid" style={{display: "grid"}}>
                                                {paymentOption && paymentOption.map((pay) => (
                                                    <Radio style={radioStyle} value={pay.id} key={pay.id}>

                                                        <DisplayImageWithS3PreSignedUrl 
                                                        imageKey={pay.pluginAvatarPath+pay.pluginAvatar} 
                                                        resizeRequired="YES" 
                                                        style={{width: '100px'}}
                                                        alt=""
                                                        /> <span className='payment-resources'>{pay.resources}</span>

                                                        {/* </div> */}
                                                    </Radio>

                                                ))}

                                            </div>
                                        </Radio.Group>
                                    </div>
                                    {paymentvalid !== "" ? <span className="error-span">{paymentvalid}</span> : ""}
                                </div>
                                    }
                          

                        </div>
                        
                        <div className="recent-viewed-products">

{(recentRemovedProducts.length > 0) ? <>
<h3 className='ml-3'>You showed intereset in the below products</h3>
<Slider {...carouselSetting1} className="ps-carousel">{recentRemovedProducts.map((item,i) => {
  return <>
    <div key={i}>
    <Product product={item} image={item && item.containerName !== "/" ? imageUrl + "?path=" + "" + "&name=" + item.image + "&width=300&height=200" : "/static/img/no-image.png"} />
</div>
  </>
})}</Slider></> : ""

}

</div>

                    </div>
                    

                    <div className="custom-checkout-form-right checkout-box-right">
                        <h2>{t('ItemsinCart')} - {cartItems && cartItems.length > 0? cartItems && cartItems.length: 0}
                            {/* <Link href="/account/shopping-cart"><a className="custom-checkout-form-veiw-cart">{t('view-cart')}</a></Link> */}
                        </h2>
                        

                        {cartItems &&  cartItems.length > 0 &&
                            <div>
                                <div className="custom-checkout-product-card">
                                    <table className="custom-checkout-card-table">
                                        {cartItems &&
                                            cartItems.map(product => (
                                                <tr>
                                                    <td className="custom-checkout-td-img" style={{ width: "80px" }}>
                                                        <div className="">
                                                            {/* <img src={product.productImage && product.productImage[0] && product.productImage[0].containerName !== "/" ? imageUrl + "?path=" + product.productImage[0].containerName + "&name=" + product.productImage[0].image + "&width=400&height=200" : "/static/img/no-image.png"} /> */}
                                                            <DisplayImageWithS3PreSignedUrl 
                                imageKey={product.productImage[0].containerName+product.productImage[0].image} 
                                resizeRequired="YES" 
                                style={{width: '100px'}}
                                alt={product && product.name && product.name.length < 40 ? product.name : product && product.name && product.name.substring(0, 40) + "..."}
                                />
                                                        </div>
                                                    </td>
                                                    <td className="custom-checkout-td-content">

                                                        <a className="close-btn-outer" style={{}} onClick={e => itemRemoveConfirmation(product)}>x</a>

                                                        <a className="checkout-td-prooductname">{product.name}
                                                        </a>
                                                        {product.promotionOffer && <a className='checkout-td-prooductname'>{product.promotionOffer}</a>}
                                                        <div className="checkout-td-prooductname-subcontainer">
                                                            <p className='mt-0'>{product.productvarientList && product.productvarientList.map(item=><>
                                                            {item.id==product.variantId && <p>{item.skuName}</p>}
                                                            </>
                                                            )}
                                                            <p className='mt-0'>Size: {product.variantName.split(',')[0]}, Color: {product.variantName.split(',')[1]}</p>
                                                            </p>
                                                            <div className="custom-product-box">
                                                                <button onClick={e => handleDecreaseItemQty(product)}>-</button>
                                                                <span>{product.quantity}</span>
                                                                <button onClick={e => handleIncreaseItemQty(product)}>+</button>
                                                                
                                                            </div>



                                                            <div className='cctd-price'>
                                                            {product.pricerefer!=="" && (
<div className='orignal-price mr-0 mb-2'>
    <span>
{currency ? currency.symbol + " " : "₹ "}{" "}
{formatCurrency(priceHelpFunc(
product.initialPrice?product.initialPrice:product.price,
product.taxType,
product.taxValue,
0
)*product.quantity)}
</span>
{product.flag !== ""  && (
<span className='discount ml-2'>
{Math.abs(
Math.round(
(((product.initialPrice?product.initialPrice:product.price) - product.pricerefer) * 100) /
(product.initialPrice?product.initialPrice:product.price)
)
)}
% off
</span>
)}
</div>
)}



                                                                {currency ? currency.symbol + " " : "₹ "}


{product.pricerefer!==""
? formatCurrency(
priceHelpFunc(product.pricerefer,product.taxType,product.taxValue,0)*product.quantity)
: formatCurrency(
priceHelpFunc((product.initialPrice?product.initialPrice:product.price),product.taxType,product.taxValue,0)*product.quantity
)}    

                                                            </div>



                                                        </div>
                                                        
                                                        {
                                                            (product.promotionType == "buy_4_any_and_get_x_amount" || product.promotionType == "buy_4_any_and_get_x_percent") ?
                                                             <>
                                                             {product.promotionFlag == 1 && <div className='custom-tier-proddet'>
                                                                 <Link href={`/offers/get-free-items?productids=${encrptData(product.promotionProductYSlug)}`}>
                                                                    <a className='color-link'> {product.offerApplied && promotionProductMessage[product.promotionType]}</a>
                                                                    </Link>
                                                             </div>}
                                                             </>:
                                                             <>
                                                             {product.promotionFlag == 1 && <div className='custom-tier-proddet'>
                                                                 <Link href="/product/[pid]" as={`/product/${product.promotionProductYSlug}`}>
                                                                    <a className='color-link'> {product.offerApplied && promotionProductMessage[product.promotionType]}</a>
                                                                    </Link>
                                                             </div>}
                                                             </>
                                                        }
                                                       
                                                    </td>
                                                </tr>
                                            ))}
                                                            <Modal className='order-confirm-box' show={isModalOpen}>
                                                                <Modal.Header>
                                                                    <h4>Product Remove Confirmation</h4>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <div className='order-confirm-body'>
                                                                    <p>Do you want to remove product item from cart?</p>
                                                                    <div className='action-btns'>
                                                                        <button  className='cancel-btn' onClick={handleCancel}>Cancel</button>
                                                                        <button className='proceed-btn' onClick={handleOk}>Yes, Proceed</button>
                                                                    </div>
                                                                </div>
                                                                </Modal.Body>
                                                            </Modal>
                                        {promotionApply && <tr>
                                            <td className="custom-td-total"><p className="coupon-apply-text">Product Promotion Discount</p> </td>
                                            <td className="custom-td-total" style={{ textAlign: "right" }}>(-) {currency ? currency.symbol + " " : "₹ "} {promotionProductPrice}	</td>
                                        </tr>}
                                        <tr>
                                            <td className="custom-td-total text-left"> {t('total')}</td>

                                            <td className="custom-td-total" style={{ textAlign: "right" }}>{currency ? currency.symbol + " " : "₹ "}{totalData - promotionProductPrice}
                                            </td>
                                        </tr>
                                        {cartValueDiscountFlag && <tr>
                                            <td className="custom-td-total">
                                                <p className="coupon-apply-text">Free Product on Cart Discount</p></td>
                                            <td className="custom-td-total" style={{ textAlign: "right" }}>(-) {currency ? currency.symbol + " " : "₹ "} {parseFloat(cartValueDiscountedAmount.toFixed(0))}	</td>


                                        </tr>
                                        }
                                        {cartValueDiscountFlagPercentage && <tr>
                                            <td className="custom-td-total">
                                                <p className="coupon-apply-text">{getDiscountPercentageValue}% Discount on Cart Value</p></td>
                                            <td className="custom-td-total" style={{ textAlign: "right" }}>(-) {currency ? currency.symbol + " " : "₹ "} {parseFloat(cartValueDiscountedAmountPercentage.toFixed(2))}	</td>


                                        </tr>
                                        }
                                        {coupanPriceCN>0 && <tr>
                                            <td className="custom-td-total" colspan="2" >
                                                <div className="promotionalBox">
                                                <div className="promotionalTitle">
                                                <p className="coupon-apply-text">Credit Note</p>
                                              <div><h6>Credit Note Code : <span>{coupanCodeCN} </span></h6></div>
                                              </div>
                                              <div className="promotionalAmount">
                                              <div className="custom-td-total" style={{ textAlign: "right" }}>(-) {currency ? currency.symbol + " " : "₹ "} {coupanPriceCN}	</div>

                                                <div class="close" > <a className='p-2' onClick={e => couponCancelCN()}>
                                                    x </a>
                                                {/* <td className="custom-td-total" onClick={e => couponCancel()} style={{ cursor: "pointer" }}>x</td> */}
                                                </div>
                                              </div>
                                              </div>
                                              
                                              </td>
                                            

                                        </tr>}
                                        {coupanPrice>0 && <tr>
                                            <td className="custom-td-total" colspan="2" >
                                                <div className="promotionalBox">
                                                <div className="promotionalTitle">
                                                <p className="coupon-apply-text">Coupon</p>
                                              <div><h6>Coupon Code : <span>{coupanCode} </span></h6></div>
                                              {newVal == "" ? <></>: <div><h6>Discount Value is : <span>{newVal} %</span></h6></div>}
                                              </div>
                                              <div className="promotionalAmount">
                                              <div className="custom-td-total" style={{ textAlign: "right" }}>(-) {currency ? currency.symbol + " " : "₹ "} {coupanPrice}	</div>

                                                <div class="close" > <a className='p-2' onClick={e => couponCancel()}>
                                                    x </a>
                                                {/* <td className="custom-td-total" onClick={e => couponCancel()} style={{ cursor: "pointer" }}>x</td> */}
                                                </div>
                                              </div>
                                              </div>
                                              
                                              </td>
                                            

                                        </tr>}
                                        
                                        {getPointApplied && <tr>
                                            <td className="custom-td-total" colSpan="2"> 
                                            <div className='promotionalBox'>
                                                <div className='promotionalTitle'>
                                                <p className="coupon-apply-text"> Loyalty Point Applied</p>
                                                <div><h6>Applied Point  </h6></div>
                                                </div>
                                                <div className='promotionalAmount'>
                                                <div style={{ textAlign: "right" }}>(-) {currency ? currency.symbol + " " : "₹ "} {getRedeemLoyaltyPoint}	</div>
                                                <div className='close'>
                                                    <a onClick={e => loyaltyPointApply(2, 0)}>x</a>
                                                </div>
                                                </div>
                                            </div>

                                            </td>

                                        </tr>}
                                                                         {/* {couponApplied && <tr>
                                            <td className="custom-td-total"> Discount Amount
                                                <p className="coupon-apply-text">Coupons, Vouchers  & Promotional</p></td>
                                            <td className="custom-td-total" style={{ textAlign: "right" }}>(-) {currency ? currency.symbol + " " : "₹ "} {discountedPrice}	</td>
                                            <td className="custom-td-total" onClick={e => cancelCoupon()} style={{ cursor: "pointer" }}>x</td>

                                        </tr>} */}
                                   {<tr>
                                            <td className="custom-td-total" colSpan="2"> 
                                            <div className='promotionalBox'>
                                                <div className='promotionalTitle'>
                                                <p className="coupon-apply-text"> Shipping Charges</p>
                                                <div><h6>Free shipping on order above 999</h6></div>
                                                </div>
                                                <div className='promotionalAmount'>
                                                <div style={{ textAlign: "right" }}> {currency ? currency.symbol + " " : "₹ "} {shippingCharges}	</div>
                                                </div>
                                            </div>

                                            </td>

                                        </tr>}
                                   {<tr>
                                            <td className="custom-td-total" colSpan="2"> 
                                            <div className='promotionalBox'>
                                                <div className='promotionalTitle'>
                                                <p className="coupon-apply-text"> 100 Rs OFF</p>
                                                <div><h6>100 Rs Off on prepaid order above 999</h6></div>
                                                </div>
                                                <div className='promotionalAmount'>
                                                <div style={{ textAlign: "right" }}> {currency ? currency.symbol + " " : "₹ "} {prepaidOff}	</div>
                                                </div>
                                            </div>

                                            </td>

                                        </tr>}
                                        <tr><td colspan="2" class="custom-td-total"> <div class="d-flex justify-content-between"><span>Total Payable Amount</span> <span>{currency ? currency.symbol + " " : "₹ "} {((totalData+shippingCharges) - (cartValueDiscountedAmount + appliedName + coupanPrice + coupanPriceCN + promotionProductPrice+getRedeemLoyaltyPoint + cartValueDiscountedAmountPercentage+prepaidOff)).toFixed(0)}</span></div></td>
                                        </tr>
                                    </table>

                                </div>
                                {congratsMsgToAvailFreeItems &&
                                    <div className='d-flex'>
                                        <div style={{ color: "green", marginRight: "4px" }}> 🎉 Congratulations, you are eligble to get free products. Add items in cart </div>
                                        <Link href={`/offers/get-free-items?cartValue=${totalData}`}>
                                            <a style={{ color: "blue" }}>
                                                Free Products
                                            </a>
                                        </Link>
                                    </div>
                                }
                                <div className='temp-data-hide loyality-point-card'><h5> Loyalty Point </h5>
                                 <div className='row justify-content-between align-item-center'>
                                    <div className='col-md-5'>
                                        Balance Loyalty Point: {getBalanceLoyaltyPoint}
                                        {loyaltyErrorMsg && <p className='alert alert-danger'>{loyaltyErrorMsg}</p>}
                                    </div>
                                    <div className='col-md-5'>
                                        {(!getPointApplied && getBtnValue=="Verify") && <>
                                        <label>Validate Loyalty Point</label>
                                        <input type="text" placeholder='Enter OTP' className='form-control' onChange={e=>{setOtpValue(e.target.value)}}/>
                                        {(!getPointApplied && getBtnValue=="Verify" &&otpResendTime!=0) && <div className='otp-resend'>OTP will resend  <span>{otpResendTime}</span></div>}
                                        {invalidOtp && <p className='alert alert-danger'>Invalid OTP</p>}
                                        </>}
                                     
                                        </div>
                                    {getBalanceLoyaltyPoint>0 && <div className='col-md-2 text-right '>
                                        <div>{!getPointApplied && <input type="button" className='btn btn-primary btn-lg' onClick={e=>loyaltyPointApply(getBtnValue, 0)} value={getBtnValue} />}{getPointApplied && <span className='alert alert-success'>Applied</span>}</div>
                                        {(otpResendBtn && getBtnValue=="Verify") && <input type="button" className='btn btn-primary btn-lg mt-2' onClick={e=>loyaltyPointApply("Apply", 60)} value="Resend OTP" />}
                                        </div>}
                                </div>
                                </div>
                                {coupanPriceCN<1 &&
                                <div className='temp-data-hide coupon-apply-card'><h5> Apply Credit Note </h5>
                                 <div className='row justify-content-between'>
                                    <div className='col-md-6'><input onChange={e=>getCoupanValueCN(e)} type="text" className='form-control' value={coupanCodeCN} placeholder='Enter Credit Note' /> 
                                   {couponErrorMsgCN!="" && <div className='alert alert-danger'>{couponErrorMsgCN}</div>}
                                    </div>

                                    <div className='col-md-6 text-right '><input type="button" className='btn btn-primary btn-lg' onClick={e=>applyCouponCN()} value="Apply" /></div>
                                </div>
                                </div>
                                }
                                {coupanPrice<1 &&
                                <div className='temp-data-hide coupon-apply-card'><h5> Apply Coupon </h5>
                                 <div className='row justify-content-between'>
                                    <div className='col-md-6'><input onChange={e=>getCoupanValue(e)} type="text" value={coupanCode} className='form-control' placeholder='Enter Coupon code' /> 
                                   {couponErrorMsg!="" && <div className='alert alert-danger'>{couponErrorMsg}</div>}
                                    </div>

                                    <div className='col-md-6 text-right '><input type="button" className='btn btn-primary btn-lg' onClick={e=>applyCoupon(1)} value="Apply" /></div>
                                </div>
                                </div>
                                }
                                {console.log("getCoupanData",getCoupanData)}
                                {getCoupanData.length>0 && coupanPrice<1 &&
                                <div className='temp-data-hide coupon-apply-card'><h5 className='d-flex align-items-end'> <GiftOutlined style={{color:"#2874f0",fontSize:"18px"}}/>&nbsp;&nbsp;Rewards </h5>

                                {getCoupanData.length>0 && getCoupanData.map((item, i)=>(
                                    <>{item.couponClass=='pending' && <div key={i} className='row justify-content-between coupon-list'>
                                    <div className='col-md-6 alert alert-success'>
                                    {item.coupanType==2?' ₹':''} {item.discount}{item.coupanType==1?'%':''} off coupon ({item.coupanCode})<br/>Min Order value: {item.minAmount}
                                    </div>
                                    <div className='col-md-6 text-right '><input type="button" className='btn btn-primary btn-lg' onClick={e=>applyCoupon(item.coupanCode)} value="Apply" /></div>
                                </div>

                                    }</>
                                )) 
                                }
                                </div>
                                }


                               
                                <br />
                                <div className='delivery-card'>
                                <h5>Delivery</h5>
                                     <div className='row justify-content-between' >
                                    <div className='col-md-6'>
                                    <input onChange={e=>checkDelivery(e)} type="number" maxLength="6"
                                    className='form-control' placeholder='Enter pincode' value={pincode}
                                    
                                    /> 
                                   {/* {couponErrorM sg!="" && <div className='alert alert-danger'>{couponErrorMsg}</div>} */}
                                    </div>

                                  

                                    <div className='col-md-6 text-right '>
                                        <button className='btn btn-primary btn-lg' onClick={e=>handleData(pincode,2)}>Check</button>
                                    </div>
                                </div>
                                { false  && (
                                 
                                 <span className='exact-delivery-time'>{delivaryTime}</span>
                            
                            )}
                            <div className='row'>
                            <p className='col-md-12' style={{color: "#1976d2"}}>{delivaryTime}</p>
                            {/* <p className='col-md-12' style={{color: "blue"}}>Enter Delivery pincode for exact delivery dates</p> */}
                          </div>
                                </div>

                                {getDeliveryServiceable?
                                <>{totalCartValue!=0 && <div className="payment-new-screen desktop-menu-div">
                                    <p>{t('checkouts.SelectPaymentMode')}</p>
                                    <div className="payment-main-grid" style={{ width: "calc(100% - 0px)", fontSize: "18px" }}>
                                        <Radio.Group
                                            onChange={e => handleChangePaymentMethod(e.target.value)
                                            }
                                            value={method} size="small">
                                            <div className="payment-main-grid" style={{display: "grid"}}>
                                                {paymentOption && paymentOption.map((pay) => (
                                                   <>{<Radio style={radioStyle} disabled={pay.isAvailable=='N'} value={pay.id} key={pay.id}>
                                                        <DisplayImageWithS3PreSignedUrl 
                                                        imageKey={pay.pluginAvatarPath+pay.pluginAvatar} 
                                                        resizeRequired="YES" 
                                                        style={{width: '100px'}}
                                                        alt=""
                                                        />
                                                        {(pay.isAvailable=='N' && pay.id==2) && <span className='clr-red'> COD is not available in your pincode</span>}
                                                        <span className='payment-resources'> {pay.resources}</span>
                                                    </Radio>}
                                                    </>
                                                ))}

                                            </div>
                                        </Radio.Group>
                                    </div>
                                    {paymentvalid !== "" ? <span className="error-span">{paymentvalid}</span> : ""}
                                </div>
                                    }
                                    </>:<div className='alert alert-danger text-center'>Order Delivery is not available to your pincode</div>}
                            </div>
                        }
{getAlterMethod && <div className='alert alert-danger text-center'>Please select payment gateway</div>}
                        {getDeliveryServiceable && cartItems && cartItems.length>0 ? 
                        <div className="custom-place-order">
                        {buttonLoader === true ? <button disabled={buttondisable === true}><i class="fa fa-refresh fa-spin"></i></button> : <button id={method == 9 ? "btnSubmit" : ''} disabled={buttondisable === true} onClick={e => onCheckoutApiCall(e)} >{t('StockCheckout.Placeorder')}</button>}
                    </div>
                         : 
                         <div className="custom-place-order">
                         <button onClick={handleValue}>Continue Shopping</button>
                     </div>
                        }

                    </div>


                </div>

            </div>










            <Modal className='paymentPopup' show={isShow}>
                {/* closeButton onClick={initModal} */}
                <Modal.Header>
                    <img src="/static/img/paytm-logo.png" height="50px" width="24px"></img>
                    <button type="button" class="close" data-dismiss="modal" onClick={initModal} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <h5>Choose Payment Mode</h5>

                        <ul className='payment-option'>
                            {payOps && payOps.length > 0 && payOps.map((row) => {
                                return <li className={row.displayName == selectedPaymentOptionClass ? 'option-selected' : ''} onClick={() => handleClickToShowNetbankingOptions(row)} key={row.displayName}>{row.displayName}</li>
                            })
                            }

                        </ul>

                        <main>
                            {/* <ul>
                                
                                {showNetbankingBanks && netBankingBanks && netBankingBanks.length > 0 && netBankingBanks.map((row) => {
                                    return <li style={{ listStyle: "none", display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: "20px" }} key={row.channelDisplayName}>
                                        <div><input onClick={() => handleClickForBank(row)} type={"radio"} name={"choosebank"} value={row.channelDisplayName} /></div><div>
                                            <img src={row.iconUrl} width={40} height={40} alt={row.channelDisplayName} />
                                            </div><div>{row.channelDisplayName}</div></li>
                                })
                                }

                            </ul> */}
                            {
                                showNetbankingBanks &&
                                <SelectBoxWithImage banks={netBankingBanks} setChannel={handleClickForBank} />
                                // <select className='form-control' onChange={(e) => {
                                //     handleClickForBank(e);
                                // }}>
                                //     {showNetbankingBanks && netBankingBanks && netBankingBanks.length > 0 && netBankingBanks.map((row) => {
                                //         return <option style={{
                                //             backgroundImage: `url(${row.iconUrl})`
                                //         }} value={JSON.stringify(row)} key={row.channelDisplayName}>

                                //             {/* <img src={row.iconUrl} width={40} height={40} alt={row.channelDisplayName} /> */}
                                //             {row.channelDisplayName}</option>
                                //     })
                                //     }
                                // </select>
                            }
                            {showNetbankingBanks &&
                                <form method="post" type="redirect" action={`${paytmSetting.hostUrl}/theia/api/v1/processTransaction?mid=${paytmSetting.merchantId}&orderId=${txnInitiationData.orderId}`}>
                                    <input type="hidden" name="mid" defaultValue={paytmSetting.merchantId} />
                                    <input type="hidden" name="orderId" defaultValue={txnInitiationData.orderId} />
                                    <input type="hidden" name="txnToken" defaultValue={txnInitiationData.txnToken} />
                                    <input type="hidden" name="paymentMode" defaultValue="NET_BANKING" />
                                    <input type="hidden" name="channelCode" value={channelCode} />
                                    <input type="hidden" name="AUTH_MODE" defaultValue="otp" />
                                    <input className="btn btn-success" type="submit" value="Pay" />
                                </form>
                            }

                            {showCCDDForm &&
                                <form method="post" type="redirect" action={`${paytmSetting.hostUrl}/theia/api/v1/processTransaction?mid=${paytmSetting.merchantId}&orderId=${txnInitiationData.orderId}`}>
                                    <input type="hidden" name="mid" defaultValue={paytmSetting.merchantId} />
                                    <input type="hidden" name="orderId" defaultValue={txnInitiationData.orderId} />
                                    <input type="hidden" name="txnToken" defaultValue={txnInitiationData.txnToken} />
                                    <input type="hidden" name="paymentMode" defaultValue={cardType} />
                                    {/* <input type="hidden" name="cardInfo" defaultValue="|4111111111111111|123|122025" /> */}
                                    <input type="hidden" name="cardInfo" value={`|${cardNumber}|${cardCvv}|${cardValidTillMonth}20${cardValidTillYear}`} />
                                    <input type="hidden" name="AUTH_MODE" defaultValue="otp" />
                                    <div>
                                        <label>Enter card Number</label>
                                        <input type="text" name="card-number" placeholder='Card number' className='form-control' onChange={(e) => {
                                            setCardNumber(e.target.value);
                                        }} />
                                    </div>
                                    <div>
                                        <label>Valid till</label>
                                        <div className='d-flex'>
                                            <input type="number" name="card-valid-month" placeholder='MM' className='form-control' onChange={(e) => {
                                                setCardValidTillMonth(e.target.value);
                                            }} />
                                            <input type="number" name="card-valid-yy" placeholder='YY' className='form-control ml-3' onChange={(e) => {
                                                setCardValidTillYear(e.target.value);
                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Enter CVV</label>
                                        <input type="text" name="card-cvv" placeholder='CVV' className='form-control w-25' onChange={(e) => {
                                            setCardCvv(e.target.value);
                                        }} />
                                    </div>
                                    <input className="btn btn-success" type="submit" value="Pay" />
                                </form>
                            }

                        </main>

                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="danger" onClick={initModal}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={initModal}>
                        Store
                    </Button>
                </Modal.Footer> */}
            </Modal>

            <Modal className='order-confirm-box' show={isOrderConfirmationBoxActive}>
                
                <Modal.Header>
                    <h2>Order Confirmation</h2>
                    {/* <button type="button" class="close" data-dismiss="modal" onClick={closeOrderConfirmationBox} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> */}
                </Modal.Header>

                <Modal.Body>
                    <div className='order-confirm-body'>
                        <p>Dear Customer, Please confirm order. By clicking Confim button you will be redirected to Payment page.</p>
                        <div className='action-btns'><button className='cancel-btn' onClick={closeOrderConfirmationBox}>Cancel</button><button className='proceed-btn' onClick={proceedAfterOrderConfirmation}>Proceed</button></div>
                    </div>
                </Modal.Body>
            </Modal>
            
            
            <Modal className='order-confirm-box' show={skuValidation}>
                
                <Modal.Header>
                    <h2>Message</h2>
                </Modal.Header>

                <Modal.Body>
                    <div className='order-confirm-body'>
                        <p className='alert alert-danger'>Dear Customer,<br/>Item SKU ({skuNameValidation}) you are trying to checkout is Out of Stock. Please try again later</p>
                        <div className='action-btns'><button className='cancel-btn' onClick={closeSkuValidation}>Ok</button></div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal className='order-confirm-box' show={getOpenOtpPopup}>
                
                <Modal.Header>
                    <h2>OTP Verification</h2>
                    <button type="button" class="close" data-dismiss="modal" onClick={e=>otpPopupClose(e)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>

                <Modal.Body>
                    {captchaVerifyOption && <div className='otp-mobile-box'>
                    <p>Please verify your mobile number.</p>
                    {/* <ReCAPTCHA ref={recaptcha} sitekey={SITE_KEY} /> */}
                    { showCustomCaptcha && <CustomCaptcha setEnteredCaptcha={setEnteredCaptcha}  enteredCaptcha={enteredCaptcha} setBrowserIdentifier={setBrowserIdentifier} isCaptchaBlank={isCaptchaBlank} reloadCaptchaOnError={reloadCaptchaOnError} /> }
                    <div style={{marginTop: '22px'}} className='action-btns'><button className='proceed-btn' onClick={e=>captchaVerify(e)}>Send OTP</button></div>
                    </div>}

                    {!captchaVerifyOption && <div className='order-confirm-body'>
                        <p>Verify OTP sent your mobile number.</p>
                        <input type="text" onChange={e=>otpValueLogin(e.target.value)} className="form-control mb-3" placeholder='Enter OTP'/>
                        {getOtpMessage && <p className='alert alert-danger'>{getOtpMessage}</p>}
                        <input type='checkbox' onClick={e=>otpAgreement(e)}/> By continuing, I agree to the <Link href="/page-detail/terms-and-conditions"><a className='color-link' >Terms of use</a></Link>
                        <div className='action-btns'><button disabled={otpBtn || !otpLogin} className='proceed-btn' onClick={e=>verifyOtp(e)}>Verify OTP</button></div>
                    </div>}
                </Modal.Body>
            </Modal>

            <Modal className='order-confirm-box' show={alreadyUserError}>
                
                <Modal.Header>
                    <h4 className='mb-0'>Error</h4>
                    <button type="button" class="close" data-dismiss="modal" onClick={e=>checkAlreadyUserError(e)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>

                <Modal.Body>
                <h5 className='alert alert-danger mb-0 pt-3 pb-3'>
                Please login for checkout, email or mobile already exist in our records
                    </h5>
                </Modal.Body>
            </Modal>

            <Modal className='order-confirm-box' show={loginSuccessPopup}>
            <Modal.Header>
                    <h4 className='mb-0'>Success</h4>
                    <button type="button" class="close" data-dismiss="modal" onClick={e=>checkAlreadyUserSuccess(e)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='alert alert-success mb-0 pt-3 pb-3'>
                        Logged in successfully.
                    </h5>
                </Modal.Body>
            </Modal>
            <div id='paytm-checkoutjs' className="paytm_position"></div>
            {/* </div> */}
            {/* <div className="ps-section__header">
                        <h1>{t('checkout-info')}</h1>
                    </div> */}
            {/* <div className="ps-section__content">
                        <FormCheckoutInformation
                            // amount={amount}
                            // cartTotal={cartTotal}
                            cartItems={cartItems}
                            productDetail={details}
                            amount={totalData}
                            addressData={addressData}
                        />
                    </div> */}
            {/* </div> */}
            <div dangerouslySetInnerHTML={{
                __html:
                    `
                 <script src="https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js"></script>
                 <script type="application/javascript" src="${paytmSetting.hostUrl}/merchantpgpui/checkoutjs/merchants/${paytmSetting.merchantId}.js" crossorigin="anonymous"></script>
                
                ` }} />
                {isLoaderActive && <div className='loader-page'><i className="fa fa-spinner fa-spin"></i> {!isPageLoader && <div>We are redirecting to you on payment gateway<br/>Do not back and refresh the page</div>}</div>}
        </div>

    );

}
  
const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(Checkout);