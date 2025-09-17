import React from 'react';
//import {ConnectPlugin}   from "../../../connectPlugins";
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import { imageUrl } from '../../../../api/url';
import {useTranslation} from 'react-i18next';
import Product from '../../../elements/products/Product';
import NextArrow from '../../../../components/elements/carousel/NextArrow';
import PrevArrow from '../../../../components/elements/carousel/PrevArrow';
import { promotionFlagData } from '../../../../utilities/common-helpers';

function HomeDefaultDealOfDay({collections,collectionSlug,data}){


   
// class HomeDefaultDealOfDay extends Component {
    // constructor(props) {
    //     super(props);
    // }
    // render() {
        // const { collections, collectionSlug } = this.props;
        const carouselFullwidth = {

            dots: false,
            infinite: false,
            className:"center",
            speed: 50,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 200,
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
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: true
        
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: false,
                        arrows: true
        
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false,
                        arrows: true,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        dots: false,
                        arrows: true,
                    },
                },
            ],
          
           
        };
        
        const {t} = useTranslation('common');
        const products =getColletionBySlug(collections, collectionSlug);
        return (
            <div className="ps-product-list ps-garden-kitchen0">
           
                <div className="ps-container">
                    
                    <div className="ps-section__content" style={{justifyContent:"space-between",display:"flex"}}>
                    <div className="today-deal-style"><span>{t('todaydeals')}</span></div>
                        <Slider
                        // style={{display: "flex",flexDirection: "column"}}
                        {...carouselFullwidth}
                            
                            className="ps-carousel outside today-slider carouselwidth">
                            {data&&data.map(product => (
                               <div className="item" key={product.productId}>
                               {product.promotionFlag == 1 &&
                                <div className="promotion-text">
                                {promotionFlagData(product.promotionType)}</div>
                                }
                            <Product product={product} image={product.image&&product.image.containerName!=="/"? imageUrl+"?path="+product.containerName+"&name="+product.image+"&width=260&height=260": "/static/img/no-image.png"}/>
                           </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        );
        
    
}

export default connect(state => state.collection)(HomeDefaultDealOfDay);

HomeDefaultDealOfDay.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});
