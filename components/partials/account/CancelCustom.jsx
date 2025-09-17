import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useEffect, useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import { imageUrl } from '../../../api/url';
import Link from 'next/link';
import Select from 'react-select';
import { CancelRequestApi } from '../../../api';
import moment from 'moment';
import Router from 'next/router';
import { useTranslation } from '../../../i18n'
function CancelCustomComp({ orderDetailInfo, cancelReason, orderProductId }) {
    const [selectValue, setSelectValue] = useState("")
    const [desc, setDesc] = useState("")
    const [descError, setDescError] = useState("")
    const [selectError, setSelectError] = useState("")
    const [submit, setSubmit] = useState(0)
    const { t } = useTranslation('common');

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        setSubmit(1)
        if (selectValue !== "" && desc !== "") {
            CancelRequestApi(orderProductId, desc, selectValue, setDesc, setSelectError, setDescError, setSubmit, setSelectValue, Router)
        }
        else {
            if (desc === "") {
                setDescError("*Description is required")
            }
            if (selectValue === "") {
                setSelectError("*Reason is required")
            }
        }
    }
   

    return (
        <section className="cus-account-container">
            <div className="cus-account-subcontainer">
                <div className="cus-position-container">
                    <AccountNav keyValue={""} />
                    <div className="cus-right-position">
                        <div className="ch-container">
                            <div className="ch-header-contain">
                                <h3>{t('CancelHistory.CancelHistory')}</h3>
                            </div>
                            <div className="ch-main-detail">
                                <div className="ch-id-header">
                                    <div className="ch-order-id"><p>{t('account.OrderId#')} {orderDetailInfo.orderProductPrefixId}</p></div>
                                    <div className="ch-order-id"><p>{t('account.OrderDate')} : {moment(orderDetailInfo.orderedDate).format('LL')}</p></div>
                                </div>
                                <div className="ch-product-container">
                                    <div className="ch-product-subcontainer">
                                        <div className="ch-main-container">
                                            <div className="ch-img-container">
                                                <img src={imageUrl + "?path=" + orderDetailInfo.containerName + "&name=" + orderDetailInfo.productImage + "&width=400&height=200"} />
                                            </div>
                                            <div className="ch-prodet-container">
                                                <div className="ch-prodet-subcontainer">
                                                    <h3><a>{orderDetailInfo.productName}</a></h3>
                                                    <div className="ch-price-quantity">
                                                        <p>{t('account.Quantity')} :{orderDetailInfo.productQuantity}</p>
                                                        <h4> {orderDetailInfo.currencySymbolLeft} {orderDetailInfo.productPrice}</h4>
                                                    </div>
                                                    <div className="ch-reason-container">
                                                        <div className="ch-reason-subcontainer">
                                                            <p>{t('CancelHistory.why')} ?</p>
                                                            <div className="ch-reason-select">
                                                                <select className="select-css" onChange={e => { setSelectValue(e.target.value), setSelectError("") }} value={selectValue} style={{border:submit === 1 && selectError !== "" && "1px solid red" }}>
                                                                    <span></span>
                                                                    <option value="" selected>{t('CancelHistory.Selectreason')}</option>
                                                                    {cancelReason && cancelReason.map((reason) => {
                                                                        return (
                                                                            <option value={reason.id} key={reason.id}>{reason.reason}</option>
                                                                        )
                                                                    })}

                                                                </select>
                                                                {submit === 1 && selectError !== "" && <div className="span-error-custom-cancel"><span>{selectError}</span></div>}

                                                                {/* <Select
                                                                    placeholder="Select Reason"
                                                                    // onChange={e=>{setCountryId(e.value);setCountryName(e.label);zoneCreate(e.value)}}
                                                                    isSearchable={true}
                                                                    // options={arrayComp}
                                                                    // styles={colourStyles}
                                                                    /> */}
                                                            </div>
                                                        </div>
                                                        <div className="ch-reason-subcontainer">
                                                            <p>{t('CancelHistory.cancelorder')}</p>
                                                            <div className="ch-reason-main-container">
                                                                <textarea placeholder={t('CancelHistory.cancelorder')} value={desc} onChange={e => { setDesc(e.target.value), setDescError("") }} style={{border:submit === 1 && descError !== "" && "1px solid red"}}/>
                                                                {submit === 1 && descError !== "" && <div className="span-error-custom-cancel"><span>{descError}</span></div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ch-cancel-note">
                                                        <p><span>{t('CancelHistory.Note')}</span>{t('CancelHistory.rules')} </p>
                                                        <button onClick={e => handleCancelSubmit(e)}><span>{t('ReportAbuse.submit')}</span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CancelCustomComp;