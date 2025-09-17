import React, { Component } from 'react';
//import {ConnectPlugin}   from "../../connectPlugins";
import Link from 'next/link';
import { connect } from 'react-redux';
import { getColletionBySlug } from '../../../utilities/product-helper';
import Slider from 'react-slick';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import { imageUrl } from '../../../api/url';


class ProductWidgets extends Component{

    render() {
        const carouselSetting = {
            dots: false,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false

            // nextArrow: <NextArrow />,
            // prevArrow: <PrevArrow />,
        };

        const { collections, collectionSlug } = this.props;
        const products = getColletionBySlug(collections, collectionSlug);
        return (
            <section>
              
                <aside className="widget widget_product widget_features">
                    <p>
                        <i className="icon-network"></i> Shipping worldwide
                    </p>
                    <p>
                        <i className="icon-3d-rotate"></i> Free 7-day return if
                        eligible, so easy
                    </p>
                    <p>
                        <i className="icon-receipt"></i> Supplier give bills for this
                        product.
                    </p>
                    <p>
                        <i className="icon-credit-card"></i> Pay online or when
                        receiving goods
                    </p>
                </aside>
                <aside className="widget widget_sell-on-site">
                    <p>
                        <i className="icon-store"></i> ONLINE SUPPORT 24/7
                        {/* <Link href="/account/register"> */}
                            <p> Call Us: 9840322505</p>
                        {/* </Link> */}
                    </p>
                </aside>
                <aside className="widget widget_ads">
                    <Link href="/shop">
                        <a>
                            <img src="/static/img/ads/product-ads.png" alt="martfury" />
                        </a>
                    </Link>
                </aside>
                <aside className="widget widget_same-brand">
                    <h3>You may also like</h3>
                    <div className="widget__content">
                        {/* {products &&
                        products.map(product => (
                            <Product product={product} key={product.id} />
                        ))} */}
                        <Slider {...carouselSetting} className="ps-carousel">
                            {this.props.banner&&this.props.banner.map(product=>(
                                <div className="ps-banner" key={product.bannerId}>
                                <Link href="/shop">
                                    <a>
                                        <img src={imageUrl+"?path="+product.imagePath+"&name="+product.image+"&width=1900&height=1000"}
                                             
                                            alt="martfury"
                                          
                                        />
                                    </a> 
                                </Link>
                            </div>

                            ))}
                            
                        </Slider>
                    </div>
                </aside> 
            </section>
        );
    }

}

export default connect(state=>state.collection)(ProductWidgets);
