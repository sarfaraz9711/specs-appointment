import React from 'react';

import { useEffect,useState } from 'react';

import moment from 'moment';
import Head from 'next/head'
import { useTranslation } from '../../../i18n';
import AccountNav from '../../elements/AccountNav';
import { quotationListApi } from '../../../api/product/quotationReqApi';
function SpurtQuotationList() {
    const [quotationData,setQuotationData] = useState([])
    const [quotationLoader,setQuotationLoader] = useState(false)
    const { t } = useTranslation('common');
    useEffect(()=>{
        setQuotationLoader(true)
        quotationListApi(setQuotationData,setQuotationLoader)
    },[])

    return(
        <section className="cus-account-container">
        <div className="cus-account-subcontainer">
        <Head>
                <title>Quotation List</title>
            </Head>
            <div className="cus-position-container">
                <AccountNav keyValue={5}/>
                <div className="cus-right-position">
                    {quotationLoader?<div className="ps-block__content">
                        <center><img src="/static/img/spurt-original-loader.gif" style={{width:"80px",height:"80px"}}/></center>
                        </div>:
                        <div className="qr-container">
                        <div className="qr-header-container">
                            <div className="qr-header">{t('vendorDetail.Products')}</div>
                            <div className="qr-header">{t('account.CreatedDate')}</div>
                            <div className="qr-header">{t('products.Quantity')}</div>
                            <div className="qr-header">{t('RequestQuote.QuantityUnit')}</div>
                            <div className="qr-header">{t('account.OrderTotalValue')}</div>
                        </div>
                        {quotationData && quotationData.map((quotation)=>(
                            <div className="qr-body-container">
                            <div className="qr-body-separate">{quotation.name}</div>
                            <div className="qr-body-separate">{moment(quotation.createdDate).format('DD/MM/YYYY')}</div>
                            <div className="qr-body-separate">{quotation.quantity}</div>
                            <div className="qr-body-separate">{quotation.quantityUnit}</div>
                            <div className="qr-body-separate">{quotation.orderValue}</div>
                        </div>
                        ))}
                    </div>}
                </div>
            </div>
            </div>
        </section>
    )
}
export default SpurtQuotationList