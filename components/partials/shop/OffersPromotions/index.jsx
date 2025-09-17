import { useState } from 'react';
const OffersPromotions = () => {
    return (
        <div>
            <div>Offers/Promotions</div>
            <div className='d-flex'>
                <div className='card' style={{marginRight: "10px"}}>
                    <div className='offer-box card-body'>
                        <p className='card-text'> Get Free Item On Shopping Rs 5000  </p>
                    </div>

                </div>
                <div className='card'>
                    <div className='offer-box card-body'>
                        <p className='card-text'> Coupon Offers  </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OffersPromotions;