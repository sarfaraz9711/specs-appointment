import React, {useState,useEffect} from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import {useDispatch} from 'react-redux';
import {backCheckOutApi} from '../../../api';
import {imageUrl} from '../../../api/url';
import {editDetail} from '../../../store/setting/action';
import {EmailValidator} from '../../helper/emailValidator';
import  Router  from 'next/router';
import Link from 'next/link';
import {useSelector} from 'react-redux';
import { useTranslation } from '../../../i18n';
import { formatCurrency } from '../../../utilities/product-helper';
import { priceHelpFunc } from '../../helper/priceHelper';
import { incrementQuantity } from '../../helper/cartHelper';
import { addItem, increaseItemQty } from '../../../store/cart/action';
import { getQuantymin } from '../../../store/product/action';

function StockCheckoutMain({cartItems,productDetail,amount,addressData}) {
    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [addressCheck,setAddressCheck]=useState(0)
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [postCode,setPostCode]=useState("")
    const [fnameError,setFnameError] = useState("")
    const [lnameError,setLnameError] = useState("")
    const [emailError,setEmailError] = useState("")
    const [phoneError,setPhoneError] = useState("")
    const [addresError,setAddressError] = useState("")
    const [submit,setSubmit] = useState(false)
    const [shippingZone,setShippingZone] = useState("")
    const [address2,setAddress2] = useState("")
    const [priceadds,setpriceadd]=useState()
    const [quantity, setQuantity] = useState(cartItems.quantityUpdated)
    const dispatch = useDispatch()
    let currency = useSelector(s=>s.setting).currency;
    const price=cartItems.price
    const { t } = useTranslation('common');
    useEffect(()=>{
        setpriceadd()
        setQuantity(cartItems.quantityUpdated)
    },[cartItems.quantityUpdated])
    useEffect(()=>{
        if(submit) {
            validate()
        }
    },[fname,lname,email,phone,addressCheck])

    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            let a=localStorage.getItem("spurtUser")
            console.log(a,'3weeweq');
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName),
            setEmail(JSON.parse(localStorage.getItem("spurtUser")).email),
            setPhone(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber)
            setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName)
        }
    },[])

    const addressSelect=(address)=>{
        
        setAddressCheck(1)
       
        setAddress(address.address1+","+address.address2)
        setCity(address.city)
        setPostCode(address.postcode)
        setShippingZone(address.state)
        setAddress2(address.address2)
    }

    const handleLoginSubmit = () => {
        setSubmit(true)
        console.log(cartItems,'432242342xx');
        if(validate()){
            
            backCheckOutApi(fname,lname,address,phone,city,postCode,email,[cartItems],shippingZone,address2)
        }

    };

    const validate = () => {
        let validObj = { fnameError: true,mailError: true, numError: true, addressCheck: true }

        if(fname === "") {
            setFnameError("First name is required")
            validObj.fnameError = false
        } else {
            setFnameError("")
            validObj.fnameError = true
        }
        if(phone === "") {
            setPhoneError("phone Number is required")
            validObj.numError = false;
        } else if(phone.length < 10) {
            setPhoneError("Minimum of 10 Numbers is requrired")
            validObj.numError = false;
        }
         else {
            setPhoneError("")
            validObj.numError = true;
        }

        if (email !== "") {
            let emailCheck = EmailValidator(email)

            if (emailCheck) {
                setEmailError("")
                validObj.mailError = true;
            }
            else {
                setEmailError("Invalid email address")
                validObj.mailError = false;
            }
        }
        else {
            setEmailError("Email is required")
            validObj.mailError = false;
        }

        if(!addressCheck) {
            setAddressError("Address is required")
            validObj.addressCheck = false
        } else {
            setAddressError("")
            validObj.addressCheck = true
        }

        if(validObj.fnameError && validObj.numError && validObj.mailError && validObj.addressCheck) {
            return true;
        } else {
            return false;
        }
    }

    const EditAddress =(detail)=>{
        dispatch(editDetail(detail));
        Router.push('/account/addaddresses_edit/[eaid]',`/account/addaddresses_edit/${detail.addressId}`)
    }  

    const handleIncreaseItemQty = (e,cartItems) => {
        if(cartItems.maxQuantityAllowedCart !==null){
            if(cartItems.quantityUpdated<cartItems.maxQuantityAllowedCart){
              
                setQuantity(cartItems.quantityUpdated-1)
            
                cartItems.quantityUpdated=cartItems.quantityUpdated+1
        //        const pri =cartItems.initialPrice* cartItems.quantityUpdated
        // console.log(pri,'pri');
        // console.log(cartItems,'cartItemwe23s');
        //        cartItems.price=
        //        formatCurrency(
        //             priceHelpFunc(
        //                 pri,
        //                 cartItems.taxType,
        //                 cartItems.taxValue*quantity,
        //               ""
        //             )
        //           )
            }

        }else{
            console.log(cartItems,'cartItemwe23s');
            setQuantity(cartItems.quantityUpdated+1)
        
            cartItems.quantityUpdated=cartItems.quantityUpdated+1
    //        const pri =cartItems.initialPrice* cartItems.quantityUpdated
    // console.log(pri,'pri');
    //        cartItems.price= formatCurrency(
    //             priceHelpFunc(
    //                 pri,
    //                 cartItems.taxType,
    //                 cartItems.taxValue*quantity,
    //               ""
    //             )
    //           )

        }
       
        
      
       
    }
    const handleDecreaseItemQty = (e,cartItems) => {
        if(cartItems.minQuantityAllowedCart !==null){
            if(cartItems.quantityUpdated>cartItems.minQuantityAllowedCart){
                
                setQuantity(cartItems.quantityUpdated-1)
            
                cartItems.quantityUpdated=cartItems.quantityUpdated-1
        //          Math.round( formatCurrency(
        //             priceHelpFunc(
        //                 pri,
        //                 cartItems.taxType,
        //                 cartItems.taxValue,
        //               ""
        //             )
        //           ))
        //        const pri =cartItems.initialPrice* cartItems.quantityUpdated
        //        console.log(cartItems.quantityUpdated,'cartItemwe23s');
        // console.log(pri,'pri');
            
        //        cartItems.price=pri  
        //        Math.round( formatCurrency(
        //             priceHelpFunc(
        //                 pri,
        //                 cartItems.taxType,
        //                 cartItems.taxValue,
        //               ""
        //             )
        //           ))
            }
            
        }else{
            console.log(cartItems,'cartItemwe23s');

            if(cartItems.quantityUpdated>1){
                setQuantity(cartItems.quantityUpdated-1)
        
                cartItems.quantityUpdated=cartItems.quantityUpdated-1
        //        const pri =cartItems.initialPrice* quantity
        // console.log(pri,'pri');
            
        //        cartItems.price=  Math.round( formatCurrency(
        //             priceHelpFunc(
        //                 pri,
        //                 cartItems.taxType,
        //                 cartItems.taxValuecartItems.taxValue*cartItems.quantityUpdated,
        //               ""
        //             )
        //           ))

            }
          
        }

        
        
    }
    

    return(
        <div className="cart-container">
            
            <div className="sc-new-container">
                <div className="sc-left-container">
                    <h2>{t('checkouts.FillYourInfo')}</h2>
                    <div className="sc-form-container">
                        <div className="sc-scinput-container">
                            <input placeholder={t('checkouts.FirstName')} value={fname} onChange={e =>setFname(e.target.value)}/>
                            {submit && fnameError !== "" && <span className="err-msg">{fnameError}</span>}
                        </div>
                        <div className="sc-scinput-container">
                            <input placeholder={t('checkouts.LastName')} value={lname} onChange={e =>setLname(e.target.value)}/>
                        </div>
                        <div className="sc-scinput-container">
                            <input placeholder="Email" value={email} onChange= {e =>setEmail(e.target.value)}/>
                            {submit && emailError !== "" && <span className="err-msg">{emailError}</span>}
                        </div>
                        <div className="sc-scinput-container">
                            <input type="number"  placeholder={t('StockCheckout.Phone')} value={phone} onChange= {e =>e.target.value.length < 12 && setPhone(e.target.value)}/>
                            {submit && phoneError !== "" && <span className="err-msg">{phoneError}</span>}
                        </div>
                        <h2>Select a shipping address<Link href="/account/addaddress"><a> + Add new address </a></Link></h2>
                        <div className="sc-ship-add-conatiner">
                            {addressData && addressData.map((address,index)=>(
                                <div className="sc-ship-card flex" key={index}>
                                    <input type="radio" id={address.addressId} onClick={e=>addressSelect(address)} value={address}/>
                                    <label className="sc-wh-container " for={address.addressId}>
                                        <h4>{address && address.addressType === 1 ? "Work" : "Home"}</h4>
                                        <p>{address && address.address1} {address && address.address2} {address && address.city} {address && address.state} {address && address.postcode}</p>
                                    </label>
                                    <span onClick={e =>EditAddress(address)}>Edit</span>
                                </div>
                            ))}
                        </div>
                        {submit && addresError !== "" && <span className="err-msg">{addresError}</span>}
                    </div>
                </div>
                <div className="sc-right-checkout">
                    <h2>{t('ItemsinCart')} - 1</h2>
                    <div className="sc-rht-table">
                        <table>
                            {cartItems && 
                                <tr>
                                <td className="sc-rht-td-data">
                                    <div className="rht-tb-img">
                                    <img src={imageUrl+"?path="+cartItems.productImage[0].containerName+"&name="+cartItems.productImage[0].image+"&width=60&height=60"}/>
                                
                                    </div>
                                </td>
                                <td className="sc-rht-td-data">
                                    <a href="#">{cartItems && cartItems.name}</a>
                                </td>
                                <td className="sc-rht-td-data">
                                    <div className="custom-product-box" style={{ justifyContent: "center"}}>
                                        
                                       <button onClick={e=>handleDecreaseItemQty(e,cartItems)}>-</button>
                                       <span style={{textAlign:"center"}}>{quantity}</span>
                                       <button onClick={e=>handleIncreaseItemQty(e,cartItems)}>+</button>
                                    </div>
                                </td>
                        
                                {console.log(cartItems,'4455cartItems')}

                                <td className="sc-rht-td-data" style={{color:"red"}}>{currency ? currency.symbol + " " : '₹ '}{
                                 formatCurrency(
                                        priceHelpFunc(
                                            cartItems.price,
                                            cartItems.taxType,
                                            cartItems.taxValue,
                                          ""
                                        )*quantity
                                      )
                                } 
                                {/* {Math.round(cartItems.price)} */}
                                </td>
                            </tr>
                            }
                            
                            <tr>
                                <td className="sc-rht-ldc sc-rht-td-data " colSpan="2">{t('checkouts.DeliveryCharges')}</td>
                                <td className="sc-rht-rdc" colSpan="2">{t('StockCheckout.Free')}</td>
                            </tr>
                            <tr>
                                <td className="sc-rht-ldc sc-rht-td-data" colSpan="2">{t('StockCheckout.Total')}</td>
                                <td className="sc-rht-rdc" colSpan="2" style={{color:"black"}}>{currency ? currency.symbol + " " : '₹ '} 
                                {                                  formatCurrency(
                                        priceHelpFunc(
                                            cartItems.price,
                                            cartItems.taxType,
                                            cartItems.taxValue,
                                          ""
                                        )*quantity
                                      )
                                      }
                                {/* {cartItems.quantityUpdated * cartItems.price}  */}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="sc-submit-container">
                        <button onClick={e => handleLoginSubmit(e)}>{t('checkouts.PlaceOrder')}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default StockCheckoutMain;