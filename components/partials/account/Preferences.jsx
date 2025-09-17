import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import { MoreOutlined } from '@ant-design/icons';
import { editDetail } from '../../../store/setting/action';
import Head from 'next/head'
import { Button, message } from 'antd'
import { getUserPreferences, UpdateUserPreferences, UserPreferencesApi, userPreferencesApi } from '../../../api/account/preferences';;


function MyPreferences() {
    const [addressData, setAddressData] = useState()
    const [delStatus, setDelStatus] = useState(0)
    const [addressLoader, setAddressLoader] = useState(true)
    const [mousehowedit, setmousehowedit] = useState(true)
    const [email, setEmail] = useState("email");
    const [mobile, setMobile] = useState("mobile");
    const [customerId, setCustomerId] = useState("")
    const [preferences, setPreference] = useState(null)
    const [preferenceArray, setPreferenceArray] = useState([])
    const [isEmail, setIsEmail] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isNew, setIsNew] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [getPrefId, setPrefId]=useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setDelStatus(0)
        addressList()
    }, [delStatus])

    const addressList = () => {
        setAddressLoader(true)
        // addressListApi(setAddressData,setAddressLoader)
    }

    const deleteAddress = (id) => {
        setmousehowedit(false)
        delAddressApi(id, setDelStatus)
    }

    const editAddess = (detail) => {

        dispatch(editDetail(detail));
        Router.push('/account/addaddresses_edit/[eaid]', `/account/addaddresses_edit/${detail.addressId}`)
    }

    const mouseOverFunc = () => {
        setmousehowedit(true)

    }


    // useEffect( async ()=> {
    //     if(localStorage.getItem("spurtUser")){

    //         const data = {
    //             customerPreferenceId: JSON.parse(localStorage.getItem("spurtUser")).id
    //            }
    //            const getData = await getUserPreferences(data)
    //            const valueCheck = getData.CustomerPreference_customer_preference.split(",")
    //            if(valueCheck.includes("mobile")){
    //             setIsEmail(true)
    //            }
    //            if(valueCheck.includes("email")){
    //             setIsMobile(true)
    //            } 
    //            setCustomerId(getData)
    //     }
    // })

    const preferencesData = async () => {
        if (localStorage.getItem("spurtUser")) {
            const data = {
                "customerId": JSON.parse(localStorage.getItem("spurtUser")).id
            }
            setCustomerId(data.customerId)
            const getData = await getUserPreferences(data)
            if(getData?.status === 1){
                setIsNew(true)
                setPreferenceArray([getData.data?.customer_preference])
                console.log(preferenceArray, getData.data?.customer_preference, "fgcfchfc")
                setPrefId(getData.data?.id)
                console.log(getPrefId, "GETDATA")
            const valueCheck = getData.data?.customer_preference.split(',')
                console.log(valueCheck, "valueCheck")
            if (valueCheck?.includes("mobile" )) {
                setIsMobile(true)
            }
            if (valueCheck?.includes("email")) {
                setIsEmail(true)
            }
            if (valueCheck?.includes("phone")) {
                setIsPhone(true)
            }
        }

        }
    }
    useEffect(() => {
       preferencesData()
    }, [])

    function handleChecked(e) {
        console.log(e.target.checked, "ghh")
        if (e.target.checked) {
            setPreferenceArray([...preferenceArray, e.target.value])
            if (e.target.value=="mobile") {
                setIsMobile(true)
            }
            if (e.target.value=="email") {
                setIsEmail(true)
            }
            if(e.target.value=="phone"){
                setIsPhone(true)
            }
        } else {
            const findIndex = preferenceArray.indexOf(e.target.value);
            preferenceArray.splice(findIndex, 1);
            setPreferenceArray(preferenceArray)
            console.log(preferenceArray)
            if (e.target.value=="mobile") {
                setIsMobile(false)
            }
            if (e.target.value=="email") {
                setIsEmail(false)
            }
            if(e.target.value=="phone"){
                setIsPhone(false)
            }
        }
    }

    const success = () => {
        if(isNew){
            const items = {
                "Id":getPrefId,
                "customer_preference": preferenceArray.toString(),                
                "status": (isEmail || isMobile || isPhone) ? 1 : 0
            };
            UpdateUserPreferences(items)
            message.success("Update Sucessfully")
            console.log(items, "ghjgjjh")
            
        }
        else {
            const item = {
                "customer_id": customerId,
                "customer_preference": preferenceArray.toString(),
                "status": (isEmail || isMobile || isPhone) ? 1 : 0
            };
            
            UserPreferencesApi(item)
            message.success('Saved Sucessfully');
            console.log(item, "chjbvd")
        }
       
        
    }

    // const success = () => {
    //         const item = {
    //             "customer_id": customerId,
    //             "customer_preference": preferenceArray.toString()
    //         };
    //         UserPreferencesApi(item).then(res => {
    //             if(res.status == 1){
    //                 message.success('Saved Sucessfully'); 
    //             }
    //         })
               
    // }


    return (
        <section className="cus-account-container">
            <div className="cus-account-subcontainer">
                <Head>
                    <title>Preferences</title>
                </Head>
                <div className="cus-position-container">
                    <AccountNav keyValue={6} />
                    <div className="cus-right-position">
                        <div className="adr-subcontainer">
                            <div className="adr-main-contain">

                                {/* <button onClick={e=>Router.push('/account/addaddress')}>+ ADD NEW ADDRESS</button> */}
                                <div className='preferencesBox'>
                                    <p className='adr-main-head'>Please select your preferences for notification:</p>
                                    <div className='row adr-content' >
                                      <div className='col-md-4'>
                                      <input name='customer_id' value={customerId} type="hidden" />
                                      <input
                                        type="checkbox"
                                        name='email'
                                        value="email"
                                        // onChange={e=>setEmail(e.target.value)}
                                        onChange={handleChecked}
                                        checked={isEmail}

                                    />
                                    <i className="fa fa-envelope-o"/>
                                    <label for="email">Email</label>
                                      </div>
                                    
                                   <div className='col-md-4'>
                                   <input
                                        type="checkbox"
                                        name='mobile'
                                        value="mobile"
                                        onChange={handleChecked}
                                        checked={isMobile}
                                    />
                                    <i className="fa fa-comments-o"/>
                                    <label for="mobile"> SMS </label>
                                   </div>
                                   <div className='col-md-4'>
                                   <input
                                        type="checkbox"
                                        name='phone'
                                        value="phone"
                                        onChange={handleChecked}
                                        checked={isPhone}
                                    />
                                    <i className="fa fa-whatsapp"/>
                                    <label for="phone"> WhatsApp </label>
                                   </div>
                                   </div>

                                    <button className='btn btn-primary account-prebtn' onClick={success}>Save</button>
                                </div>
                                <div className="adr-list-container">
                                    {addressData && addressData.map((data, index) => (
                                        <div className="adr-card-container" key={index}>
                                            <h4>
                                                <span className="homeorwork">{data.addressType === 1 ? "Home" : "Work"}</span>
                                            </h4>
                                            <div className="adr-card-content">
                                                <h4> {data.company}
                                                    <div className="adr-card-more-btn">
                                                        <MoreOutlined onMouseOver={e => mouseOverFunc()} style={{ fontSize: "24px" }} />
                                                        <div className="adr-edit-delete">
                                                            {mousehowedit && <ul>
                                                                <li className="adr-ed-list" onClick={e => editAddess(data)}>Edit</li>
                                                                <li className="adr-ed-list" onClick={e => deleteAddress(data.addressId)}>Delete</li>
                                                            </ul>
                                                            }

                                                        </div>
                                                    </div></h4>
                                                <p> {data.address1},{data.address2}, {data.state} : {data.postcode}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyPreferences