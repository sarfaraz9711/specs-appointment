import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { useEffect,useState } from 'react';
import AccountNav from '../../elements/AccountNav';
import Link from 'next/link';
import  { RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import {imageUrl} from '../../../api/url';
import  Router  from 'next/router';
import {orderExportApi} from '../../../api';
import { useTranslation } from '../../../i18n'

function OrderDetComp({orderDetailInfo}) {
    const [imgLoadId,setImgLoadId]=useState("")
    const [loadImg,setLoadImg]=useState(false)
    const { t } = useTranslation('common');
    const ProductRoute = (productSlug)=>{
        Router.push("/product/[pid]",`/product/${productSlug}`)
    }

    const getPdfData=(id)=>{
        setLoadImg(true)
        orderExportApi(id,setLoadImg)
        setImgLoadId(id)
    }

    const ReviewRoute = (orderProductId)=> {
       
        Router.push("/account/review/[rid]",`/account/review/${orderProductId}`)
    }


    return(
        <section className="cus-account-container">
            
            <div className="cus-account-subcontainer">
                <div className="cus-position-container">
                    <AccountNav keyValue={""}/>
                    <div className="cus-right-position">
                        <div className="od-container">
                            <div className="od-subcontainer">
                                <div className="od-header-container">
                                    <h2>{t('account.OrderDetails')}<p>{t('account.order')} {moment(orderDetailInfo.orderedDate).format('LL')} | Order# {orderDetailInfo.orderProductPrefixId}</p></h2>
                                    <a onClick={e=>getPdfData(orderDetailInfo.orderId)}>{loadImg&&imgLoadId===orderDetailInfo.orderProductId?<img src="/static/img/loading.gif" style={{height:"20px",width:"20px"}}/>:""} {t('account.Invoice')}</a>
                                </div>
                                <div className="od-content-container">
                                    <div className="od-shipping-add">
                                        <h3>{t('account.ShippingAddress')}</h3>
                                        <h4>{orderDetailInfo.shippingAddress1}</h4>
                                        <p>{orderDetailInfo.shippingAddress2}</p>
                                        <p>{orderDetailInfo.shippingCity}</p>
                                        <p>{orderDetailInfo.shippingPostcode}</p>
                                    </div>
                                    <div className="od-ship-container">
                                        <h3>{t('account.OrderSummary')}</h3>
                                        <p><span>{t('account.Quantity')}:</span> {orderDetailInfo.productQuantity} </p>
                                        <p><span>{t('account.BasePrice')}:</span>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.basePrice} </p>
                                        {orderDetailInfo.discountAmount && <p><span>Discount:</span> {orderDetailInfo.currencySymbolLeft}{orderDetailInfo.discountAmount} </p>}
                                        <p><span>{t('account.Tax')}:</span>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.taxValue} {orderDetailInfo.taxType === 1 ?"":"%"}</p>
                                        <p><span>{t('account.CouponDiscount')}:</span>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.couponDiscountAmount?orderDetailInfo.couponDiscountAmount : 0} </p>
                                        <p style={{fontWeight:"bold"}}><span style={{fontWeight:"bold"}}>{t('account.GrandTotal')}:</span> {orderDetailInfo.currencySymbolLeft}{orderDetailInfo.total} </p>
                                    </div>
                                </div>
                                <div className="od-product-container">
                                    <div className="od-product-subcontainer">
                                        <div className="od-main-container">
                                            <div className="od-det-sdfd">
                                            <div className="od-pro-img-container">
                                                <img src={imageUrl+"?path="+orderDetailInfo.containerName+"&name="+orderDetailInfo.productImage+"&width=400&height=200"}/>
                                            </div>
                                            <div className="od-product-det-main">
                                                <h3> {orderDetailInfo.productName}</h3>
                                                <p></p>
                                                <h4>{orderDetailInfo.currencySymbolLeft} {orderDetailInfo.productPrice} </h4>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="od-main-right-container">
                                            <button onClick={e=>ProductRoute(orderDetailInfo.productSlug)}> {t('account.BuyItAgain')} <RightOutlined style={{fontSize: "12px",paddingLeft:"10px"}}/></button>
                                            <button onClick={e=>ReviewRoute(orderDetailInfo.orderProductId)}> {t('account.ReviewthisProduct')} <RightOutlined style={{fontSize: "12px",paddingLeft:"10px"}}/></button>
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

export default OrderDetComp