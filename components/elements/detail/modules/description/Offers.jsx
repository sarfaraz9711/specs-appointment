import React from 'react';
import _ from "lodash"
import { useEffect } from 'react';
import { useState } from 'react';
import Slider from 'react-slick';
import { useTranslation } from '../../../../../i18n'
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { featuredApi } from '../../../../../api';
import { offerApi } from '../../../../../api/home/offerList';
import { imageUrl } from '../../../../../api/url';
import Product from '../../../products/Product';

function Offers(props, boxed) {

    const { t } = useTranslation('common');
    const [data, setData] = useState();
    
    const dispatch = useDispatch()

    
    // const Dataoffer = useSelector(s => s.collection.collections)
    // console.log("sangeet", Dataoffer)

    useEffect(() => {

        if(props.promotionProductYid){
            offerApi(props.promotionProductYid, setData);
        }
      
    }, [])
    
    const carouselStandard1 = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 50,
        slidesToShow: 3,
        slidesToScroll: 1,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };



    return (
        <>
            {
                data && 
               !_.isEmpty(data) ? <>
                    <div
                        // ${boxed === true ? 'boxed' : ''}
                        className={`ps-section--default ps-related-products 
                        ${boxed === true ? 'boxed' : ''}
                        `}>
                        <div className="ps-section__header">
                        <h5 style={{paddingTop:"20px"}}>{t('products.Offers')}</h5>
                        </div>
                        <div className="ps-section__content"> 
                            <Slider {...carouselStandard1} data infinite={data.length < 7 ? false : true}
                                className="ps-carousel" >
                                {[data]?.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <Product product={item} image={item && item.containerName !== "/" ? imageUrl + "?path=" + "" + "&name=" + item.image + "&width=300&height=200" : "/static/img/no-image.png"} />
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                </> : <>
                    {/* <div>
                        <div className="ps-section__content">
                            <p style={{ padding: "10em" }}>
                                {t("products.NoOfferFound")}
                            </p>
                        </div>
                    </div> */}
                </>
            }
        </>
    )
}

export default connect(state => state.collection)(Offers);




