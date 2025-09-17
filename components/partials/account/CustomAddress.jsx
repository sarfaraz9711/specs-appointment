import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import  Router  from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import { MoreOutlined } from '@ant-design/icons';
import {addressListApi, delAddressApi} from '../../../api';
import {editDetail} from '../../../store/setting/action';
import Head from 'next/head'
function AddressNewComp() {
    const [addressData,setAddressData]=useState()
    const [delStatus,setDelStatus]=useState(0)
    const [addressLoader,setAddressLoader]=useState(true)
    const [mousehowedit,setmousehowedit]=useState(true)
    const dispatch=useDispatch()

    useEffect(()=>{
        setDelStatus(0)
        addressList()
    },[delStatus])

    const addressList=()=>{
        setAddressLoader(true)
        addressListApi(setAddressData,setAddressLoader)
    }

    const deleteAddress=(id)=>{
        setmousehowedit(false)
        delAddressApi(id,setDelStatus)
    }

    const editAddess = (detail) =>{
        console.log("edit address<<<<<<<<<<<<<<",detail);
        dispatch(editDetail(detail));
        Router.push('/account/addaddresses_edit/[eaid]',`/account/addaddresses_edit/${detail.addressId}`)
    }

    const  mouseOverFunc=()=>{
        setmousehowedit(true)
      
           }

    return(
        <section className="cus-account-container">
        <div className="cus-account-subcontainer">
        <Head>
                <title>Address</title>
            </Head>
            <div className="cus-position-container">
                <AccountNav keyValue={3}/>
                <div className="cus-right-position">
                    <div className="adr-subcontainer">
                        <div className="adr-main-contain">
                            <div className='account-heading'> Address</div>
                            <div className='text-right'>
                            <button onClick={e=>Router.push('/account/addaddress')}>+ ADD NEW ADDRESS</button>
                            </div>
                            <div className="adr-list-container">
                                {addressData && addressData.map((data,index)=>(
                                    <div className="adr-card-container" key={index}>
                                        <h4>
                                            <span className="homeorwork">{data.addressType=== 1? "Home":"Work"}</span>
                                        </h4>
                                        <div className="adr-card-content">
                                            <h4> {data.company} 
                                                <div className="adr-card-more-btn">
                                                <MoreOutlined onMouseOver={e=>mouseOverFunc()} style={{fontSize: "24px"}}/>
                                                <div className="adr-edit-delete">
                                                    {mousehowedit&& <ul>
                                                        <li className="adr-ed-list" onClick={e=>editAddess(data)}>Edit</li>
                                                        <li className="adr-ed-list" onClick={e =>deleteAddress(data.addressId)}>Delete</li>
                                                    </ul>
                                                    }
                                                   
                                                </div>
                                                </div></h4>
                                            <p> {data.address1}, {data.city}, {data.address2}, {data.state} : {data.postcode}, {data.phoneNo} {data.phoneNoAlter?',':''} {data.phoneNoAlter}</p>
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

export default AddressNewComp