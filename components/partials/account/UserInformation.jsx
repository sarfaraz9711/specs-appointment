import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { editProfileApi } from '../../../api';
import  Router  from 'next/router';
import { EmailValidator } from '../../helper/emailValidator';
import { changePasswordApi } from '../../../api';
import { imageUrl } from '../../../api/url';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../store/auth/action';
import { useTranslation } from '../../../i18n'

import Head from 'next/head'

import AccountNav from '../../elements/AccountNav';

function UserInformation(){
    const [userDetail,setUserDetail]=useState("")
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [email,setEmail]=useState("")
    const [num,setNum]=useState("")
    const [mailValid,setMailValid]=useState("")
    const [submit,setSubmit]=useState(0)
    const [fnameError,setFnameError]=useState("")
    const [numError,setNumError]=useState("")
    const [oldPass,setOldPass]=useState("")
    const [newPass,setNewPass]=useState("")
    const [newPassError,setNewPassError]=useState("")
    const [oldPassError,setOldPassError]=useState("")
    const [passSubmit,setPassSubmit]=useState(0)
    const [newDp,setNewDp]=useState("")
    const [buttonLoader,setButtonLoader]=useState(false)
    const [passButtonLoader,setPassButtonLoader]=useState(false)
    const dispatch=useDispatch()
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)

    




    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setUserDetail(JSON.parse(localStorage.getItem("spurtUser"))) 
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName)
            setEmail(JSON.parse(localStorage.getItem("spurtUser")).email)
            setNum(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber)

        }
        
    },[])

    const onChangeHandler=(name,value)=>{
        
        // switch (name) {
            //login form validators
            if(name==='fname')
                {
                    if(value===""){
                        setFnameError("*first name is required")
                        setFname(value) 

                    }
                    else{
                      setFname(value) 
                      setFnameError("")
                    }
                }

            if(name==='lname')
                {
                    setLname(value)
                }
            if(name==='num')
                {
                    setNum(value)
                    setNumError("")
                } 
            if(name==='email')
                {
                    if(EmailValidator(value)){
                        setEmail(value)
                        setMailValid("")

                        
                    }
                    else{ 
                        setEmail(value)
                        setMailValid("*Please enter a valid email")
                    }
                }
}

    const handleLoginSubmit=()=>{
        setSubmit(1)
        if(fname===""||email===""||num===""){
            if(fname===""){
                setFnameError("*"+t('fname-req'))
            }
            if(num===""){
                setNumError("*"+t('phone-req'))
            }
        }
        else{
            setButtonLoader(true)
            editProfileApi(fname,lname!==undefined?lname:"",email,num,Router,newDp,setButtonLoader)
        }
        

    }

    const changeHandlerPassword=(name,value)=>{
        if(name==="oldPass"){
            if(value===""){
                setOldPassError("*Current password is required")
                setOldPass(value)
            }
            else{
                setOldPass(value)
                setOldPassError("")
            }
        }
        if(name==="newPass"){
            if(value===""){
                setNewPassError("*New password is required")
                setNewPass(value)

            }
            else{
                setNewPass(value)
                setNewPassError("")
            }
        }
    }

    const handlePassSubmit=()=>{
        setPassSubmit(1)
        if(newPass===""||newPass.length<5||oldPass===""||oldPass.length<5){
            if(newPass===""){
                setNewPassError("*New password is required")
            }
            if(newPass.length<5){
                setNewPassError("*Minimum 5 characters is required")
            }
            if(oldPass===""){
                setOldPassError("*Current password is required")
            }
            if(oldPass.length<5){
                setOldPassError("*Minimum 5 characters is required")
            }
        }
        else{
            setPassButtonLoader(true)
            changePasswordApi(oldPass,newPass,setPassButtonLoader)
        }
    } 

    const changeDP = (e) => {
		// setImageUrl(URL.createObjectURL(e.target.files[0]))
        const { files } = e.target;
        let reader = new FileReader()
		reader.readAsDataURL(files[0])
		
        reader.onloadend = () => setNewDp(reader.result)

    }

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear()
        dispatch(logOut())
        Router.push("/account/login")
    }

        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
                active: true,
            },
            {
                text: 'My Order',
                url: '/account/orders',
                icon: 'icon-bag2',
            },
            
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
            },
           
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];
        return (
            <section className="cus-account-container">
                <div className="cus-account-subcontainer">
                <Head>
                <title>Dashboard</title>
            </Head>
                    <div className="cus-position-container">
                        <AccountNav keyValue={1}/>
                        {/* <div className="cus-left-position">
                            <div className="cus-left-subcontainer">
                                <Menu>
                                    <Menu.Item key="1" icon={<AppstoreFilled style={{color:"#2874f0",fontSize:"18px"}}/>}  style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}}>Account Dashboard</Menu.Item>
                                    <Menu.Item key="2" icon={<InfoCircleFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}}>Account Information</Menu.Item>
                                    <Menu.Item key="3" icon={<EnvironmentFilled style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}}>Address</Menu.Item>
                                    <Menu.Item key="4" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}}>Order History</Menu.Item>
                                    <Menu.Item key="5" icon={<ShoppingCartOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}}>Quotation Request List</Menu.Item>
                                    <Menu.Item key="6" icon={<PoweroffOutlined style={{color:"#2874f0",fontSize:"18px"}}/>} style={{margin:"0",borderBottom:"solid thin #f2f2f2",color:"#212121",fontSize:"12px"}}>Logout</Menu.Item>
                                </Menu>
                            </div>
                        </div> */}
                        <div className="cus-right-position">
                            <div className="cus-right-subcontainer">
                                <div className='account-heading'>{t('account.Dashboard')}</div>
                                <div className="cus-parent-card-container">
                                    <div className="col-lg-12 col-md-10 col-sm-10">
                                    <p>Hello <b>{fname}</b> From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information. </p>
                                    </div>
                                    {/* <div className="col-lg-12 col-md-10 col-sm-10"> */}
                                    <div className="cus-card-row">
                                        <div className="cus-card-account-row">
                                        <div className="cus-r-dash-re">
                                            <div className="cus-header-contain">
                                                <h3>{t('account.AccountInformation')}</h3>
                                                <Link href="/account/information"><a><img src="/static/img/edit.svg"/></a></Link>
                                            </div>
                                            <div className="cus-body-contain">
                                                <div className="cus-body-img">
                                                    <img src={userDetail&& userDetail.avatar?imageUrl+"?path="+userDetail.avatarPath+"&name="+userDetail.avatar+"&width=500&height=500" :"/static/img/user.jpg"}/>
                                                </div>
                                                <div className="cus-body-detail">
                                                    <p>{fname}</p>
                                                    <p>{email}</p>
                                                    <p><Link href="/account/information"><a>{t('account.ChangePassword')}</a></Link></p>
                                                </div>
                                            </div>
                                    </div>
                                        </div>
                                    <div className="cus-card-account-row">
                                        <div className="cus-r-dash-re">
                                            <div className="cus-header-contain">
                                                <h3>{t('account.Addresses')}</h3>
                                                <Link href="/account/addresses"><a><img src="/static/img/edit.svg"/></a></Link>
                                            </div>
                                            {/* <div className="cus-body-contain"> */}
                                                <div className="cus-body-contain-left">
                                                    <button className="cus-button-ship-bill btn btn-primary" onClick={e=>Router.push('/account/addaddress')}>
                                                        <img src="/static/img/delivery-truck.svg"/>{t('account.BillingAddress')}
                                                    </button>
                                                    <button className="cus-button-ship-bill btn btn-primary" onClick={e=>Router.push('/account/addaddress')}>
                                                        <img src="/static/img/delivery-truck.svg"/>{t('account.ShippingAddress')}
                                                    </button>
                                                </div>
                                            {/* </div> */}
                                            

                                        </div>
                                    </div>
                                    </div>
                                {/* </div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>                
            </section>
        );
    // }
}

export default (UserInformation)
