import React from 'react';
//import {ConnectPlugin}   from "../../../connectPlugins";
import { connect } from 'react-redux';
import Slider from 'react-slick';
import Product from '../../../elements/products/Product';
import { getColletionBySlug } from '../../../../utilities/product-helper';
// import { carouselFullwidth } from '../../../../utilities/carousel-helpers';
import { imageUrl } from '../../../../api/url';
import { useTranslation } from 'react-i18next';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import { promotionFlagData } from '../../../../utilities/common-helpers';


function ConsumerElectronics({ collections, collectionSlug, data }) {

    const { t } = useTranslation('common');
    const carouselFullwidth = {
        dots: false,
        infinite: false,
        speed: 50,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        lazyload: true,
        responsive: [
            {
                breakpoint: 1750,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: false,

                },
            },

            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: true,
                    infinite: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                    infinite: false,

                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false,
                    arrows: false,
                    infinite: false,

                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                    arrows: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: false,
                    dots: false,
                    arrows: true,
                },
            },
        ],
    };


    const products = getColletionBySlug(collections, collectionSlug);

    return (
        <div className="ps-product-list ps-garden-kitchen">
            <div className="ps-container" style={{ display: "flex", alignItems: "center", maxWidth: "1650px", margin: "0 auto" }}>
                <div className='pscontent-fll' style={{ display: "inline", width: "calc(100% - 254px)", marginRight: "10px" }}>

                    <div className="ps-section__header">
                        <h3>{t('featured')}</h3>

                    </div>

                    <div className="ps-section__content pscontentarrow">

                        <Slider
                            {...carouselFullwidth}
                            className="ps-carousel outside">
                            {data && data.map(product => (
                                <div className="item" key={product.productId}>
                                {product.promotionFlag == 1 &&
                                    <div className="promotion-text">
                                    {promotionFlagData(product.promotionType)}</div>
                                }  
                                    <Product product={product} image={product.image && product.image.containerName !== "/" ? imageUrl + "?path=" + product.containerName + "&name=" + product.image + "&width=400&height=200" : "/static/img/no-image.png"} />
                                </div>
                            ))}
                        </Slider>

                    </div>
                </div>
                <div className="add-home" style={{ width: "264px" }}>
                    <img src="/static/img/homeadd1.jpg" alt="" />
                </div>
            </div>

        </div>
    );

}

export default connect(state => state.collection)(ConsumerElectronics);
