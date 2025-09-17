import React, { useState, useEffect } from 'react';
import moment from "moment";
import Link from 'next/link'
const FreeProductOfferCard = ({ offerItem }) => {

    console.log("loader props<<<<<<<<<<*******", offerItem);
    const typeMapping = {
        "buy_x_and_get_x_free": 'Buy one get one free',
        "buy_x_and_get_y_free": 'Buy one get one free',
        "buy_2x_and_get_x_free": 'Buy two get one free',
        "buy_2x_and_get_y_free": 'Buy two get one free',
        "buy_2x_and_get_2x_free": 'Buy two get two free',
        "buy_2x_and_get_2y_free": 'Buy two get two free',
        "buy_x_and_get_x_percent": 'Buy two and get discount on one product',
        "buy_x_and_get_y_percent": 'Buy two and get discount on one product',
        "buy_2x_and_get_x_percent": 'Buy Three and get discount on one Product',
        "buy_2x_and_get_y_percent": 'Buy Three and get discount on one Product',
        "buy_4x_and_get_x_percent": 'Buy four get discount on cart',
        "buy_4x_and_get_x_amount": 'Buy four get discount on cart',
        "buy_4_any_and_get_x_percent": 'Buy four get discount on cart',
        "buy_4_any_and_get_x_amount": 'Buy four get discount on cart'
    }
    
    let offerType = typeMapping[offerItem.free_promotion_type];
    const dateObj = new Date(offerItem.end_date);
    const expireDate = `${('0' + dateObj.getDate()).slice(-2)}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${dateObj.getFullYear()}`;
    return (


        <div className='col-md-4 mb-5'>
            <div className={`coupon`}>
                {/* <h3 className='offer-heading'><img src='/static/img/red-chief-logo.png' /></h3> */}
                <div className="offer-body pl-3 pr-3">

                    <h2 className='heading pt-3'>{offerType}</h2>
                    <p className='buy-product'>Buy <Link href={`/product/${offerItem.buy_prod_slug}`}>{offerItem.buy_product_name}</Link></p>
                    {/* {offerItem.promotion_percentage_discount != null ?
                        <div>dddd</div> 
                        : <div><p>get</p><Link href={`/product/${offerItem.get_prod_slug}`}>{offerItem.product_name}</Link> free</div>
                    } */}

                    {(() => {
                        if(offerItem.promotion_percentage_discount != null){
                            return <div><p>GET</p><Link href={`/product/${offerItem.get_prod_slug}`}>{offerItem.product_name}</Link> at Rs {offerItem.promotion_discount_Amount} discount</div>
                        }else{

                            return <div><p>GET</p><Link href={`/product/${offerItem.get_prod_slug}`}>{offerItem.product_name}</Link> free</div>
                            if(offerItem.free_promotion_type){

                            }
                        }
                    })()}

                </div>
                <div className="offeer-exp pl-3 pr-3">

                    {/* <p className="expire">Expires: {moment(data.endDate).format("DD/MM/YYYY, hh:mm A")}</p> */}
                    <p className="expire">Expires: {expireDate}</p>
                </div>
            </div>
        </div>


    );
}

export default FreeProductOfferCard;
