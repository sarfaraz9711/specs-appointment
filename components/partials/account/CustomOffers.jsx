import React, { Component } from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AccountNav from '../../elements/AccountNav';
import { MoreOutlined } from '@ant-design/icons';
// import {addressListApi, delAddressApi} from '../../../api';
import { editDetail } from '../../../store/setting/action';
import Head from 'next/head'
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { notifyOfferApi, getUsernotify, updateNotifyUser, getActiveOffers } from '../../../api/account/notify';
import OfferCard from '../../shared/OfferCard';
import FreeProductOfferCard from '../../shared/FreeProductOfferCard'


function NewOffers() {
    const [addressData, setAddressData] = useState()
    const [delStatus, setDelStatus] = useState(0)
    const [addressLoader, setAddressLoader] = useState(true)
    const [mousehowedit, setmousehowedit] = useState(true)
    const [notifyArray, setNotifyArray] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [data, setData] = useState()
    const [activCartValuePercentOffers, setActivCartValuePercentOffers] = useState([]);
    const [activCartValueFreeProdsOffers, setActivCartValueFreeProdsOffers] = useState([]);
    const [activFreeProdPromoOffers, setActivFreeProdPromoOffers] = useState([]);
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




    useEffect(() => {

        const notifyData = async () => {
            let myres = await getUsernotify()
            console.log(myres, "avbcdd")
            setData(myres?.data);
            if (myres?.data?.status == 1) {
                setIsChecked(true);
            } else {
                setIsChecked(false)
            }

        }
        notifyData()
        getActiveOffers(setActivCartValuePercentOffers, setActivCartValueFreeProdsOffers, setActivFreeProdPromoOffers);
    }, [])

    const handleClicked = (e) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            setNotifyArray([...notifyArray, e.target.value])
            if (e.target.value == "notify") {
                setIsChecked(true);
                if (data?.Id) {
                    console.log(data?.Id, "buhvj")
                    updateNotifyUser(data?.Id, 1)
                } else {
                    notifyOfferApi(1)
                }
            }
        } else {
            const findIndex = notifyArray.indexOf(e.target.value)
            notifyArray.splice(findIndex, 1)
            if (e.target.value == "notify") {
                setIsChecked(false);
                if (data?.Id) {
                    updateNotifyUser(data?.Id, 0)
                }
            }
        }
    }



    return (
        <section className="cus-account-container">
            <div className="cus-account-subcontainer">
                <Head>
                    <title>Offer</title>
                </Head>
                <div className="cus-position-container">
                    <AccountNav keyValue={7} />
                    <div className="cus-right-position">
                        <div className="adr-subcontainer">
                            <div className="adr-main-contain">

                                {/* <button onClick={e=>Router.push('/account/addaddress')}>+ ADD NEW ADDRESS</button> */}

                                <div>
                                    {/* <label>Notification if offers</label><br/> */}
                                    <p style={{color: "black"}}>PLEASE CLICK ON CHECKBOX FOR NOTIFICATION IF ANY OFFER AVAILABLE :</p>
                                    <input name='customer_id' type="hidden" />
                                    <input
                                        type="checkbox"
                                        name='notify'
                                        value="notify"
                                        onChange={handleClicked}
                                        checked={isChecked}

                                    />
                                    <label for="notify">Notify me if any offers Available</label>
                                </div>
                                <div className='row mt-3 pl-4 pr-4 active-promo-offers'>
                                    {activCartValuePercentOffers && activCartValuePercentOffers.map((offerItem) => {
                                        return <OfferCard offerItem={offerItem} />
                                    })

                                    }
                                    {activCartValueFreeProdsOffers && activCartValueFreeProdsOffers.map((offerItem) => {
                                        return <OfferCard offerItem={offerItem} />
                                    })

                                    }

{activFreeProdPromoOffers && activFreeProdPromoOffers.map((offerItem) => {
                                        return <FreeProductOfferCard offerItem={offerItem} />
                                    })

                                    }

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

export default NewOffers