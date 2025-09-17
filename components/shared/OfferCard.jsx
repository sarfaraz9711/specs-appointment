import React, { useState, useEffect } from 'react';
import moment from "moment";
import Link from 'next/link'
const OfferCard = ({offerItem}) => {

    const dateObj = new Date(offerItem.endDate);
    const expireDate = `${('0' + dateObj.getDate()).slice(-2)}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${dateObj.getFullYear()}`;
    return (


        <div className='col-md-4 mb-5'>
            <div className={`coupon`}>
                {/* <h3 className='offer-heading'><img src='/static/img/red-chief-logo.png' /></h3> */}
                <div className="offer-body pl-3 pr-3">
                    {offerItem.discountValue?
                   <div><p className='offer-amount'>{offerItem.discountValue} %</p><h2 className='heading pt-3'>  OFF ON ORDER AMOUNT BETWEEN</h2><span className='offer-range'>Rs {offerItem.minCartTotalAmount} - {offerItem.maxCartTotalAmount}</span></div> :
                   <div><h2 className='heading pt-3'> GET FREE PRODUCT</h2> <p className='free-product'><Link href={`/product/${offerItem.freeProducts[0].productSlug}`}>{offerItem.freeProducts[0].productName}</Link> </p> <h2>ON ORDER AMOUNT BETWEEN</h2><span className='offer-range'>Rs {offerItem.minCartTotalAmount} - {offerItem.maxCartTotalAmount}</span></div>
                    }
                </div>
                <div className="offeer-exp pl-3 pr-3">
                    
                    {/* <p className="expire">Expires: {moment(data.endDate).format("DD/MM/YYYY, hh:mm A")}</p> */}
                    <p className="expire">Expires: {expireDate}</p>
                </div>
            </div>
        </div>


    );
}

export default OfferCard;
